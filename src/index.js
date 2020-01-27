import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getDaysInMonth } from './date-util'

import styles from './styles.css'

export default class LittleCalendar extends Component {
  static propTypes = {
    startDate: PropTypes.obj,
  }

  constructor(props) {
    super(props);
    this.state = { date: props.startDate };
    this.changeMonthBack = this.changeMonthBack.bind(this);
    this.changeMonthForward = this.changeMonthForward.bind(this);
  }

  changeMonthBack () {
    let newDate = new Date(this.state.date);
    const month = newDate.getUTCMonth();
    
    newDate.setUTCMonth(newDate.getUTCMonth() - 1);
    
    while (newDate.getUTCMonth() === month) {
      newDate.setDate(newDate.getDate() - 1);
    }

    this.setState({date: newDate});
  }

  changeMonthForward () {
    let newDate = new Date(this.state.date);
    const month = newDate.getUTCMonth();
    
    newDate.setUTCMonth(newDate.getUTCMonth() + 1);
    
    while (newDate.getUTCMonth() === month) {
      newDate.setDate(newDate.getDate() + 1);
    }

    this.setState({date: newDate});
  }

  render () {
    const {
      date,
    } = this.state;

    const days = getDaysInMonth(date);
    const daysOfWeek = ["M","T","W","Th","F","S","Su"];
    const month = date.toLocaleString('default', { month: 'long' });
    const offset = days[0].getUTCDay() - 1;

    return (
      <div className={styles.littleCalendarWrapper}>
        <header>
          <h1>{month}</h1>
          <span
            className={styles.arrowLeft}
            onClick={this.changeMonthBack}></span>
          <span
            className={styles.arrowRight}
            onClick={this.changeMonthForward}></span>
        </header>
        <div className={styles.calWrapper}>
        {daysOfWeek.map((value, index) => {
          return <div 
            className={styles.calSquare}
            key={index}>
              {value}
            </div>
        })}
        {offset >= 0 && Array(offset).fill(0).map((value, index) => {
          return <div 
            className={styles.calSquare}
            key={index}>
            </div>
        })}
        {days.map((value, index) => {
          return <div 
            className={styles.calSquare}
            key={index}>
              {index + 1}
            </div>
        })}
        </div>
      </div>
    )
  }
}
