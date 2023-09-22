import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import StyledComponentsRegistry from './components/AntdRegistry'
import { IntlProvider } from 'react-intl'


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
        <Header />
        <StyledComponentsRegistry>
          <div className='wrapper'>
            {children}
          </div>
        </StyledComponentsRegistry>
        <Footer />
      </body>
    </html>
  )
}
