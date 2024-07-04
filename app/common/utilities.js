import { PixelRatio, Dimensions } from "react-native";
import moment from 'moment';

export function debounce(func, wait, immediate) {
	let timeout
	return function () {
		const context = this,
			args = arguments
		const later = function () {
			timeout = null
			if (!immediate) {
				func.apply(context, args)
			}
		}
		const callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) {
			func.apply(context, args)
		}
	}
}

export const isTablet = () => {
	let pixelDensity = PixelRatio.get();
	const adjustedWidth = Dimensions.get('window').width * pixelDensity;
	const adjustedHeight = Dimensions.get('window').height * pixelDensity;
	if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
		return true;
	} else
		return (
			pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
		);
};

export const getDatesForFilter = (value, dateFormat = 'DD-MM-YYYY') => {
	let start_date = null,
		end_date = null;
	switch (value) {
		case 1: // today
			start_date = moment().format(dateFormat);
			end_date = moment().format(dateFormat);
			break;
		case 2: // tomorrow
			start_date = moment().add(1, 'days').format(dateFormat);
			end_date = moment().add(1, 'days').format(dateFormat);
			break;
		case 3: // next 7 days
			start_date = moment().format(dateFormat);
			end_date = moment().add(6, 'days').format(dateFormat);
			break;
		case 4: // next 30 days
			start_date = moment().format(dateFormat);
			end_date = moment().add(29, 'days').format(dateFormat);
			break;
		case 5: // yesterday
			end_date = moment().add(-1, 'days').format(dateFormat);
			start_date = moment().add(-1, 'days').format(dateFormat);
			break;
		case 6: // past 7 days
			end_date = moment().format(dateFormat);
			start_date = moment().add(-6, 'days').format(dateFormat);
			break;
		case 7: // past 30 days
			end_date = moment().format(dateFormat);
			start_date = moment().add(-29, 'days').format(dateFormat);
			break;
	}

	return {
		start_date,
		end_date
	}
}