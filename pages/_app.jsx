import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

import AuthWrapper from '../components/AuthWrapper'
import Layout from '../components/Layout'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<SessionProvider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout>
						<AuthWrapper>
							<Component {...pageProps} />
						</AuthWrapper>
					</Layout>
				</Hydrate>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default App
