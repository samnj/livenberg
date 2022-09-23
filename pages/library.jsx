import { useFetchUserBooks } from '../utils/query'
import BookList from '../components/BookList'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Library = () => {
	const router = useRouter()
	const session = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/')
		},
	})
	const { data: books } = useFetchUserBooks(session.status === 'authenticated')

	if (books) return <BookList data={books} />

	return <div></div>
}

export default Library
