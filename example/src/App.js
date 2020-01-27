import React, { Component } from 'react'

import LittleCalendar from 'little-react-calendar'

export default class App extends Component {
  render () {
  	const date = new Date();

    return (
      <div>
        <LittleCalendar 
        	startDate={date} />
      </div>
    )
  }
}
