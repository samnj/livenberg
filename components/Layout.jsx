import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-between bg-zinc-100 font-lato text-neutral-800'>
			<Head>
				<title>Livenberg</title>
			</Head>
			<Header />
			{children}
			<Footer />
			<Toaster position='top-center' />
		</div>
	)
}

export default Layout
