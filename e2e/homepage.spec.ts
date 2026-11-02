import {expect, test} from '@playwright/test'

test('homepage content and wallet picker work on desktop and mobile', async ({page}) => {
  await page.goto('/')

  await expect(page.getByRole('heading', {name: 'Independent music, global ambition.'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Three labels. One independent vision.'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'VIP Women’s Club'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Playlists for the journey.'})).toBeVisible()
  await expect(page.locator('iframe[title^="Spotify playlist:"]')).toHaveCount(2)
  await expect(page.getByRole('link', {name: 'Open in Spotify'})).toHaveCount(2)

  await page.getByRole('button', {name: 'Connect wallet'}).click()
  const walletDialog = page.getByRole('dialog', {name: 'Connect a wallet'})
  await expect(walletDialog).toBeVisible()
  await expect(walletDialog.getByText('Phantom')).toBeVisible()
  await expect(walletDialog.getByText('Solflare')).toBeVisible()
  await expect(walletDialog.locator('img')).toHaveCount(2)
  await expect(walletDialog.locator('img').nth(0)).toHaveJSProperty('complete', true)
  await page.getByRole('button', {name: 'Close wallet dialog'}).click()
  await expect(walletDialog).not.toBeVisible()

  await page.setViewportSize({width: 390, height: 844})
  await expect(page.getByRole('button', {name: 'Connect wallet'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Independent music, global ambition.'})).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true)
})
