import React from 'react'
import './App.css'
import Dropdown from 'react-bootstrap/Dropdown';

class RateButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: "Rate Course!",
		  };
	  }
	  

	  getButton(){
	  if(this.props.completed){
				return (
					<Dropdown style = {{display: "inline", float: "right"}} onSelect={(e) => this.handleSelect(e)}>
							<Dropdown.Toggle style = {{backgroundColor: "#6fa8dc", borderColor: "#6fa8dc", fontSize: '20px'}} variant="success" id="dropdown-basic">
								{this.state.rating}

							</Dropdown.Toggle>
							<Dropdown.Menu >
								<Dropdown.Item eventKey = "Rate Course">No Rating</Dropdown.Item>
								<Dropdown.Item eventKey = "1">1</Dropdown.Item>
								<Dropdown.Item eventKey = "2">2</Dropdown.Item>
								<Dropdown.Item eventKey = "3">3</Dropdown.Item>
								<Dropdown.Item eventKey = "4">4</Dropdown.Item>
								<Dropdown.Item eventKey = "5">5</Dropdown.Item>
							</Dropdown.Menu>
					</Dropdown>
				)
			}
	}
	handleSelect(e){
		this.setState({rating: e});
		this.props.addRating(this.props.course, e);
	}

	render() {
		return (
			<React.Fragment>{this.getButton()}</React.Fragment>
		)
	}
}

export default RateButton;