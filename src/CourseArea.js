import React from 'react';
import './App.css';
import Course from './Course';
import Section from './Section';
import Subsection from './Subsection';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Time from './Time.js'


class CourseArea extends React.Component {
  constructor(props) {
    super(props);
    this.checkRequisites = this.checkRequisites.bind(this);

  }

    displaySearchMode(){

      //Don't print anything if data hasn't loaded yet
      if(!Object.keys(this.props.allData).length){
        return;
      }

      if(this.props.searchMode === 'course'){
        var courseDisplay = this.getCourses();

        if(courseDisplay.length  === 0 && this.props.cartMode === false){
          return <Card className = "border-danger" style = {{"margin": "0px 3vw 2vh", backgroundColor: "#fcc2c2", borderWidth: '7px'}}>
              <Card.Body>
              <h1 style = {{"textAlign": "center"}}>No Courses with Matching Criteria!</h1>
                <h3 style = {{"textAlign": "center"}}><em>Please try again with other search criteria!</em></h3>
              </Card.Body>
          </Card>
        }
        else return courseDisplay
      }
      else if(this.props.searchMode === 'section'){
        return this.getSections();
      }
      else if(this.props.searchMode === 'subsection'){
        return this.getSubsections();
      }
    }
  
    getSubsections() {
      console.log("getSubsections called");
      let subsections = [];
      let subsectionStatus = false;
  
       let sectionStatus = this.props.cart.includes(this.props.currentSection);
       //Case for section/parent isn't in cart; display all subsections
       if(!sectionStatus){
        for(const subsection of Object.values(this.props.currentSection.subsections)) {
      
          subsections.push (
          <Subsection key={subsection.number}  checkRequisites = {(c) => this.checkRequisites(c)} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} parent = {this.props.currentSection} grandparent = {this.props.currentCourse} cart = {this.props.cart} data={subsection} removeFromCart={(course) => this.props.removeFromCart(course)} addToCart={(course) => this.props.addToCart(course)}/>
          )
        }
        }
  
        //Case for section/parent is in cart
        else{
  
        for(const subsection of Object.values(this.props.currentSection.subsections)) {
          if(this.props.cart!==undefined && this.props.cart.includes(subsection)){
          subsectionStatus = true;   
          }
        }
        //For alternate implementation 
        // //Either a section is in cart
        // if(subsectionStatus){
        // 	for(const subsection of Object.values(this.props.data.subsections)) {
        // 		if(this.props.cart.includes(subsection)){
        // 				subsections.push (
        // 				<Subsection key={subsection.number} getUnlockIcon = {() => this.getUnlockIcon()}  getLockIcon = {() => this.getLockIcon()} parent = {this.props.currentSection} cart = {this.props.cart} grandparent = {this.props.currentCourse} data={subsection} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
        // 			  )
        // 			}
        // 	  }
        // }
  
        // //Or all subsections aren't in cart
        // else{
        // 	for(const subsection of Object.values(this.props.data.subsections)) {
        // 		subsections.push (
        // 			<Subsection key={subsection.number}  getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} parent = {this.props.currentSection} grandparent = {this.props.currentCourse} cart = {this.props.cart} data={subsection} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
        // 			)
        // 	  }
        // }

        
        //Update case: be able to add all subsections
        for(const subsection of Object.values(this.props.currentSection.subsections)) {
          subsections.push (
            <Subsection key={subsection.number}  checkRequisites = {(c) => this.checkRequisites(c)}  getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} parent = {this.props.currentSection} grandparent = {this.props.currentCourse} cart = {this.props.cart} data={subsection} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
            )
          }
        }
  
       return subsections
      }
    getSections() {
      let sections = [];
  
      // let courseStatus = this.props.cart.includes(this.props.data);
      let sectionStatus = false;
      console.log(this.props.currentCourse);
      for(const section of Object.values(this.props.currentCourse.sections)) {
        if(this.props.cart!==undefined && this.props.cart.includes(section)){
          sectionStatus = true;
        }
      }
      let courseStatus = this.props.cart.includes(this.props.currentCourse)
  
      //Case: Search Mode -- see al sections
      if(!courseStatus){
        for(const section of Object.values(this.props.currentCourse.sections)) {
  
          sections.push (
            <Section key={section.number} checkRequisites = {(c) => this.checkRequisites(c)} parent = {this.props.currentCourse} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} searchMode = {this.props.searchMode} changeSearchMode = {(String, Course, Subsection) => this.props.changeSearchMode(String, Course, Subsection)} cartContains = {this.props.cartContains} cart = {this.props.cart} data={section} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
          )
        }
      }
      //Case: Cart Mode -- two subcases
      else{
      //Alternate Implementation
        //Subcase 1: See only the section that is in the cart
        // if(sectionStatus){
        //   for(const section of Object.values(this.props.data.sections)) {
        //     if(this.props.cart.includes(section)){
        //      // console.log("includes section")
        //         sections.push (
        //         <Section key={section.number} parent = {this.props.currentCourse} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} cartContains = {this.props.cartContains} cart = {this.props.cart} data={section} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
        //       )
        //     }
        //   }
        // }
        // //Subcase 2: See all sections
        // else{
        //   for(const section of Object.values(this.props.data.sections)) {
        //         sections.push (
        //         <Section key={section.number} parent = {this.props.currentCourse} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} cartContains = {this.props.cartContains} cart = {this.props.cart} data={section} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
        //       )
        //   }
        // }
        //Update Case: Be able to add multiple sections
        for(const section of Object.values(this.props.currentCourse.sections)) {
          sections.push (
          <Section key={section.number} checkRequisites = {(c) => this.checkRequisites(c)} parent = {this.props.currentCourse} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} searchMode = {this.props.searchMode} changeSearchMode = {(String, Course, Subsection) => this.props.changeSearchMode(String, Course, Subsection)} cartContains = {this.props.cartContains} cart = {this.props.cart} data={section} removeFromCart={(e) => this.props.removeFromCart(e)} addToCart={(e) => this.props.addToCart(e)}/>
        )
    }
  
      }
  
      //Case for out of cart
  
      return sections;
    }
    getCourses() {
      // console.log("getCourses called");
      var courses = [];

      if(this.props.cartMode===false){
       
        for(const course of Object.values(this.props.data)) {
          //Don't display courses in the cart
          // if(this.props.cart.includes(course)){
          //   continue;
          // }
          courses.push (
            <Course key={course.name} data={course} checkRequisites = {(c) => this.checkRequisites(c)} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} searchMode = {this.props.searchMode} changeSearchMode = {(String, Course, Subsection) => this.props.changeSearchMode(String, Course, Subsection)} cart ={this.props.cart} removeFromCart={(Course) => this.props.removeFromCart(Course)} addToCart={(course) => this.props.addToCart(course)}/>
          )
        }
      }
      else{

        for(const course of Object.values(this.props.data)) {

          //If the cart includes the course, render it to the cart
          if(this.props.cart.includes(course)){
         
            courses.push (
              <Course key={course.name} data={course} checkRequisites = {(c) => this.checkRequisites(c)} getUnlockIcon = {() => this.getUnlockIcon()} getLockIcon = {() => this.getLockIcon()} searchMode = {this.props.searchMode} changeSearchMode = {(String, Course, Subsection) => this.props.changeSearchMode(String, Course, Subsection)} cart ={this.props.cart} removeFromCart={(Course) => this.props.removeFromCart(Course)} addToCart={(Course) => this.props.addToCart(Course)}/>
            )

          }
        }
      }
      return courses;
    }
  // }
  getTimes() {
    let days = [];
    let hours = [];

    //Iterate through and parse days and hours from the time data
    for(const hour of Object.values(this.props.currentSection.time)) {
      hours.push(hour);
    }
    for(const day of Object.keys(this.props.currentSection.time)) {
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
    
  getRequisites(){
    let reqString = '';
    var reqs = this.props.currentCourse.requisites;

    for(var i = 0; i<reqs.length; i++){
      //combo = 1D
      let combo = reqs[i];

      //Use OR to separate an array by commas
      let classList = combo.toString().split(/[,]+/);
      for(var j = 0; j<classList.length; j++){
        reqString = reqString.concat(classList[j]);
        if(j!==classList.length-1){
          reqString = reqString.concat(" OR ");
        }
      }
      //End of a 1D array, AND with the next one
      if(i!==reqs.length-1 && reqs.length!==1){
        reqString = reqString.concat(" AND ");
      }

    }

    //Case for no prerequisites
    if (reqString.length===0){
      reqString = "None";
    }
  
    // console.log(reqString);
    return reqString;
  }

  //Function to check if a course is able to be taken, by checking prereqs
  checkRequisites(course){
    // console.log(this.props.completedCourses.data);
    var reqs = course.requisites;
    // console.log(reqs)
    //Won't iterate at all if no prereqs
    for(var i = 0; i<reqs.length; i++){
      var booleanOR = false;
      //combo = 1D
      let combo = reqs[i];

      //Use OR to separate an array by commas
      let classList = combo.toString().split(/[,]+/);
      for(var j = 0; j<classList.length; j++){
        if(this.props.completedCourses.data.includes(classList[j])){
          booleanOR = true;
          continue;
        }
        //At end, if all individual OR clauses are false, then the whole thing is false
        if(!booleanOR && j == classList.length-1){
          // console.log("returning false");
          return false;
        }
      }
    }
    return true;
  }
  getKeywords(){
    let keyString = '';
    var keywords = this.props.currentCourse.keywords;
    var keyList = keywords.toString().split(/[,]+/);
    for(var i = 0; i<keyList.length; i++){
      if(i===keyList.length-1){
        keyString = keyString.concat(keyList[i]);

      }
      else{
        keyString = keyString.concat(keyList[i] + ", ");

      }
    }
    return keyString;
  }
  getLockIcon(){
    return <svg width="1em" height="16px" viewBox="0 0 16 16" className="bi bi-lock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
</svg>
  }
  getUnlockIcon(){
    return <svg width="1em" height="16px" viewBox="0 0 16 16" className="bi bi-unlock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 0 0-.224.296 1.626 1.626 0 0 0-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 0 0 .436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 0 0 .224-.296 1.627 1.627 0 0 0 .138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 0 0-.255-.237A1.122 1.122 0 0 0 9.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
</svg>
  }
  backButton(){
        //Button to go back to Class Mode
        if(this.props.searchMode==="section")
            return <Button style = {{"float": "center", backgroundColor: "#6fa8dc", "textAlign": "center", fontSize: "16px", "fontFamily": "sans-serif"}} 
            onClick={() => this.props.changeSearchMode("course", null, null)}>Go Back</Button>;

        //Button to go back to Section Mode
        else if(this.props.searchMode==="subsection"){
            return <Button style = {{"float": "center", backgroundColor: "#6fa8dc", "textAlign": "center", fontSize: "16px", "fontFamily": "sans-serif"}} 
            onClick={() => this.props.changeSearchMode("section", this.props.currentCourse, null)}>Go Back</Button>;
        }

        //No Button
        else{
          return;
        }
    }

    //Get Head Message
  getHead(){

    var formattedMode = this.props.searchMode[0].toUpperCase()+this.props.searchMode.slice(1).toLowerCase();

    //Message for Empty Cart
    if(this.props.cart.length ===0  && this.props.cartMode){
      return <Card className = "shadow" style = {{"margin": "0 3vw 2vh", backgroundColor: "#f3f9ff"}}>
              <Card.Body>
              <h1 style = {{"textAlign": "center"}}><em>Empty Cart. <br></br>Visit the search tab to add classes to cart. </em></h1>
                
              </Card.Body>
          </Card>
    }
    else{return <Card className = "shadow" style = {{"margin": "0 3vw 2vh", backgroundColor: "#f3f9ff"}}>
                      <Card.Body>
                        {this.getHeadMessage()}
                      <h1 style = {{"textAlign": "center"}}><strong>{formattedMode} View {this.backButton()}</strong></h1>
                        
                      </Card.Body>
                </Card>}

    }
    
    getHeadMessage(){
 
            if(this.props.searchMode==="section"){ 
              return <div><h1>{this.props.currentCourse.number} | {this.props.currentCourse.name} | {this.props.currentCourse.credits} Credits</h1>
                          <h5><strong>Full Description: </strong>{this.props.currentCourse.description}</h5>
                          <h5><strong>Requisites: </strong>{this.getRequisites()}</h5>
                          <h5><em>Keywords: </em>{this.getKeywords()}</h5></div>


            }
            else if(this.props.searchMode==="subsection"){
              return <div><h1>{this.props.currentCourse.number} | {this.props.currentCourse.name} | {this.props.currentCourse.credits} Credits</h1>
                          <h5><strong>Full Description: </strong>{this.props.currentCourse.description}</h5>
                          <h5><strong>Requisites: </strong>{this.getRequisites()}</h5>
                          <h5><em>Keywords: </em>{this.getKeywords()}</h5>

                          <h2>{this.props.currentSection.number} | {this.props.currentSection.instructor}</h2>
                          <p>{this.props.currentSection.location}</p>
                          <h5>{this.getTimes()}</h5>
                      </div>
            }
            else if(!this.props.cartMode) return <h1 style = {{"textAlign": "center"}}><em>Find all the classes you need up here in the clouds.</em><br></br></h1>;
    }
  render() {
    return (
       <div style = {{paddingBottom: '2vh', marginLeft: '20vw'}}>
      {this.getHead()}    
        {this.displaySearchMode()}
      </div>
    
    )
  }
}

export default CourseArea;
