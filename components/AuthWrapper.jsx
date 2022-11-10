import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import ProtectRoute from './ProtectRoute'

const protectedRoutes = ['/library']

const AuthWrapper = ({ children }) => {
	const { status } = useSession()
	const router = useRouter()

	if (status === 'loading') return null

	return (
		<>
			{protectedRoutes.includes(router.pathname) ? (
				<ProtectRoute>{children}</ProtectRoute>
			) : (
				children
			)}
		</>
	)
}

export default AuthWrapper
