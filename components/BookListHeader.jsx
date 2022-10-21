import { useRouter } from 'next/router'

const BookListHeader = ({ results, query, countQuery }) => {
	const router = useRouter()

	return (
		<div className='self-start text-xs line-clamp-1'>
			{router.pathname !== '/library' ? (
				`${results} results for "${query}"`
			) : (
				<div>Total books in library: {countQuery ? countQuery?.data : ''}</div>
			)}
		</div>
	)
}

export default BookListHeader
