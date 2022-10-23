const BookTypeLegend = () => {
	return (
		<div className='mb-2 flex gap-2 self-start text-xs drop-shadow-md'>
			<div className='flex gap-1 items-center'>
				<span className={`bg-red-400 h-2 w-2 rounded`}></span>
				<div className='mb-1'>ebook</div>
			</div>

			<div className='flex gap-1 items-center'>
				<span className={`bg-blue-400 h-2 w-2 rounded`}></span>
				<div className='mb-1'>audio</div>
			</div>

			<div className='flex gap-1 items-center'>
				<span className={`bg-green-400 h-2 w-2 rounded`}></span>
				<div className='mb-1'>other</div>
			</div>
		</div>
	)
}

export default BookTypeLegend
