import type { NextConfig } from 'next'

const config: NextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
    ]
  },
}

export default config
