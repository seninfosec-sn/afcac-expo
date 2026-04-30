import Image from 'next/image'

export default function LogoIcon({ width = 60, height = 60 }: { width?: number; height?: number }) {
  return (
    <Image
      src="/afcac_logo.png"
      alt="CAFAC / AFCAC"
      width={width}
      height={height}
      style={{
        objectFit: 'contain',
        borderRadius: '50%',
        border: '2.5px solid #fff',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
      }}
      priority
    />
  )
}
