//Author: Titus Smith
//Modified Skeleton Code from CS639, UW-Madison Fall 2020
import './App.css';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import CompletedCourseArea from './CompletedCourseArea';
import RecommendedCourseArea from './RecommendedCourseArea';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeSearchMode = this.changeSearchMode.bind(this);
    this.addRating = this.addRating.bind(this);

    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      keywords: [],
      cartMode: false,
      cart: [],
      searchMode: 'course',
      currentCourse: null,
      currentSection: null,
      completedCourses: [],
      favorites: [],
      recommendedKeywords: [],
      recommendedCourses: [],
      recommendedRatings: []    };
  }

    //Function to add a set of elements (e) to
   //the cart array; set could just be one element
   addFavorite(e) {
    let a = this.state.favorites.slice(); //creates the clone of the state

      let index = a.length;
      a[index] = e;

      this.setState({favorites: a});
    console.log("added favorite");
  }

  //Function to remove a set of elements (e) from
  //the cart array; set could just be one element
  removeFavorite(e) {
    
      var a= [...this.state.favorites]; // make a separate copy of the array

      for( var i = 0; i < a.length; i++){ if ( a[i] === e) { a.splice(i, 1); i--; }}//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]

      //Adjust state array to copy
      this.setState({favorites: a});
  }

  changeSearchMode(mode, course, section){
    this.setState({searchMode: mode, currentCourse: course, currentSection: section});
  }
    //Need to remove course and add new rating if viable
    addRating(course, rating){
      // console.log(course)
      // console.log(rating)

      let a = this.state.recommendedCourses.slice(); //creates the clone of the state
      let b = this.state.recommendedRatings.slice(); //creates the clone of the state
      let index = a.indexOf(course);

      //Add course to array
      if(index === -1 && rating > 3){
          let index = a.length;
          a[index] = course;
          b[index] = rating;
        }

        //Need to remove element from array
      else if(index!== -1 && (rating <=3 || rating === "Rate Course")){
        //Special case to completely empty out array
        if(a.length===1){
          a.splice(0, 1)
          b.splice(0,1)
        }
        else{
          a.splice(index, 1);
          b.splice(index, 1);
        }
      }
      //Update possitive rating within recommended courses
        else{
          a[index] = course;
          b[index] = rating;
        }

      this.setState(({recommendedCourses: a, recommendedRatings: b}), ()=> this.updateRecommendedKeywords());
    return;
    
    }
  
   //Function to add a set of elements (e) to
   //the cart array; set could just be one element
   addToCart(e) {
    let a = this.state.cart.slice(); //creates the clone of the state

    for(var i = 0; i<e.length; i++){
      let index = a.length;
      
      a[index] = e[i];
    }
    this.setState({cart: a});

  }

  //Function to remove a set of elements (e) from
  //the cart array; set could just be one element
  removeFromCart(e) {
    
      var a= [...this.state.cart]; // make a separate copy of the array
      a = a.filter(x => !e.includes(x));


      //Adjust state array to copy
      this.setState({cart: a});
  }

  //Function to toggle cartMode
toggleCart = (eventKey) => {
  //Go back to course view when mode is toggled, if in section or subsection view
  this.changeSearchMode("course", null, null);
  
  if(eventKey === "cart"){
      this.setState(
      {cartMode: true}
    );

  }
  else{
    this.setState(
      {cartMode: false}
    );

  }
}
  componentDidMount() {
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/classes').then(
      res => res.json()
    ).then(data => this.setState({allCourses: data, filteredCourses: data, subjects: this.getSubjects(data), keywords: this.setInterestAreas(data)}))
    
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed').then(
      res => res.json()
    ).then(data => this.setState({completedCourses: data})) ;

  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }
  setInterestAreas(data){
    let keywords = [];
    keywords.push("All");

    for(const course of Object.values(data)) {

        var keyList = course.keywords.toString().split(/[,]+/);
            for(var i = 0; i<keyList.length; i++){
  
              if(keywords.indexOf(keyList[i]) === -1){
                keywords.push(keyList[i]);
              }
            }
            // index++;
      }
      this.setState({keywords: keywords});

      return keywords
    }
    updateRecommendedKeywords(){
      let recommendedKeywords = [];
      var index = 0;
      
      for(const course of Object.values(this.state.recommendedCourses)) {
          if(this.state.recommendedRatings[index]>3){
          var keyList = course.keywords.toString().split(/[,]+/);
              for(var i = 0; i<keyList.length; i++){
    
                if(recommendedKeywords.indexOf(keyList[i]) === -1){
                  recommendedKeywords.push(keyList[i]);
                }
              }
              index++;
            }
        }
        this.setState({recommendedKeywords: recommendedKeywords});
        return recommendedKeywords
      }

  setCourses(courses) {
    this.setState({filteredCourses: courses})
  }
  render() {
    return (//'background-image':'url("classroom.png")'
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Sidebar style = {{ 'font-family': 'Merriweather'}} setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} keywords = {this.state.keywords} favorites = {this.state.favorites}/>

        <Tabs className = "myClass" defaultActiveKey="search" onSelect={(k) => this.toggleCart(k)}  style={{'minHeight': '3.5vh',  position: 'fixed', zIndex: 1,  width: '100%', backgroundColor: "#f3f9ff"}}>
        <Tab title="UW Courses" disabled ></Tab>
        <Tab className = "clouds" eventKey="search" title="Search" style={{paddingTop: '5vh', 'minHeight': '100vh'}}>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} completedCourses = {this.state.completedCourses} changeSearchMode = {(String, Course, Subsection) => this.changeSearchMode(String, Course, Subsection)} searchMode = {this.state.searchMode} currentCourse = {this.state.currentCourse} currentSection = {this.state.currentSection} cart = {this.state.cart} removeFromCart={(Course) => this.removeFromCart(Course)} addToCart={(Course) => this.addToCart(Course)} allData={this.state.allCourses} cartMode={this.state.cartMode}/>
          </div>
          </Tab>

          <Tab className = "classroom" eventKey="cart" title="Cart" style={{paddingTop: '5vh',  'minHeight': '100vh' }} >
          <div style={{marginLeft: '20vw'}}>
          <CourseArea data={this.state.filteredCourses} completedCourses = {this.state.completedCourses} changeSearchMode = {(String, Course, Subsection) => this.changeSearchMode(String, Course, Subsection)} searchMode = {this.state.searchMode} currentCourse = {this.state.currentCourse} currentSection = {this.state.currentSection} cart = {this.state.cart} removeFromCart={(Course) => this.removeFromCart(Course)} addToCart={(Course) => this.addToCart(Course)} allData={this.state.allCourses} cartMode={this.state.cartMode}/>

          </div>
          </Tab>
          <Tab className = "completed" eventKey="completed" title="Completed Courses" style={{paddingTop: '5vh', 'minHeight': '100vh'}}>

              <div style={{marginLeft: '20vw'}}>
              <CompletedCourseArea data={this.state.filteredCourses} allData={this.state.allCourses} addRating = {(coursenumber, rating) => this.addRating(coursenumber, rating)} completedCourses = {this.state.completedCourses}/>

          </div>
          </Tab>

          <Tab  className = "recommended" eventKey="recommended" title="Recommended Courses" style={{paddingTop: '5vh', 'minHeight': '100vh' }}>

              <div style={{marginLeft: '20vw'}}>
              <RecommendedCourseArea addFavorite = {(Course) => this.addFavorite(Course)} removeFavorite = {(Course) => this.removeFavorite(Course)} recommendedCourses = {this.state.recommendedCourses} recommendedKeywords={this.state.recommendedKeywords} data={this.state.filteredCourses} allData={this.state.allCourses} completedCourses = {this.state.completedCourses} cart = {this.state.cart} removeFromCart={(Course) => this.removeFromCart(Course)} addToCart={(Course) => this.addToCart(Course)} allData={this.state.allCourses} cartMode={this.state.cartMode}/>
              
          </div>
          </Tab>
         
        </Tabs> 
      </>
    )
  }
}

export default App;