import { useSession } from 'next-auth/react'
import { useFetchUserBooks } from '../utils/query'

const Home = () => {
	const session = useSession()
	useFetchUserBooks(session.status === 'authenticated')

	return (
		<div className='relative mb-10 flex w-full flex-1 items-center justify-center bg-zinc-100 pb-4'>
			<p className='absolute top-[10%] w-full text-center text-sm font-normal not-italic'>
				A Project Gutenberg search engine and library
			</p>
			<div className=' flex w-full flex-col items-center justify-center bg-zinc-50 py-12 font-montserrat text-xl font-semibold'>
				<blockquote className='relative z-20 w-[17rem] italic'>
					<p>
						A room without <span className='text-emerald-600'>books</span> is
						like a body without a soul
					</p>
					<span className='pointer-events-none absolute top-14 -left-8 z-10 select-none font-serif text-[14rem] italic text-gray-500/20'>
						”
					</span>
				</blockquote>
				<cite className='z-20 mt-2 w-72 pr-3 text-right text-base font-semibold not-italic'>
					Marcus Tullius Cicero
				</cite>
			</div>
		</div>
	)
}

export default Home
