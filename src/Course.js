import React from 'react';
import './App.css';
// import Section from './Section';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



class Course extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  

  	 //This function adds or removes classes/sections/subections from the cart,
	  //by pushing elements into an array and using one of the two callback functions
    //addToCart or removeToCart to adjust the cart
    
  toggleCart(event){
    event.stopPropagation()
    let cartArray = [];//Use array for sake of type match with section and subsections
    let removeArray = [];//Remove array
    if(!this.props.cart.includes(this.props.data)){

      //Requisite Status Alert
      if(!this.props.checkRequisites(this.props.data)){
        alert("!You do not meet the prerequisites for this course!");
      }
      


      //Still add course to cart even if class doesn't meet requirements
      cartArray.push(this.props.data);
      //Add course to cart
      for(const section of Object.values(this.props.data.sections)) {
        if(!this.props.cart.includes(section)){
          // sectionStatus = true;
          cartArray.push(section);
          for(const subsection of Object.values(section.subsections)) {
            cartArray.push(subsection);

          }
        }
      }

      this.props.addToCart(cartArray);
    }
    else if(this.buttonRef.current.innerText===" Remove Class "){
      removeArray.push(this.props.data);

      //Remove any section or subsection in cart
      for(const section of Object.values(this.props.data.sections)) {
				if(this.props.cart.includes(section)){
          removeArray.push(section);
          for(const subsection of Object.values(section.subsections)) {

            if(this.props.cart.includes(subsection)){
              removeArray.push(subsection);
            }
          }
				}
      }
      this.props.removeFromCart(removeArray);

    }
    else{
      console.log(this.buttonRef.current.innerText)
    }


  }
  buttonText(){
    if(this.props.getUnlockIcon() === null){
      return;
    }
    if(this.props.cart.includes(this.props.data)){
      return <div>{this.props.getUnlockIcon()} Remove Class {this.props.getUnlockIcon()} </div>;
    }
    else return <div>{this.props.getLockIcon()} Add Class {this.props.getLockIcon()} </div>;
  }

  //Add an ellipsis if description is too long
  descriptionAbbreviation(){
    if(this.props.data.description.length < 400){
      return this.props.data.description;
    }
    else return this.props.data.description.slice(0,400).concat("...");
  }

  render() {
    return (//Return Name, Subject, Credits, Course Number, Course Description, Requisites, Keyboard
      //, backgroundColor: "#f3f9ff"
          <Card style = {{"margin": "0px 3vw 3vh", backgroundColor: "#f3f9ff"}}>
              <a onClick={() => this.props.changeSearchMode("section", this.props.data, null)} style={{ cursor: "pointer"}}>
                  <Card.Body>
                    <h1>{this.props.data.name}<Button ref={this.buttonRef} style = {{"float": "right", backgroundColor: "#6fa8dc", "fontFamily": "sans-serif"}} onClick = {(event) =>this.toggleCart(event)}>{this.buttonText()}</Button></h1>
                    <h5>{this.props.data.number} | {this.props.data.credits} Credits</h5>
                    <Card.Text>{this.descriptionAbbreviation()}</Card.Text>
                  </Card.Body></a>
          </Card>
    )
    
  }
}

export default Course;
