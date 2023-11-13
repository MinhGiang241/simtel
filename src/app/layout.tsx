import './globals.css'
import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import StyledComponentsRegistry from './components/AntdRegistry'
import IntlWrapper from './components/IntlWrapper'
import { StoreProviders } from '@/GlobalRedux/provider'
import { Toaster } from 'react-hot-toast'
import SupportWidget from './components/SupportWidget'
import ClientProvider from './providers/ClientProvider'
import AuthProvider from './providers/AuthProvider'
import localFont from "next/font/local"

const font = localFont({ src: '../fonts/SF UI Display Regular.ttf' })

//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simtel',
  description: 'Mua bán sim số',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientProvider>
          <StoreProviders>
            <AuthProvider>
              <IntlWrapper >
                <Header />
                <StyledComponentsRegistry>
                  <div className='wrapper'>
                    {children}
                  </div>
                  <SupportWidget />
                </StyledComponentsRegistry>
                <Footer />
              </IntlWrapper>
            </AuthProvider>
          </StoreProviders>
        </ClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
