import day from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import customParseFormat from 'dayjs/plugin/customParseFormat'

day.extend(isBetween)
day.extend(customParseFormat)

export const formatTimestamp = (timestamp, format = 'DD/MM/YYYY') => {
	return day(new Date(timestamp * 1000)).format(format)
}

export const convertToDayJs = (time, format = 'timestamp') => {
	return format === 'timestamp' ? day(new Date(time * 1000)) : day(time, format)
}
