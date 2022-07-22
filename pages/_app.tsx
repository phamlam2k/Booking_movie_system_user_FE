import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const initialOptions = {
  'client-id': 'AZFbfQds6gZO-eyM_x3qUlL1ZeDgSOHo0HI63NIY_pKeK_n-mmiRZQi5HmpfcdUWG4esu_C9OKkT9jvN',
  currency: 'USD',
  components: 'buttons',
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </QueryClientProvider>
  )
}

export default MyApp
