import "../styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "在线等待室",
  description: "优雅的在线等待室体验",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
