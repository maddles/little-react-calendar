import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getDaysInMonth } from './date-util'
import Day from './day'

import styles from './styles.css'

export default class LittleCalendar extends Component {
  static propTypes = {
    startDate: PropTypes.date,
    isSingleDate: PropTypes.number,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const { startDate, isSingleDate } = props

    this.state = { date: startDate || new Date(),
      isSingleDate: isSingleDate || false };
    this._changeMonthBack = this._changeMonthBack.bind(this);
    this._changeMonthForward = this._changeMonthForward.bind(this);
    this._deselectActive = this._deselectActive.bind(this);
    this.dateClicked = this.dateClicked.bind(this);
    this.dateHovered = this.dateHovered.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.setStartDate) {
      if (this.state.rangeStart !== prevState.rangeStart) {
        this.props.setStartDate(this.state.rangeStart);
      }
    }

    if (this.props.setEndDate) {
      if (this.state.rangeEnd !== prevState.rangeEnd) {
        this.props.setEndDate(this.state.rangeEnd);
      }
    }
  }

  dateClicked (value, disabled) {
    const { setStartDate, setEndDate } = this.props

    if (!this.state.rangeStart) {
      this.setState({ rangeStart: value });
      
      return;
    } 
    
    if (value > this.state.rangeStart) {
      this.setState({ rangeEnd: value });

      return;
    }

    if (value = this.state.rangeStart) {
      this.setState({ rangeStart: undefined, rangeEnd: undefined });
    }    
  }

  dateHovered (value, disabled) {
    const start = this.state.rangeStart
    if (start && value >= start) {
      this.setState({ rangeActive: value });
    }
  }

  _changeMonthBack () {
    let newDate = new Date(this.state.date);
    const month = newDate.getUTCMonth();
    
    newDate.setUTCMonth(newDate.getUTCMonth() - 1);
    
    while (newDate.getUTCMonth() === month) {
      newDate.setDate(newDate.getDate() - 1);
    }

    this.setState({ date: newDate });
  }

  _changeMonthForward () {
    let newDate = new Date(this.state.date);
    const month = newDate.getUTCMonth();
    
    newDate.setUTCMonth(newDate.getUTCMonth() + 1);
    
    while (newDate.getUTCMonth() === month) {
      newDate.setDate(newDate.getDate() + 1);
    }

    this.setState({ date: newDate });
  }

  _deselectActive () {
    this.setState({ rangeActive: undefined });
  }

  render () {
    const {
      date,
    } = this.state;

    const days = getDaysInMonth(date);
    const daysOfWeek = ["M","T","W","Th","F","S","Su"];
    const month = date.toLocaleString('default', { month: 'long' });
    const offset = days[0].getUTCDay() - 1;
    const rangeStart = this.state.rangeStart && this.state.rangeStart.getTime()
    const rangeEnd = this.state.rangeEnd && this.state.rangeEnd.getTime()
    const rangeActive = this.state.rangeActive && this.state.rangeActive.getTime()

    return (
      <div className={ styles.littleCalendarWrapper }>
        <header>
          <h1>{ month }</h1>
          <span
            className={ `${styles.arrow} ${styles.arrowLeft}` }
            onClick={ this._changeMonthBack }></span>
          <span
            className={ `${styles.arrow} ${styles.arrowRight}` }
            onClick={ this._changeMonthForward }></span>
        </header>
        <div
          onMouseLeave={ this.deselectActive }
          className={ styles.calWrapper }>
        { daysOfWeek.map((value, index) => {
          return <div 
            className={ styles.calSquare }
            key={ index }>
              { value }
            </div>
        })}
        { offset >= 0 && Array(offset).fill(0).map((value, index) => {
          return <div 
            className={ styles.calSquare }
            key={ index }>
            </div>
        })}
        { days.map((value, index) => {
          const disabled = rangeStart > value || value > rangeEnd
          const active = value >= rangeStart && value <= rangeActive
          const disabledClass = `${disabled ? styles.disabled : ''}`
          const activeClass = `${active ? styles.active : ''}`
          const classNameList = `${styles.calSquare} ${disabledClass} ${activeClass}`

          return <Day 
            classNameList={ classNameList }
            handleClick={ this.dateClicked }
            handleHover={ this.dateHovered }
            key={ index }
            value={ value } />
        })}
        </div>
      </div>
    )
  }
}
