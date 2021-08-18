import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Button = ({
	label,
	className,
	labelClassName,
	onClick,
	disabled,
	primary,
	outline
}) => {
	return (
		<button
			className={cn('idg-btn', className, {
				'idg-btn--outline': outline,
				'idg-btn--primary': primary
			})}
			onClick={onClick}
			disabled={disabled}
		>
			<div className={cn('idg-btn__label', labelClassName)}>{label}</div>
		</button>
	)
}

Button.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	primary: PropTypes.bool,
	outline: PropTypes.bool
}

export default memo(Button)
