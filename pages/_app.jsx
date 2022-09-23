import Layout from '../components/Layout'
import {
	QueryClient,
	QueryClientProvider,
	Hydrate,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { BooksProvider } from '../context/Context'
import { useState, useEffect } from 'react'
import '../styles/globals.css'
// import { Toaster } from 'react-hot-toast'

const App = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<SessionProvider session={pageProps.session}>
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
		</SessionProvider>
	)
}

export default App
