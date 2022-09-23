import Link from 'next/link'

const InvalidQuery = () => {
	return (
		<div>
			<h1>Your query is invalid</h1>
			<Link href='/'>Take me back home</Link>
		</div>
	)
}

export default InvalidQuery
