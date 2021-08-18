import React, { forwardRef, memo, useEffect, useMemo, useRef } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

const Checkbox = forwardRef(
	({ label, className, value, onChange, ...props }, ref) => {
		const boolValue = useMemo(() => {
			if (typeof value === 'string') {
				return value === 'true'
			}

			return value
		}, [value])

		return (
			<div className={cn('idg-checkbox', className)}>
				<input
					ref={ref}
					type="checkbox"
					value={boolValue}
					onChange={onChange}
					{...props}
				/>
				<div className="idg-checkbox__label">{label}</div>
			</div>
		)
	}
)

Checkbox.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	onChange: PropTypes.func
}

export default memo(Checkbox)
