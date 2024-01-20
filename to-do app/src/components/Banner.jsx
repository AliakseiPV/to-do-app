import React from 'react'

const Banner = (props) => {
	const {children, message, className } = props
	return (
		<div className={className}>
			<span>{message}</span>
			{children}
		</div>
	)
}

export default Banner