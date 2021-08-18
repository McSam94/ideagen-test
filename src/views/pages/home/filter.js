import React, { memo, useCallback, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Checkbox from 'Components/checkbox'
import Input from 'Components/input'
import Dropdown from 'Components/dropdown'
import Button from 'Components/button'
import CheckboxGroup from 'Components/checkboxgroup'
import { getCountryName, getInitialState } from 'Utils'
import { OrderContext } from 'Stores'
import Constants from 'Configs/constants'
import OrderSample from 'Stores/order/orders-sample'
import Capitalize from 'lodash/capitalize'

const DUPLICATE_CUSTOMERS_OPTIONS = OrderSample?.map((order) => ({
	label: order.customerName,
	value: order.customerName
}))

const CUSTOMER_OPTIONS = DUPLICATE_CUSTOMERS_OPTIONS.filter(
	(option, index, self) =>
		self.findIndex((selfOption) => selfOption.value === option.value) === index
)

const STATUS_OPTIONS = Object.entries(Constants.STATUS).map(([key, value]) => ({
	label: Capitalize(key),
	value
}))

const CATEGORY_OPTIONS = Object.entries(Constants.CATEGORY).map(
	([key, value]) => ({
		label: Capitalize(key),
		value
	})
)

const COUNTRY_OPTIONS = Object.entries(Constants.COUNTRY).map(([_, value]) => ({
	label: getCountryName(value),
	value
}))

const FORM_INIT_STATE = {
	isCreatedDate: false,
	fromDate: '',
	toDate: '',
	isCustomerName: false,
	customerName: '',
	isStatus: false,
	status: [],
	isCategory: false,
	category: [],
	isCountry: false,
	country: ''
}

const Filter = ({ toggleModal }) => {
	const filterSchema = useMemo(
		() =>
			yup.object().shape({
				isCreatedDate: yup.boolean(),
				fromDate: yup.string().when('isCreatedDate', {
					is: true,
					then: yup
						.string()
						.required('To date is required')
						.test('isDate', 'Invalid Date Format', (value) =>
							/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(
								value
							)
						)
				}),
				toDate: yup.string().when('isCreatedDate', {
					is: true,
					then: yup
						.string()
						.required('From date is required')
						.test('isDate', 'Invalid Date Format', (value) =>
							/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(
								value
							)
						)
				}),
				isCustomerName: yup.boolean(),
				customerName: yup.string().when('isCustomerName', {
					is: true,
					then: yup.string().required('Customer name is required')
				}),
				isStatus: yup.boolean(),
				status: yup.array().when('isStatus', {
					is: true,
					then: yup.array().min(1, 'Please select at least 1 status')
				}),
				isCategory: yup.boolean(),
				category: yup.array().when('isCategory', {
					is: true,
					then: yup.array().min(1, 'Please select at least 1 category')
				}),
				isCountry: yup.boolean(),
				country: yup.string().when('isCountry', {
					is: true,
					then: yup.string().required('Country is required')
				})
			}),
		[]
	)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
		reset
	} = useForm({
		resolver: yupResolver(filterSchema),
		defaultValues:
			getInitialState(Constants.FILTER_KEY, true) ?? FORM_INIT_STATE
	})

	const { filterOrders } = useContext(OrderContext)

	const resetFilter = useCallback(() => {
		reset(FORM_INIT_STATE)
	}, [reset])

	const applyFilter = useCallback((data) => {
		filterOrders(data)
		toggleModal()
	}, [])

	return (
		<>
			<div className="filter__header">
				<p className="filter__title">Filter</p>
				<p className="filter__caption">Select criteria filter in listing</p>
			</div>
			<div className="filter__content">
				<div className="filter__content-row">
					<Checkbox label="Created Date" {...register('isCreatedDate')} />
					<div className="filter__content-ranger">
						Display range from
						<Input
							className="filter__content-input"
							error={errors?.fromDate?.message}
							placeholder="DD/MM/YYYY"
							disabled={!watch('isCreatedDate')}
							{...register('fromDate')}
						/>
						to
						<Input
							className="filter__content-input"
							error={errors?.toDate?.message}
							placeholder="DD/MM/YYYY"
							disabled={!watch('isCreatedDate')}
							{...register('toDate')}
						/>
					</div>
				</div>
				<div className="filter__content-row">
					<Checkbox label="Customer Name" {...register('isCustomerName')} />
					<Dropdown
						className="filter__content-customerName"
						options={CUSTOMER_OPTIONS}
						disabled={!watch('isCustomerName')}
						{...register('customerName')}
					/>
				</div>
				<div className="filter__content-row">
					<Checkbox label="Status" {...register('isStatus')} />
					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<CheckboxGroup
								options={STATUS_OPTIONS}
								disabled={!watch('isStatus')}
								{...field}
								canSelectAll
							/>
						)}
					/>
				</div>
				<div className="filter__content-row">
					<Checkbox label="Category" {...register('isCategory')} />
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<CheckboxGroup
								options={CATEGORY_OPTIONS}
								disabled={!watch('isCategory')}
								{...field}
								canSelectAll
							/>
						)}
					/>
				</div>
				<div className="filter__content-row">
					<Checkbox label="Country" {...register('isCountry')} />
					<Dropdown
						name="country"
						className="filter__content-country"
						options={COUNTRY_OPTIONS}
						disabled={!watch('isCountry')}
						{...register('country')}
					/>
				</div>
			</div>
			<div className="filter__footer">
				<Button
					className="filter__footer-left"
					label="Reset"
					onClick={resetFilter}
				/>
				<div className="filter__footer-right">
					<Button
						className="filter__footer-btn"
						label="Apply"
						onClick={handleSubmit(applyFilter)}
						primary
					/>
					<Button
						className="filter__footer-btn"
						label="Close"
						onClick={toggleModal}
						outline
					/>
				</div>
			</div>
		</>
	)
}

Filter.propTypes = {
	toggleModal: PropTypes.func
}

export default memo(Filter)
