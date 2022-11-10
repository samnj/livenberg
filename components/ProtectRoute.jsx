import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProtectRoute = ({ children }) => {
	const router = useRouter()
	const { status } = useSession()

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/')
		}
	}, [router, status])

	if (status === 'unauthenticated') return null

	return <>{children}</>
}

export default ProtectRoute
