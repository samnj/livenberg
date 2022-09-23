import { useState, useRef, useEffect } from 'react'
import { useIsFetching } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useFetchBooks } from '../utils/query'
import toast from 'react-hot-toast'

const SearchBar = () => {
	const [searchStr, setSearchStr] = useState('')
	const [isValid, setIsValid] = useState(true)
	const [query, setQuery] = useState({ query: '', isEnabled: false })
	const router = useRouter()
	const timeoutRef = useRef(null)

	const { data, isError, error } = useFetchBooks(query)

	useEffect(() => {
		if (data) {
			router.push({
				pathname: '/results/books',
				query: { search: query.query },
			})
		}
	}, [data])

	useEffect(() => {
		if (error) toast.error(error.message)
	}, [isError, error])

	const handleSubmit = (e) => {
		e.preventDefault()

		if (isWhiteSpace(searchStr) || searchStr.length < 3) {
			setIsValid(false)
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			timeoutRef.current = setTimeout(() => {
				setIsValid(true)
			}, 2000)
			setSearchStr('')
			return
		}

		const formatSearch = (str) => {
			return str.trim().split(/ +/g).sort().join('+')
		}

		setQuery({ query: formatSearch(searchStr), isEnabled: true })
		setSearchStr('')
	}

	const handleChange = (e) => {
		const { value } = e.target
		setSearchStr(value.toLowerCase())
	}

	const isWhiteSpace = (str) => str.trim().length === 0

	return (
		<div className='pt-2'>
			<form
				className='flex items-center justify-center py-4'
				onSubmit={handleSubmit}
			>
				<label htmlFor='searchBar' />
				<div className='relative w-full'>
					<input
						type='search'
						id='searchBar'
						placeholder={
							isValid ? 'Search author or title' : 'Input at least 3 characters'
						}
						autoComplete='off'
						onChange={handleChange}
						value={searchStr}
						className={`w-full rounded-md border-2 shadow-sm ring-0 placeholder:text-sm focus:ring-0
						 		${
									isValid
										? 'border-emerald-500 placeholder-neutral-400 focus:border-emerald-500'
										: 'border-red-600 placeholder-red-600 focus:border-red-600'
								}`}
					/>
					<button
						type='submit'
						className={`absolute top-0 right-0 h-full w-8
							${isValid ? 'stroke-emerald-500' : 'stroke-red-600'}
						`}
					>
						{useIsFetching(['books']) ? (
							<svg
								className='mx-auto h-5 w-5 animate-spin text-emerald-400'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
							>
								<circle
									className='opacity-25'
									cx='12'
									cy='12'
									r='10'
									stroke='currentColor'
									strokeWidth='4'
								></circle>
								<path
									className='opacity-75'
									fill='currentColor'
									d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
								></path>
							</svg>
						) : (
							<svg
								aria-hidden='true'
								className='mx-auto h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								></path>
							</svg>
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default SearchBar
