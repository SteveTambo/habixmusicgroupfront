'use client'

import type {ImageLoaderProps} from 'next/image'

export default function cloudflareImageLoader({src, width, quality}: ImageLoaderProps) {
  if (process.env.NODE_ENV === 'development') return src
  if (!src.startsWith('/') || src.startsWith('//')) {
    throw new Error('Cloudflare image loader only supports local image paths.')
  }

  const transformations = [`width=${width}`, `quality=${quality ?? 75}`, 'format=auto'].join(',')
  return `/cdn-cgi/image/${transformations}/${src.replace(/^\/+/, '')}`
}
