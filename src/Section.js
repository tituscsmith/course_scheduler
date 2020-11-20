import React from 'react'
import './App.css'
// import Subsection from './Subsection.js'
import Time from './Time'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Section extends React.Component {
	constructor(props) {
		super(props);
		this.buttonRef = React.createRef();
	  }
	
	getTimes() {
		let days = [];
		let hours = [];

		//Need to figure out a way to parse the time's "values"
		for(const hour of Object.values(this.props.data.time)) {
			hours.push(hour);
		}
		for(const day of Object.keys(this.props.data.time)) {
			days.push(day)
		}
	
		let times = [];
		var i ;
		let key = 1;
		for (i = 0; i < days.length; i++) {
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

		//Add the section, if not already in cart
		if(!this.props.cart.includes(this.props.data)){
			cartArray.push(this.props.data);
			
			//Add subsection as well by default
			for(const subsection of Object.values(this.props.data.subsections)) {
				cartArray.push(subsection);
			  }

		  //Make sure we don't readd a class
		  if(this.props.cart!== undefined && !this.props.cart.includes(this.props.parent)){
			cartArray.push(this.props.parent);
			//Requisite Status Alert
				if(!this.props.checkRequisites(this.props.parent)){
					alert("!You do not meet the prerequisites for this course!");
				}
		  }
		  this.props.addToCart(cartArray);

		}

		//Remove the subsection
		else if(this.buttonRef.current.innerText===" Remove Section "){

			removeArray.push(this.props.data);

		  //Remove the subsection as well from the cart, if one is in
		  for(const subsection of Object.values(this.props.data.subsections)) {
				if(this.props.cart.includes(subsection)){
					removeArray.push(subsection);
				}
		  }		  
		  this.props.removeFromCart(removeArray);

		}

	  }
	  buttonText(){
    
		if(this.props.cart.includes(this.props.data)){
		  return <div>{this.props.getUnlockIcon()} Remove Section {this.props.getUnlockIcon()} </div>;
		}
		else return <div>{this.props.getLockIcon()} Add Section {this.props.getLockIcon()} </div>;
	  }
	  	//Body of our card
	  	cardBody(){
			  return <Card.Body>
			  <h2>{this.props.data.number} | {this.props.data.instructor}<Button ref={this.buttonRef} style = {{"float": "right", backgroundColor: "#6fa8dc", "fontFamily": "sans-serif"}} onClick = {(event) =>this.toggleCart(event)}>{this.buttonText()}</Button></h2>
			  <h4>{this.props.data.location}</h4>
			  <h5>{this.getTimes()}</h5>
			  <Card.Text></Card.Text>
			</Card.Body>
		  }
	  	sectionText(){

			  //If there are no sections, don't make the section clickable
			  if(this.props.data.subsections===undefined || this.props.data.subsections.length===0){
				return this.cardBody();
			  }
			  //If there are sections, do make the sections clickable
			  else{
				return <a onClick={() => this.props.changeSearchMode("subsection", this.props.parent, this.props.data)} 
				style={{ cursor: "pointer"}}>{this.cardBody()}</a>
			  }
		  }
	  
	render() {
		//Return Section Number, Location, Instructor and Meeting Times
		return (
			<Card style = {{"margin": "0px 100px 25px", backgroundColor: "#f3f9ff"}}>
			{this.sectionText()}
		</Card>
		)
	}
}

export default Section;