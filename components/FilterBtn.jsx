const FilterBtn = ({ filter, setFilter }) => {
	const handleClick = (e) => {
		e.preventDefault()
		setFilter('')
	}

	return filter ? (
		<div className='inline-flex mt-2 py-1 px-2 gap-1 rounded-md items-center justify-between bg-zinc-50 border drop-shadow-sm'>
			<p className='-translate-y-[1px]'>{filter}</p>
			<button onClick={handleClick}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.7}
					className='w-4 h-4 stroke-red-500'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</button>
		</div>
	) : (
		<></>
	)
}

export default FilterBtn
