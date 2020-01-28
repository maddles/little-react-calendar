import React from 'react';
import styles from './styles.css'

const Day = props => (
   <div 
    className={props.classNameList}
    onClick={(e) => props.handleClick(props.value, props.disabled)}
    onMouseOver={(e) => props.handleHover(props.value, props.disabled)}
    key={props.index}>
      {props.value.getDate()}
    </div>
);

export default Day;
