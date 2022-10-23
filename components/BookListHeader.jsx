import { useRouter } from 'next/router'

import FilterBtn from './FilterBtn'

const BookListHeader = ({ results, query, countQuery, filter, setFilter }) => {
	const router = useRouter()

	return (
		<div className='self-start text-xs'>
			{router.pathname !== '/library' ? (
				`${results} results for "${query}"`
			) : (
				<div className='mt-4'>
					<div className=''>
						Total books in library: {countQuery ? countQuery?.data : ''}
					</div>
					<FilterBtn filter={filter} setFilter={setFilter} />
				</div>
			)}
		</div>
	)
}

export default BookListHeader
