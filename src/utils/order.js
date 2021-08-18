import Constants from 'Configs/constants'
import Capitalize from 'lodash/capitalize'
import { convertToDayJs } from 'Utils'

export const getOrderStatusName = (orderStatus) => {
	return Capitalize(
		Object.entries(Constants.STATUS).find(
			([_, value]) => value === orderStatus
		)?.[0]
	)
}

export const getOrderCategoryName = (category) => {
	return Capitalize(
		Object.entries(Constants.CATEGORY).find(
			([_, value]) => value === category
		)?.[0]
	)
}

export const getCountryName = (country) => {
	return Capitalize(
		Object.entries(Constants.COUNTRY)
			.find(([_, value]) => value === country)?.[0]
			?.replaceAll('_', ' ')
	)
}

export const filterOrder = (orders, filter) => {
	return orders.reduce((filteredOrders, order) => {
		if (filter.isCreatedDate) {
			const orderCreatedDate = convertToDayJs(order.createdDate)

			if (
				!orderCreatedDate.isBetween(
					convertToDayJs(filter.fromDate, 'DD/MM/YYYY'),
					convertToDayJs(filter.toDate, 'DD/MM/YYYY'),
					null,
					'[]'
				)
			) {
				return filteredOrders
			}
		}

		if (filter.isCustomerName && order.customerName !== filter.customerName) {
			return filteredOrders
		}

		if (
			filter.isStatus &&
			!filter.status.some((status) => status === order.status)
		) {
			return filteredOrders
		}

		if (
			filter.isCategory &&
			!filter.category.some((category) => category === order.category)
		) {
			return filteredOrders
		}

		if (filter.isCountry && order.country !== filter.country) {
			return filteredOrders
		}

		return [...filteredOrders, order]
	}, [])
}
