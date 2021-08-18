import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Input = forwardRef(
	(
		{
			className,
			type,
			outline,
			underline,
			placeholder,
			onChange,
			error,
			...props
		},
		ref
	) => {
		return (
			<div className={cn('idg-input__container', className)}>
				<input
					ref={ref}
					className={cn('idg-input', {
						'idg-input--outline': outline,
						'idg-input--underline': underline,
						'idg-input--error': error
					})}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
					{...props}
				/>
				{error && <span className="idg-input__error">{error}</span>}
			</div>
		)
	}
)

Input.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	outline: PropTypes.bool,
	underline: PropTypes.bool,
	onChange: PropTypes.func,
	error: PropTypes.string
}

export default memo(Input)
