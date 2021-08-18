import React, {
	createRef,
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Checkbox from 'Components/checkbox'

const CheckboxGroup = forwardRef(
	({ className, canSelectAll, value, options, onChange, disabled }, ref) => {
		const checkboxRefs = useRef(options.map(() => createRef()))
		const allRef = useRef()

		const [selectedValue, setSelectedValue] = useState(value ?? [])

		const selectAll = useCallback(
			(e) => {
				const isChecked = e.target.checked

				setSelectedValue(() => {
					const nextState = isChecked
						? options?.map((option) => option?.value) ?? []
						: []

					onChange?.(nextState)

					return nextState
				})
			},
			[onChange, options]
		)

		const selectOption = useCallback(
			(option, isChecked) => {
				setSelectedValue((prevState) => {
					const nextState = isChecked
						? [...prevState, option]
						: [...prevState.filter((state) => state !== option)]

					onChange?.(nextState)

					return nextState
				})
			},
			[onChange]
		)

		useEffect(() => {
			allRef.current.checked = selectedValue.length === options.length

			options?.forEach((option, index) => {
				checkboxRefs.current[index].current.checked = selectedValue.includes(
					option.value
				)
			})
		}, [selectedValue, options])

		useEffect(() => {
			setSelectedValue(value ?? [])
		}, [value])

		return (
			<div ref={ref} className={cn('checkbox-group', className)}>
				{canSelectAll && (
					<Checkbox
						ref={allRef}
						label="All"
						className="checkbox-group__item"
						onChange={selectAll}
						disabled={disabled}
					/>
				)}
				{options?.map((option, index) => (
					<Checkbox
						ref={checkboxRefs.current[index]}
						key={index}
						className="checkbox-group__item"
						label={option.label}
						value={selectedValue?.some((val) => val === option.value)}
						onChange={(e) => selectOption(option.value, e.target.checked)}
						disabled={disabled}
					/>
				))}
			</div>
		)
	}
)

CheckboxGroup.propTypes = {
	className: PropTypes.string,
	canSelectAll: PropTypes.bool,
	value: PropTypes.array,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.any
		})
	),
	onChange: PropTypes.func,
	disabled: PropTypes.bool
}

export default memo(CheckboxGroup)
