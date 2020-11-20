import React from 'react'
import './App.css'
import Time from './Time.js'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class Subsection extends React.Component {
	constructor(props) {
		super(props);
		this.buttonRef = React.createRef();
	  }

	getTimes() {
		let days = [];
		let hours = [];

		//Iterate through and parse days and hours from the time data
		for(const hour of Object.values(this.props.data.time)) {
			hours.push(hour);
		}
		for(const day of Object.keys(this.props.data.time)) {
			days.push(day)
		}
	
		let times = [];
		let key = 1;//unique keys for each time component

		//Combine the hour and time data to get time components
		for (var i = 0; i < days.length; i++) {
			times.push(<Time key = {key} day={days[i]} hour={hours[i]}/>)
			key++;
		}
		
		return times;
	  }

	  //This function adds or removes classes/sections/subections from the cart,
	  //by pushing elements into an array and using one of the two callback functions
	  //addToCart or removeToCart to adjust the cart
	  toggleCart(){
		let cartArray = [];
		let removeArray = [];
	
		

		//Case for subsection not in the cart: need to add
		if(!this.props.cart.includes(this.props.data)){
		  //Requisite Status Alert
		
			cartArray.push(this.props.data);

		  //Make sure we don't readd a section
		  if(this.props.cart!== undefined && !this.props.cart.includes(this.props.parent)){
			cartArray.push(this.props.parent);

			  //Make sure we don't readd a class
			  if(!this.props.cart.includes(this.props.grandparent)){
				if(!this.props.checkRequisites(this.props.grandparent)){
					alert("!You do not meet the prerequisites for this course!");
					}
				cartArray.push(this.props.grandparent);
			  }
		  }

		  //Add all added elements to cart
		  this.props.addToCart(cartArray);
		}

		//Case for subsection in the cart: need to remove
		else if(this.buttonRef.current.innerText===" Remove Subsection "){
		  removeArray.push(this.props.data);
		  this.props.removeFromCart(removeArray);

		}

	  }

	  buttonText(){
    
		if(this.props.cart.includes(this.props.data)){
		  return <div>{this.props.getUnlockIcon()} Remove Subsection {this.props.getUnlockIcon()} </div>;
		}
		else return <div>{this.props.getLockIcon()} Add Subsection {this.props.getLockIcon()} </div>;
	  }
	render() {
		//Subsections shouldn't be clickable, other than adding them
		return (
			<Card style = {{"margin": "0px 100px 25px", backgroundColor: "#f3f9ff"}}>
				<Card.Body>
				  <h1>{this.props.data.number} | {this.props.data.location}<Button ref={this.buttonRef} style = {{"float": "right", backgroundColor: "#6fa8dc", "fontFamily": "sans-serif"}} onClick = {(event) =>this.toggleCart(event)}>{this.buttonText()}</Button></h1>
				  <h4>{this.getTimes()}</h4>
				  <Card.Text></Card.Text>
				</Card.Body>
		</Card>
		)
	}
}

export default Subsection;