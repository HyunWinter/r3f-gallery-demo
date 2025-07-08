import '~/styles/global.css'

import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export default function App({
  Component,
  pageProps,
  router,
}: AppProps<SharedPageProps>) {
  return (
    <AnimatePresence>
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  )
}
