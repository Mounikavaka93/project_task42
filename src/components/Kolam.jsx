export default function Kolam({ className = '', light = false }) {
  const stroke = light ? '#e0c99a' : '#c4a36a'

  return (
    <svg
      viewBox="0 0 200 200"
      className={`kolam ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="100" cy="100" r="78" stroke={stroke} strokeWidth="0.8" className="kolam-path" />
      <circle cx="100" cy="100" r="52" stroke={stroke} strokeWidth="0.8" className="kolam-path delay-1" />
      <circle cx="100" cy="100" r="18" stroke={stroke} strokeWidth="1.1" className="kolam-path delay-2" />
      <path
        className="kolam-path delay-1"
        stroke={stroke}
        strokeWidth="0.8"
        d="M100 22 L178 100 L100 178 L22 100 Z"
      />
      <path
        className="kolam-path delay-2"
        stroke={stroke}
        strokeWidth="0.8"
        d="M100 48 C118 62 138 82 152 100 C138 118 118 138 100 152 C82 138 62 118 48 100 C62 82 82 62 100 48 Z"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <circle
          key={deg}
          cx="100"
          cy="32"
          r="4.5"
          stroke={stroke}
          strokeWidth="0.8"
          className="kolam-path delay-3"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
    </svg>
  )
}
