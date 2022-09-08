import Layout from '../components/Layout'
import {
	QueryClient,
	QueryClientProvider,
	Hydrate,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BooksProvider } from '../context/Context'
import { useState } from 'react'
import '../styles/globals.css'
// import { Toaster } from 'react-hot-toast'

const MyApp = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<BooksProvider>
					<Layout>
						<Component {...pageProps} />
						{/* <Toaster /> */}
					</Layout>
				</BooksProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default MyApp
