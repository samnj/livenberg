const Home = () => {
	return (
		<div
			id='index-header'
			className='relative mb-10 flex w-full flex-1 items-center justify-center bg-zinc-100 pb-4'
		>
			<h1 className='absolute top-[10%] w-full text-center lg:text-lg md:text-base text-sm font-normal not-italic'>
				A Project Gutenberg search engine and library
			</h1>
			<div className=' flex w-full flex-col lg:py-20 md:py-16 items-center justify-center bg-zinc-50 py-12 font-montserrat md:text-2xl lg:text-3xl text-xl font-semibold'>
				<blockquote className='relative z-20 w-[17rem] lg:w-[26rem] md:w-[22rem] italic'>
					<p>
						A room without <span className='text-emerald-600'>books</span> is
						like a body without a soul
					</p>
					<span className='pointer-events-none absolute top-14 md:top-16 lg:top-[5rem] lg:-left-10 -left-8 z-10 select-none font-serif text-[14rem] md:text-[16rem] lg:text-[20rem] italic text-gray-500/20'>
						”
					</span>
				</blockquote>
				<cite className='z-20 md:pr-1 lg:-mr-24 lg:text-xl mt-2 w-72 pr-3 text-right text-base md:text-lg font-semibold not-italic'>
					Marcus Tullius Cicero
				</cite>
			</div>
		</div>
	)
}

export default Home
