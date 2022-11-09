import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import FilterBtn from './FilterBtn'

const BookListHeader = ({ results, query, countQuery, filter, setFilter }) => {
	const router = useRouter()
	const session = useSession()
	const isSession = session.status === 'authenticated'

	return (
		<div id='searchResults' className='self-start ml-4 mb-4 md:text-sm text-xs'>
			{router.pathname === '/library' && isSession ? (
				<div className='mt-4'>
					<div className='lg:mt-8' id='libraryBooks'>
						Total books in library: {countQuery ? countQuery?.data : ''}
					</div>
					<FilterBtn filter={filter} setFilter={setFilter} />
				</div>
			) : (
				`${results} results for "${query}"`
			)}
		</div>
	)
}

export default BookListHeader
