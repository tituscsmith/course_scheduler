import React from 'react';
import './App.css';
import CompletedCourse from './CompletedCourse';
import Card from 'react-bootstrap/Card'


class CompletedCourseArea extends React.Component {

    getCourses() {

      
      //Error prevention for if tab isn't activated
      if(this.props.completedCourses.length === 0){
        return;
      }
      var courses = [];
      // console.log(this.props.data)
      for(const course of Object.values(this.props.data)){
        // console.log("looping")
          //Only print through courses if contained in completedCourses array
          if(this.props.completedCourses.data.includes(course.number)){
          courses.push (
                    <CompletedCourse key={course.name} addRating = {(coursenumber, rating) => this.props.addRating(coursenumber, rating)}  data={course} completed = {true} cart ={this.props.cart}/>
               )
          }
      }

      //Error message for users to edit filter
      if(courses.length===0){
        return <Card className = "border-danger" style = {{"margin": "0px 7vw 3vh", backgroundColor: "#fcc2c2", borderWidth: '7px'}}>
              <Card.Body>
              <h1 style = {{"textAlign": "center"}}>No Completed Courses with Matching Criteria!</h1>
                <h3 style = {{"textAlign": "center"}}><em>Please try again with other search criteria!</em></h3>
              </Card.Body>
          </Card>
      }

      else return courses;
    }
  
  render() {
    return (
      <div style={{margin: '5px', marginLeft: '20vw'}}>
        {this.getCourses()}
      </div>
    )
  }
}

export default CompletedCourseArea;
