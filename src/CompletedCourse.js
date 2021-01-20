import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card'
import RateButton from './RateButton';




class CompletedCourse extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  render() {
    return (
          <Card className = "shadow" style = {{"margin": "0px 7vw 3vh", backgroundColor: "#f3f9ff"}}>
                  <Card.Body>
                    <h1>{this.props.data.name} <RateButton style = {{"float": "right"}} addRating = {(coursenumber, rating) => this.props.addRating(coursenumber, rating)}  completed = {this.props.completed} course = {this.props.data}></RateButton></h1>
                    <h5>{this.props.data.number} | {this.props.data.credits} Credits</h5>
                  </Card.Body>
          </Card>
    )
    
  }
}

export default CompletedCourse;
