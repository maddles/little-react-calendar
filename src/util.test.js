import { getDaysInMonth } from './date-util';

describe('getDaysInMonth', () => {
  it('is truthy', () => {
    expect(getDaysInMonth).toBeTruthy()
  })

   it('should throw error on unparsable date', () => {
		expect(() => {
			getDaysInMonth('rat rat');
		}).toThrow();

		expect(() => {
			getDaysInMonth(123);
		}).toThrow();
  })

   it('should return array of dates', () => {
   	const date = new Date('12 Feb 2020 00:12:00 GMT');
		const dates = getDaysInMonth(date);

		expect(dates).toHaveLength(29);
  })
})
