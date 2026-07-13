import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string
  alt?: string
  poster?: string
  'auto-rotate'?: boolean
  'camera-controls'?: boolean
  'disable-zoom'?: boolean
  ar?: boolean
  exposure?: string | number
  'shadow-intensity'?: string | number
  loading?: 'auto' | 'lazy' | 'eager'
  reveal?: 'auto' | 'interaction' | 'manual'
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps
    }
  }
}

export {}
