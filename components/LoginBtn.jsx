import { Menu, Transition } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'

const LoginBtn = () => {
	const { data: session, status } = useSession()

	return (
		<div
			className={
				!session && status === 'loading'
					? 'opacity-0 transition-all'
					: 'opacity-100 transition-all'
			}
		>
			{!session && status !== 'authenticated' && (
				<Menu as='div' className='relative z-50'>
					<Menu.Button
						className={`rounded border border-emerald-600  bg-emerald-600 py-1 px-2 text-white`}
					>
						log in
					</Menu.Button>
					<Transition
						enter='transition duration-100 ease-out'
						enterFrom='transform scale-95 opacity-0'
						enterTo='transform scale-100 opacity-100'
						leave='transition duration-75 ease-out'
						leaveFrom='transform scale-100 opacity-100'
						leaveTo='transform scale-95 opacity-0'
					></Transition>
					<Menu.Items className='absolute right-0 mt-1 flex w-28 flex-col items-stretch gap-y-3 rounded border border-emerald-600 bg-zinc-50 py-4 pl-3 font-normal text-neutral-800'>
						<Menu.Item
							as='div'
							className='flex cursor-pointer items-center justify-start gap-1'
							onClick={() => signIn('google')}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								viewBox='0 0 48 48'
								className='h-4'
							>
								<path
									fill='#FFC107'
									d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
								></path>
								<path
									fill='#FF3D00'
									d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
								></path>
								<path
									fill='#4CAF50'
									d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
								></path>
								<path
									fill='#1976D2'
									d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
								></path>
							</svg>
							Google
						</Menu.Item>
						<Menu.Item
							as='div'
							className='flex cursor-pointer items-center justify-start gap-1'
							onClick={() => signIn('github')}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								className='h-4'
							>
								<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
							</svg>
							Github
						</Menu.Item>
					</Menu.Items>
				</Menu>
			)}

			{session && (
				<button
					onClick={() => signOut()}
					className='border border-zinc-100 py-1 transition-all hover:scale-105 hover:text-emerald-500'
				>
					logout
				</button>
			)}
		</div>
	)
}

export default LoginBtn
