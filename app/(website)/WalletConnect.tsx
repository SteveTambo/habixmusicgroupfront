'use client'

import Image from 'next/image'
import {useCallback, useEffect, useRef, useState} from 'react'

interface WalletPublicKey {
  toString(): string
}

interface InjectedSolanaWallet {
  publicKey: WalletPublicKey | null
  isPhantom?: boolean
  isSolflare?: boolean
  connect(options?: {onlyIfTrusted?: boolean}): Promise<{publicKey?: WalletPublicKey} | void>
  disconnect?(): Promise<void>
  on?(event: string, handler: (...args: unknown[]) => void): void
  off?(event: string, handler: (...args: unknown[]) => void): void
  removeListener?(event: string, handler: (...args: unknown[]) => void): void
}

interface WalletWindow extends Window {
  phantom?: {solana?: InjectedSolanaWallet}
  solflare?: InjectedSolanaWallet
  solana?: InjectedSolanaWallet
}

const walletOptions = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '/wallets/phantom.png',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      const injected = window as WalletWindow
      if (injected.phantom?.solana?.isPhantom) return injected.phantom.solana
      if (injected.solana?.isPhantom) return injected.solana
      return null
    },
    installUrl: 'https://phantom.app/',
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: '/wallets/solflare.png',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      const provider = (window as WalletWindow).solflare
      return provider?.isSolflare ? provider : null
    },
    installUrl: 'https://solflare.com/',
  },
] as const

type WalletId = (typeof walletOptions)[number]['id']

const DEVNET_RPC_URL = 'https://api.devnet.solana.com'
const HBX_DEVNET_MINT = 'CLcBGsHr13jCwBVPU9Pe5tzrjpR7m5axfYcuvMRKgdh8'

interface TokenBalanceResponse {
  result?: {
    value?: {
      account?: {
        data?: {
          parsed?: {
            info?: {
              tokenAmount?: {
                amount?: string
                decimals?: number
              }
            }
          }
        }
      }
    }[]
  }
  error?: {message?: string}
}

function formatHbxBalance(amount: bigint, decimals: number) {
  const two = BigInt(2)
  const hundred = BigInt(100)
  const centsScale = BigInt(10) ** BigInt(Math.max(decimals - 2, 0))
  const hundredths =
    decimals >= 2
      ? (amount + centsScale / two) / centsScale
      : amount * BigInt(10) ** (two - BigInt(decimals))
  const whole = hundredths / hundred
  const fraction = (hundredths % hundred).toString().padStart(2, '0')
  return `${new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}).format(whole)}.${fraction}`
}

async function fetchHbxBalance(address: string, signal: AbortSignal) {
  const response = await fetch(DEVNET_RPC_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getTokenAccountsByOwner',
      params: [address, {mint: HBX_DEVNET_MINT}, {encoding: 'jsonParsed', commitment: 'confirmed'}],
    }),
    signal,
  })

  if (!response.ok) throw new Error(`Devnet RPC returned HTTP ${response.status}.`)
  const data = (await response.json()) as TokenBalanceResponse
  if (data.error)
    throw new Error(data.error.message ?? 'Devnet RPC could not load the HBX balance.')
  if (!Array.isArray(data.result?.value)) {
    throw new Error('Devnet RPC returned an invalid HBX balance response.')
  }

  let total = BigInt(0)
  let decimals: number | null = null
  for (const account of data.result.value) {
    const tokenAmount = account.account?.data?.parsed?.info?.tokenAmount
    if (
      !tokenAmount?.amount ||
      !Number.isInteger(tokenAmount.decimals) ||
      tokenAmount.decimals! < 0
    ) {
      throw new Error('Devnet RPC returned an invalid HBX token account.')
    }
    if (decimals !== null && decimals !== tokenAmount.decimals) {
      throw new Error('HBX token accounts returned inconsistent decimal precision.')
    }
    decimals = tokenAmount.decimals!
    total += BigInt(tokenAmount.amount)
  }

  return formatHbxBalance(total, decimals ?? 6)
}

function isMobileBrowser() {
  if (typeof navigator === 'undefined') return false
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return true
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
}

function getWalletAppUrl(id: WalletId, mobileBrowser: boolean) {
  if (!mobileBrowser) return null
  const href = window.location.href
  const ref = encodeURIComponent(window.location.origin)
  const encodedHref = encodeURIComponent(href)
  return id === 'phantom'
    ? `https://phantom.app/ul/browse/${encodedHref}?ref=${ref}`
    : `https://solflare.com/ul/v1/browse/${encodedHref}?ref=${ref}`
}

function isWalletPublicKey(value: unknown): value is WalletPublicKey {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toString' in value &&
    typeof value.toString === 'function' &&
    value.toString !== Object.prototype.toString
  )
}

function getAddress(value: unknown): string | null {
  if (typeof value === 'string') return value || null
  if (!isWalletPublicKey(value)) return null
  const address = value.toString()
  return address === '[object Object]' ? null : address
}

export default function WalletConnect() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const balanceRequestRef = useRef<AbortController | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileBrowser, setMobileBrowser] = useState(false)
  const [installedWallets, setInstalledWallets] = useState<WalletId[]>([])
  const [activeWallet, setActiveWallet] = useState<{
    id: WalletId
    address: string
    provider: InjectedSolanaWallet
  } | null>(null)
  const [hbxBalance, setHbxBalance] = useState<string | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [connectingId, setConnectingId] = useState<WalletId | null>(null)
  const [error, setError] = useState<string | null>(null)

  const clearHbxBalance = useCallback(() => {
    balanceRequestRef.current?.abort()
    balanceRequestRef.current = null
    setHbxBalance(null)
    setBalanceLoading(false)
    setBalanceError(null)
  }, [])

  const refreshHbxBalance = useCallback((address: string) => {
    balanceRequestRef.current?.abort()
    const controller = new AbortController()
    balanceRequestRef.current = controller
    setHbxBalance(null)
    setBalanceLoading(true)
    setBalanceError(null)
    void fetchHbxBalance(address, controller.signal)
      .then((balance) => {
        if (!controller.signal.aborted) setHbxBalance(balance)
        return balance
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return
        console.error('Could not load the HBX devnet balance.', caught)
        setBalanceError(
          caught instanceof Error ? caught.message : 'Could not load the HBX devnet balance.',
        )
      })
      .finally(() => {
        if (!controller.signal.aborted) setBalanceLoading(false)
      })
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (dialogOpen && !dialog.open) dialog.showModal()
    if (!dialogOpen && dialog.open) dialog.close()
  }, [dialogOpen])

  useEffect(() => {
    return () => balanceRequestRef.current?.abort()
  }, [])

  useEffect(() => {
    if (activeWallet) {
      const {provider} = activeWallet
      const handleAccountChanged = (...args: unknown[]) => {
        const address = getAddress(args[0]) ?? getAddress(provider.publicKey)
        if (address) {
          setActiveWallet((current) => (current ? {...current, address} : current))
          refreshHbxBalance(address)
        } else {
          setActiveWallet(null)
          clearHbxBalance()
        }
      }
      const handleDisconnect = () => {
        setActiveWallet(null)
        clearHbxBalance()
      }

      provider.on?.('accountChanged', handleAccountChanged)
      provider.on?.('disconnect', handleDisconnect)
      return () => {
        if (provider.off) {
          provider.off('accountChanged', handleAccountChanged)
          provider.off('disconnect', handleDisconnect)
        } else {
          provider.removeListener?.('accountChanged', handleAccountChanged)
          provider.removeListener?.('disconnect', handleDisconnect)
        }
      }
    }
    return undefined
  }, [activeWallet, clearHbxBalance, refreshHbxBalance])

  const connectWallet = async (id: WalletId) => {
    const wallet = walletOptions.find((option) => option.id === id)
    const provider = wallet?.getProvider()
    if (!wallet || !provider) {
      setError(`${wallet?.name ?? 'This wallet'} is not available in this browser.`)
      return
    }

    setConnectingId(id)
    setError(null)
    try {
      const result = await provider.connect()
      const address = getAddress(result?.publicKey) ?? getAddress(provider.publicKey)
      if (!address) throw new Error(`${wallet.name} connected but did not return an account.`)
      setActiveWallet({id, address, provider})
      refreshHbxBalance(address)
      setDialogOpen(false)
    } catch (caught) {
      console.error(`Could not connect to ${wallet.name}.`, caught)
      setError(caught instanceof Error ? caught.message : `Could not connect to ${wallet.name}.`)
    } finally {
      setConnectingId(null)
    }
  }

  const disconnectWallet = async () => {
    if (!activeWallet) return
    try {
      await activeWallet.provider.disconnect?.()
      setActiveWallet(null)
      clearHbxBalance()
      setError(null)
    } catch (caught) {
      console.error('Could not disconnect the wallet.', caught)
      setError(caught instanceof Error ? caught.message : 'Could not disconnect the wallet.')
      setDialogOpen(true)
    }
  }

  const shortAddress = activeWallet
    ? `${activeWallet.address.slice(0, 4)}…${activeWallet.address.slice(-4)}`
    : null

  return (
    <>
      <button
        aria-label={
          activeWallet
            ? `Disconnect wallet ${shortAddress}; ${balanceLoading ? 'HBX balance loading' : `${hbxBalance ?? 'HBX balance unavailable'} HBX`}`
            : 'Connect wallet'
        }
        className="shrink-0 rounded-full border border-habix-coral bg-habix-coral px-3 py-1.5 text-xs font-semibold text-black transition hover:border-white hover:bg-white md:px-4 md:py-2 md:text-sm"
        title={
          activeWallet
            ? `${shortAddress} · ${balanceLoading ? 'Loading HBX balance…' : (balanceError ?? `${hbxBalance ?? 'Balance unavailable'} HBX on devnet`)}`
            : undefined
        }
        onClick={() => {
          if (activeWallet) {
            void disconnectWallet()
          } else {
            setInstalledWallets(
              walletOptions
                .filter((wallet) => wallet.getProvider() !== null)
                .map((wallet) => wallet.id),
            )
            setMobileBrowser(isMobileBrowser())
            setError(null)
            setDialogOpen(true)
          }
        }}
        type="button"
      >
        {activeWallet ? (
          balanceLoading ? (
            'HBX…'
          ) : hbxBalance !== null ? (
            <>{hbxBalance} HBX</>
          ) : (
            'HBX unavailable'
          )
        ) : (
          <>
            <span className="sm:hidden">Connect</span>
            <span className="hidden sm:inline">Connect wallet</span>
          </>
        )}
      </button>

      <dialog
        aria-labelledby="wallet-dialog-title"
        className="rounded-xl m-auto w-[min(24rem,calc(100%-2rem))] overflow-hidden border border-white/10 bg-[#15161a] p-0 text-white shadow-2xl backdrop:bg-black/70"
        onCancel={() => setDialogOpen(false)}
        onClose={() => setDialogOpen(false)}
        ref={dialogRef}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-base font-semibold" id="wallet-dialog-title">
            Connect a wallet
          </h2>
          <button
            aria-label="Close wallet dialog"
            className="rounded p-1 text-2xl leading-none text-white/60 hover:text-white"
            onClick={() => setDialogOpen(false)}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="space-y-2 p-3">
          {walletOptions.map((wallet) => {
            const installed = installedWallets.includes(wallet.id)
            const walletAppUrl = installed ? null : getWalletAppUrl(wallet.id, mobileBrowser)
            return installed ? (
              <button
                aria-busy={connectingId === wallet.id}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-white/10 disabled:opacity-60"
                disabled={connectingId !== null}
                key={wallet.id}
                onClick={() => void connectWallet(wallet.id)}
                type="button"
              >
                <Image
                  alt=""
                  className="size-10 shrink-0 rounded-lg object-cover"
                  height={40}
                  sizes="40px"
                  src={wallet.icon}
                  width={40}
                />
                <span className="flex-1 font-medium">
                  {connectingId === wallet.id ? 'Connecting…' : wallet.name}
                </span>
                <span className="text-xs font-medium text-habix-coral">Detected</span>
              </button>
            ) : walletAppUrl ? (
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-white/10"
                href={walletAppUrl}
                key={wallet.id}
              >
                <Image
                  alt=""
                  className="size-10 shrink-0 rounded-lg object-cover"
                  height={40}
                  sizes="40px"
                  src={wallet.icon}
                  width={40}
                />
                <span className="flex-1 font-medium">{wallet.name}</span>
                <span className="text-xs text-white/55">Open in app</span>
              </a>
            ) : (
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-white/10"
                href={wallet.installUrl}
                key={wallet.id}
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt=""
                  className="size-10 shrink-0 rounded-lg object-cover"
                  height={40}
                  sizes="40px"
                  src={wallet.icon}
                  width={40}
                />
                <span className="flex-1 font-medium">{wallet.name}</span>
                <span className="text-xs text-white/55">Install</span>
              </a>
            )
          })}
          {error && (
            <p className="px-3 py-2 text-sm text-red-300" role="alert">
              {error}
            </p>
          )}
        </div>
      </dialog>
    </>
  )
}
