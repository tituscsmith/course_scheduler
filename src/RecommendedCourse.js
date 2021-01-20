import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'




class RecommendedCourse extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }


  //Add an ellipsis if description is too long
  descriptionAbbreviation(){
    if(this.props.data.description.length < 400){
      return this.props.data.description;
    }
    else return this.props.data.description.slice(0,400).concat("...");
  }

  toggleFavorite(){
    console.log(this.buttonRef.current.innerHTML)
    if(this.buttonRef.current.innerHTML==="Add to Favorites"){
      this.buttonRef.current.innerHTML="Remove from Favorites"
      return this.props.addFavorite(this.props.data);

    }
    else{
      this.buttonRef.current.innerHTML="Add to Favorites"
      return  this.props.removeFavorite(this.props.data);

    }

  }
//onClick={() => this.props.changeSearchMode("course", this.props.data, null)}
//onClick={console.log(this.props.data)
  render() {
    return (
          <Card className = "shadow" style = {{"margin": "0px 3vw 3vh", backgroundColor: "#f3f9ff"}}>
                  <Card.Body>
                    <h1>{this.props.data.name}<Button ref={this.buttonRef} style = {{"float": "right", backgroundColor: "#6fa8dc", "fontFamily": "sans-serif"}} onClick={() => this.toggleFavorite()}>Add to Favorites</Button></h1>
                    <h5>{this.props.data.number} | {this.props.data.credits} Credits</h5>
                    <h5>Matching keyword: {this.props.matchingKeyword}</h5>
                    <Card.Text>{this.descriptionAbbreviation()}</Card.Text>
                  </Card.Body>
          </Card>
    )
    
  }
}

export default RecommendedCourse;
