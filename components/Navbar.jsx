import { useSession } from 'next-auth/react'
import Link from 'next/link'

import LoginBtn from './LoginBtn'

const Navbar = () => {
	const { data: session } = useSession()

	return (
		<div className='flex items-center justify-between pt-4 pb-2 font-montserrat '>
			<div className='font-semibold text-emerald-700 lg:text-3xl text-lg md:text-2xl'>
				<Link href='/'>Livenberg</Link>
			</div>
			<div className='flex items-center gap-4 md:gap-8 text-sm md:text-lg lg:gap-12 lg:text-lg font-medium text-emerald-600'>
				<button
					id='library'
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
