import React, { Children, memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Table = ({ data, className, children }) => {
	const columnCount = useMemo(() => Children.count(children), [children])

	const columnWidth = useMemo(() => 100 / columnCount, [columnCount])

	return (
		<div className={cn('idg-table', className)}>
			<div className="idg-table__header">
				{Children.map(children, (child, index) => (
					<div
						key={`header-col-${index}`}
						className={cn('idg-table__header-col', {
							'idg-table__header-col--center': child.props.align === 'center',
							'idg-table__header-col--left': child.props.align === 'left',
							'idg-table__header-col--right': child.props.align === 'right'
						})}
						style={{ width: `${columnWidth}%` }}
					>
						{child.props?.label ?? child.props?.prop}
					</div>
				))}
			</div>
			<div className="idg-table__content">
				{!data.length && (
					<div className="idg-table__content--empty">No Record found</div>
				)}
				{data?.map((row, rowIdx) => (
					<div key={`content-row-${rowIdx}`} className="idg-table__content-row">
						{Children.map(children, (child, colIdx) => (
							<div
								key={`content-col-${rowIdx}${colIdx}`}
								className={cn('idg-table__content-col', {
									'idg-table__content-col--center':
										child.props.align === 'center',
									'idg-table__content-col--left': child.props.align === 'left',
									'idg-table__content-col--right': child.props.align === 'right'
								})}
								style={{ width: `${columnWidth}%` }}
							>
								{child.props.custom
									? child.props.custom(row)
									: row[child.props.prop]}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

Table.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string),
	className: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default memo(Table)
