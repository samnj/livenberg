import { useRouter } from 'next/router'

import FilterBtn from './FilterBtn'

const BookListHeader = ({ results, query, countQuery, filter, setFilter }) => {
	const router = useRouter()

	return (
		<div className='self-start md:col-span-2 lg:col-span-3 md:text-sm text-xs'>
			{router.pathname !== '/library' ? (
				`${results} results for "${query}"`
			) : (
				<div className='mt-4'>
					<div className='lg:mt-8'>
						Total books in library: {countQuery ? countQuery?.data : ''}
					</div>
					<FilterBtn filter={filter} setFilter={setFilter} />
				</div>
			)}
		</div>
	)
}

export default BookListHeader
