import React, { Component } from 'react'

import LittleCalendar from 'little-react-calendar'

export default class App extends Component {
  setStartDate (value) {
  	this.setState({ start: value })
  }

  setEndDate (value) {
  	this.setState({ end: value })
  }

  render () {
  	const date = new Date();

    return (
      <div>
        <LittleCalendar 
        	startDate={ date }
        	singleDate={ false }
        	setStartDate={ this.setStartDate.bind(this) }
        	setEndDate={ this.setEndDate.bind(this) } />
        	{this.state &&
        		<div>
        			<p>{ this.state.start && this.state.start.toString() }</p>
        			<p>—</p>
        			<p>{ this.state.end && this.state.end.toString() }</p>
        		</div>
        	}
      </div>
    )
  }
}
