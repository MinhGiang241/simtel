import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import StyledComponentsRegistry from './components/AntdRegistry'
import IntlWrapper from './components/IntlWrapper'
import { StoreProviders } from '@/GlobalRedux/provider'
import { Toaster } from 'react-hot-toast'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simtel',
  description: 'Mua bán sim số',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProviders>
          <IntlWrapper >
            <Header />
            <StyledComponentsRegistry>
              <div className='wrapper'>
                {children}
              </div>
            </StyledComponentsRegistry>
            <Footer />
          </IntlWrapper>
        </StoreProviders>
        <Toaster />
      </body>
    </html>
  )
}
