import { useSession } from 'next-auth/react'
import Link from 'next/link'

import LoginBtn from './LoginBtn'

const Navbar = () => {
	const { data: session, status } = useSession()

	return (
		<div className='flex items-center justify-between pt-4 pb-2 font-montserrat text-lg font-medium'>
			<div className='font-semibold text-emerald-700'>
				<Link href='/'>Livenberg</Link>
			</div>
			<div className='flex items-center gap-4 text-sm text-emerald-600'>
				<button
					className={
						session ? 'hover:scale-105 hover:text-emerald-500' : 'hidden'
					}
				>
					<Link href='/library'>My Books</Link>
				</button>
				<LoginBtn />
			</div>
		</div>
	)
}

export default Navbar
