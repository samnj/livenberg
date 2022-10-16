const DownloadBtn = ({ book_url, id }) => {
	return (
		<>
			<a
				title='download book'
				rel='noreferrer'
				target='_blank'
				href={book_url + id}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					className='h-4 w-4 stroke-emerald-600'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
					/>
				</svg>
			</a>
		</>
	)
}

export default DownloadBtn
