import React from 'react'
import './App.css'


function Time(props) {
		//Capitalize Day
		var day = props.day
		day = day[0].toUpperCase()+day.slice(1).toLowerCase();

		return <div>{day} {props.hour}</div>;
		
}


export default Time;