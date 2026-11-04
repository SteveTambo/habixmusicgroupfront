'use client'

import {useState} from 'react'

/* oxlint-disable react/iframe-missing-sandbox */

interface StoreEmbedProps {
  height: 480 | 720
  kind: 'product' | 'store'
  src: string
  title: string
}

function StoreEmbedSkeleton({kind, title}: Pick<StoreEmbedProps, 'kind' | 'title'>) {
  return (
    <output
      aria-label={`Loading ${title} preview`}
      className="absolute inset-0 z-10 motion-safe:animate-pulse overflow-hidden bg-[#f5f4f0] p-5"
    >
      {kind === 'store' ? (
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((item) => (
            <div className="rounded-lg border border-black/5 bg-white p-3" key={item}>
              <div className="aspect-square rounded bg-[#e7e1d8]" />
              <div className="mt-4 h-4 w-3/4 rounded bg-[#e7e1d8]" />
              <div className="mt-2 h-3 w-1/2 rounded bg-[#e7e1d8]" />
              <div className="mt-4 h-8 w-2/3 rounded-full bg-[#e7e1d8]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-xl rounded-lg border border-black/5 bg-white p-4">
          <div className="aspect-[1.7] rounded-lg bg-[#e7e1d8]" />
          <div className="mt-5 h-5 w-2/3 rounded bg-[#e7e1d8]" />
          <div className="mt-3 h-4 w-1/3 rounded bg-[#e7e1d8]" />
          <div className="mt-5 h-12 w-full rounded-lg bg-[#e7e1d8]" />
        </div>
      )}
    </output>
  )
}

export default function StoreEmbed({height, kind, src, title}: StoreEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden" style={{height}}>
      {!loaded && <StoreEmbedSkeleton kind={kind} title={title} />}
      <iframe
        className="relative block w-full border-0"
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        src={src}
        style={{border: 0, maxWidth: '100%'}}
        title={title}
        width="100%"
      />
    </div>
  )
}
