import { useEffect, useState } from 'react'

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80'

export default function SafeImg({ src, alt, className = '', ...props }) {
  const [url, setUrl] = useState(src)

  useEffect(() => {
    setUrl(src)
  }, [src])

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      onError={() => {
        if (url !== FALLBACK_IMAGE) setUrl(FALLBACK_IMAGE)
      }}
      {...props}
    />
  )
}
