import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<div className='flex items-center justify-between pt-4 pb-2 font-montserrat text-lg font-medium'>
			<div className='font-semibold text-emerald-700'>
				<Link href='/'>Livenberg</Link>
			</div>
			<div className='flex items-center gap-4 text-sm text-emerald-600'>
				<button
					className={
						loggedIn ? 'hover:scale-105 hover:text-emerald-500' : 'hidden'
					}
				>
					<Link href='/library'>My Books</Link>
				</button>
				<a href='#'>
					<button
						onClick={() => setLoggedIn(!loggedIn)}
						className={`transition-all
						${
							loggedIn
								? 'border border-zinc-100 py-1 hover:scale-105 hover:text-emerald-500'
								: // : 'rounded bg-emerald-500 py-1 px-2 text-white hover:bg-emerald-600'
								  'rounded border border-emerald-600 py-1 px-2 hover:bg-emerald-600 hover:text-white'
						}`}
					>
						{loggedIn ? 'logout' : 'login'}
					</button>
				</a>
			</div>
		</div>
	)
}

export default Navbar
