let DateTypeError = function DateTypeError(unparsableDate, message) {
  this.name = 'DateTypeError';
  this.message = message || `Couldn\'t get date from ${unparsableDate}.`;
  this.stack = (new Error()).stack;
};

DateTypeError.prototype = new Error();
DateTypeError.prototype.constructor = DateTypeError;

function _dateParseCheck (date) {
	if (date instanceof Date) {
		return date
	}

	if (typeof date === String) {
		let parsedString = Date.parse(date)

		if (!isNaN(date)) {
			return date
		}
	}

	throw new DateTypeError();
	
	return false;
}

function _getDaysInMonth (date) {
	let month = date.getUTCMonth();
	let year = date.getUTCFullYear();
	let day = new Date(year, month, 1);

	let daysInMonth = [];

	 while (day.getUTCMonth() === month) {
		daysInMonth.push(new Date(day));
		day.setUTCDate(day.getUTCDate() + 1);
	 }

   return daysInMonth;
}

/*returns array*/
export function getDaysInMonth (date) {
  	if (_dateParseCheck(date)) {
  		return _getDaysInMonth(date);
  	}
}

