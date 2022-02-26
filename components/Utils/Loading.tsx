import React from 'react'
import ReactLoading from 'react-loading';

const Loading = () => {
	return (
		<div className='w-full flex justify-center justify-items-center'>

			<ReactLoading type={'cylon'} color={'rgb(31 41 55)'} height={667} width={600} />

		</div>
	)
}

export default Loading