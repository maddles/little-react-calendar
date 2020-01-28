import React from 'react';
import LittleCalendar from './';
import Day from './day';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('LittleCalendar gets the right month', () => {
  let cal = shallow(
  	<LittleCalendar
	  	startDate={ new Date('Jan 1 2020') } />);

  expect(cal.find(Day)).toHaveLength(31);

  cal = shallow(
  	<LittleCalendar
	  	startDate={ new Date('Feb 1 2020') } />);

  expect(cal.find(Day)).toHaveLength(29);
});

test('LittleCalendar sets start date on click', () => {
	const setStartMock = jest.fn();
	const startDate = new Date('Jan 1 2020');
	const expectedStart = new Date(startDate.getUTCFullYear(), startDate.getMonth(), 2)

  const cal = mount(
  	<LittleCalendar
	  	startDate={ startDate }
	  	singleDate={ false }
      setStartDate={ setStartMock }
  		labelOff="Off" />);

  cal.find(Day).at(1).simulate('click');
  expect(setStartMock).toHaveBeenCalledWith(expectedStart);
});

test('LittleCalendar sets end date on click', () => {
	const setEndMock = jest.fn();
	const startDate = new Date('Jan 1 2020');
	const expectedEnd = new Date(startDate.getUTCFullYear(), startDate.getMonth(), 12)

  const cal = mount(
  	<LittleCalendar
	  	startDate={ startDate }
	  	singleDate={ false }
      setEndDate={ setEndMock }
  		labelOff="Off" />);

  cal.find(Day).at(1).simulate('click');
  cal.find(Day).at(11).simulate('click');
  expect(setEndMock).toHaveBeenCalledWith(expectedEnd);
});