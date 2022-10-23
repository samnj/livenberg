import { useState } from 'react'

const FilterBar = ({ setFilter, isDisabled }) => {
	const [searchStr, setSearchStr] = useState('')

	const handleChange = (e) => {
		const { value } = e.target
		setSearchStr(value.toLowerCase())
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setFilter(searchStr.toLowerCase())
		setSearchStr('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='ml-4 flex grow items-center justify-start'
		>
			<label htmlFor='filterBar' />
			<div className='flex relative'>
				<input
					type='search'
					id='filterBar'
					disabled={isDisabled}
					placeholder='Search your library'
					autoComplete='off'
					onChange={handleChange}
					value={searchStr}
					className='h-8 disabled:bg-slate-300 text-sm pr-6 rounded-md border-1 shadow-sm ring-0 placeholder:text-sm focus:ring-0 border-emerald-500 placeholder-neutral-400 focus:border-emerald-500'
				/>
				<button type='submit' className='h-full absolute top-0 right-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.7}
						stroke='currentColor'
						className='w-4 h-4 stroke-emerald-500'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>
				</button>
			</div>
		</form>
	)
}

export default FilterBar
