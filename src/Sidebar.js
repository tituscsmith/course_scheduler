import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SearchAndFilter from './SearchAndFilter';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.interestArea = React.createRef();
    this.state = {
      favoriteMode: false };
  }
  

  setCourses() {
    this.props.setCourses(this.searchAndFilter.searchAndFilter(this.props.courses, this.search.current.value, this.interestArea.current.value, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value, this.state.favoriteMode, this.props.favorites));
  }

  handleCreditsKeyDown(e) {
    if(['0','1','2','3','4','5','6','7','8','9','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for(const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }
  getInterestAreas() {
    let keywords = [];
    for(const keyword of this.props.keywords) {
      keywords.push(<option key={keyword}>{keyword}</option>);
    }
    return keywords;
  }
  toggleFavorite(){

    console.log("blah")
    this.setState((state) => ({
      favoriteMode: !this.state.favoriteMode
    }),
    () => {this.setCourses()}
  );
  }

  render() {
    return (      // {this.getInterests()}
      
      <>
        <Card className = "shadow" style={{width: 'calc(19vw - 5px)', position: 'fixed', 'marginTop': '11vh', marginLeft: '2vw',marginRight: '2vw', backgroundColor: "#f3f9ff", 'fontFamily': 'Merriweather, sans-serif'}}>
          <Card.Body>
            <Card.Title style = {{'fontSize': '24px'}}>Filter Courses!</Card.Title>
            <Form>
              <Form.Group controlId="formKeywords" onChange={() => this.setCourses()} style={{width: '100%'}}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search" autoComplete="off" ref={this.search}/>
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onChange={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formInterests">
                <Form.Label>Interest Area</Form.Label>
                <Form.Control as="select" ref={this.interestArea} onChange={() => this.setCourses()}>
                  {this.getInterestAreas()}
                </Form.Control>
              </Form.Group>

              <div style={{display: 'flex', flexDirection: 'row', 'fontFamily': 'Merriweather, sans-serif'}}>
                <Form.Group controlId="minimumCredits" style = {{'width': '3vw'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="number"  min = "1" max = "12" autoComplete="off" ref={this.minimumCredits}/>
                </Form.Group>
                <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px', 'fontFamily': 'Merriweather, sans-serif'}}>to</div>
                <Form.Group controlId="maximumCredits" style={{marginTop: '34px', 'width': '3vw'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="number" min="1" max = "12" autoComplete="off" ref={this.maximumCredits}/>
                </Form.Group>
                
              </div>
              <Form.Check ref = {this.favoriteMode} label="See Favorites" onChange={() => this.toggleFavorite()}/>
            </Form>
              
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Sidebar;
