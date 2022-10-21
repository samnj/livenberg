import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

import Layout from '../components/Layout'
import { BooksProvider } from '../context/Context'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<SessionProvider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					{/* <BooksProvider> */}
					<Layout>
						<Component {...pageProps} />
					</Layout>
					{/* </BooksProvider> */}
				</Hydrate>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default App
