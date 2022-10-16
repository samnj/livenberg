import { useRouter } from 'next/router'

import Navbar from './Navbar'
import SearchBar from './SearchBar'

const Header = () => {
	const router = useRouter()

	return (
		<div className='sticky top-0 z-20 w-full bg-zinc-100/70 backdrop-blur-lg'>
			<div className='mx-auto w-full max-w-md px-4'>
				<Navbar />
				{router.pathname !== '/library' && <SearchBar />}
			</div>
		</div>
	)
}

export default Header
