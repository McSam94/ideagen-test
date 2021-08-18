import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Dropdown = forwardRef(
	({ className, options, value, placeholder, ...props }, ref) => {
		return (
			<select
				ref={ref}
				className={cn('idg-dropdown', className)}
				defaultValue={value}
				{...props}
			>
				<option className="idg-dropdown__option--placeholder" value="">
					{placeholder ?? 'Please select a value'}
				</option>
				{options?.map?.((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		)
	}
)

Dropdown.propTypes = {
	className: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string
		})
	),
	value: PropTypes.string
}

export default memo(Dropdown)
