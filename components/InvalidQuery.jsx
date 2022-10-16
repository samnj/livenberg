import Link from 'next/link'

const InvalidQuery = () => {
	return (
		<div className='text-center'>
			<h1 className='mt-20 text-2xl font-bold uppercase'>Invalid query</h1>
			<Link href='/'>
				<a className='mt-10 inline-flex items-center gap-1 rounded-md bg-indigo-400 px-2 py-1 text-neutral-200'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='inline h-5 w-5'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
						/>
					</svg>
					<p>Go back home</p>
				</a>
			</Link>
		</div>
	)
}

export default InvalidQuery
