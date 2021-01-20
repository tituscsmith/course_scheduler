import React from 'react';
import './App.css';
import RecommendedCourse from './RecommendedCourse';
import Card from 'react-bootstrap/Card'

class RecommendedCourseArea extends React.Component {

    getCourses() {
      //Error prevention for if tab isn't activated
      if(this.props.completedCourses.length === 0){
        return;
      }
      var courses = [];

      for(const course of Object.values(this.props.data)){
          //Only print course if course shares a keyword with the 
          //highly rated completed courses, aka call hasKeyword
          var matchingKeyword = this.keywordMatch(course);
          if(!this.props.completedCourses.data.includes(course.number) && matchingKeyword!==null){
          courses.push (
                    <RecommendedCourse addFavorite={(e) => this.props.addFavorite(e)} removeFavorite={(e) => this.props.removeFavorite(e)} matchingKeyword = {matchingKeyword} key={course.name} data={course} completed = {true} cart ={this.props.cart}/>
               )
          }
      }


      //Message for users to rate a course
      if(this.props.recommendedKeywords.length===0){
        return <Card className = "shadow" style = {{"margin": "0px 3vw 2vh", backgroundColor: "#f3f9ff"}}>
              <Card.Body>
              <h1 style = {{"textAlign": "center"}}>No Highly Rated Courses to Recommend From!</h1>
                <h3 style = {{"textAlign": "center"}}><em>Rate completed courses to see courses recommended for you!</em></h3>
              </Card.Body>
          </Card>
      }
      //Error message for filter mistakes
      else if (courses.length===0){
        return <Card className = "border-danger shadow" style = {{"margin": "0px 7vw 3vh", backgroundColor: "#fcc2c2", borderWidth: '7px'}}>
              <Card.Body>
              <h1 style = {{"textAlign": "center"}}>No Recommended Courses with Matching Criteria!</h1>
                <h3 style = {{"textAlign": "center"}}><em>Please try again with other search criteria!</em></h3>
              </Card.Body>
          </Card>
      }
      else return courses;
    }
    
    //Function to check if a course has a recommended keyword
    //Returns null if not, matcshing keyword if so
    keywordMatch(course){
          for(const keyword of Object.values(course.keywords)){
            if(this.props.recommendedKeywords.includes(keyword)){
              return keyword;
            }
      }
      return null;
    }

  render() {
    return (
      <div style={{margin: '5px', marginLeft: '20vw'}}>
        {this.getCourses()}
      </div>
    )
  }
}

export default RecommendedCourseArea;
