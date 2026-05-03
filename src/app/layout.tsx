import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YCloud Dashboard - OneControl Guatemala',
  description: 'Dashboard para gestión de bot WhatsApp - OneControl Guatemala',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('SW registered: ', registration.scope);
                }, function(err) {
                  console.log('SW registration failed: ', err);
                });
              });
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
