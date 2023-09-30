import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import StyledComponentsRegistry from './components/AntdRegistry'
import { IntlProvider } from 'react-intl'
import IntlWrapper from './components/IntlWrapper'
import { StoreProviders } from '@/GlobalRedux/provider'


const inter = Inter({ subsets: ['latin'] })
const formats = {
  number: {
    VND: {
      style: 'currency',
      currency: 'VND',
    }
  }
}

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
      </body>
    </html>
  )
}
