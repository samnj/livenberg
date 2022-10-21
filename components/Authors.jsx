import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'

import { useFetchBooks } from '../utils/query'

const Authors = ({ authors, isDetails, isTranslators }) => {
	const [query, setQuery] = useState({ query: '', isEnabled: false })
	const { data } = useFetchBooks(query)
	const router = useRouter()

	const createText = (arr) => {
		let text

		if (isTranslators) {
			text = 'Translator'
		} else {
			text = 'Author'
		}

		return `${arr.length > 1 ? text.concat('s: ') : text.concat(': ')}`
	}

	useEffect(() => {
		if (data) {
			router.push({
				pathname: '/results/books',
				query: { search: query.query },
			})
		}
	}, [data])

	const handleClick = (e) => {
		setQuery({ query: e.target.textContent, isEnabled: true })
	}

	return (
		<div
			className={`flex flex-wrap items-center gap-1 ${
				!isDetails && 'line-clamp-1'
			}`}
		>
			<span className='font-semibold'>{isDetails && createText(authors)}</span>

			{authors.map((author, index) => (
				<Fragment key={author}>
					<p
						title={author}
						onClick={handleClick}
						className={`inline cursor-pointer text-sm ${
							!isTranslators && 'italic underline decoration-from-font'
						}`}
					>
						{author}
					</p>
					{index < authors.length - 1 && <span> </span>}
				</Fragment>
			))}
		</div>
	)
}

export default Authors
