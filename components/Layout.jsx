import Header from './Header'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

const Layout = ({ children }) => {
	return (
		<div className='flex min-h-screen flex-col items-center bg-zinc-100 font-lato text-neutral-800'>
			<Head>
				<title>Livenberg</title>
			</Head>
			<Header />
			{children}
			<Toaster position='top-left' />
		</div>
	)
}

export default Layout
