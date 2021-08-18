import React, { useCallback, useContext, useState } from 'react'
import Button from 'Components/button'
import Table from 'Components/table'
import Modal from 'Components/modal'
import { OrderContext } from 'Stores'
import {
	getOrderStatusName,
	getOrderCategoryName,
	getCountryName,
	formatTimestamp
} from 'Utils'
import Filter from './filter'

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { orders, filteredOrders, shouldFilter, resetOrders } =
		useContext(OrderContext)

	const onFilter = useCallback(() => {
		setIsModalOpen(true)
	}, [])

	const toggleModal = useCallback(() => {
		setIsModalOpen((prevState) => !prevState)
	}, [])

	return (
		<>
			<div className="home">
				<div className="home__header">
					<Button label="Filter" onClick={onFilter} primary></Button>
					<Button label="Clear" onClick={resetOrders} outline></Button>
				</div>
				<div className="home__table">
					<Table data={shouldFilter ? filteredOrders : orders}>
						<div prop="orderId" label="ID" align="center"></div>
						<div prop="customerName" label="Customer Name"></div>
						<div
							prop="status"
							label="Status"
							custom={(row) => <span>{getOrderStatusName(row.status)}</span>}
						></div>
						<div
							prop="category"
							label="Category"
							custom={(row) => (
								<span>{getOrderCategoryName(row.category)}</span>
							)}
						></div>
						<div
							prop="country"
							label="Country"
							custom={(row) => <span>{getCountryName(row.country)}</span>}
						></div>
						<div
							prop="timestamp"
							label="Created Date"
							custom={(row) => <span>{formatTimestamp(row.createdDate)}</span>}
						></div>
					</Table>
				</div>
			</div>

			<Modal isOpen={isModalOpen} hide={toggleModal}>
				<Filter />
			</Modal>
		</>
	)
}

export default Home
