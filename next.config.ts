import {initOpenNextCloudflareForDev} from '@opennextjs/cloudflare'
import type {NextConfig} from 'next'

void initOpenNextCloudflareForDev()

const config: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    qualities: [75, 90],
  },
}

export default config
