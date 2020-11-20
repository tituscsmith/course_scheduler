class SearchAndFilter {
   
    searchAndFilter(courses, search, interestArea, subject, minimumCredits, maximumCredits, favoriteMode, favorites) {
      console.log("FavoriteMode: " + favoriteMode);
      let filteredCourses = [];
        for(const course of courses) {
          //Filter course by credits and subject
          if((interestArea==="All" || course.keywords.includes(interestArea)) && (subject==="All" || course.subject===subject) && (minimumCredits === "" || course.credits >= minimumCredits) && (maximumCredits === "" || course.credits <= maximumCredits)){
            //Iterate through courses and check if they contain a specific keyword
            if(this.courseMatch(course, search, interestArea)){
              if(!favoriteMode || (favoriteMode && favorites.includes(course))){
                console.log("if");
                filteredCourses.push(course);
              }
            }
          }
      }

      
        return filteredCourses;

    }

    //Function to check if a chourse contains a specific keyword
    courseMatch(course, search, interestArea){

      for(var i =0; i<course.keywords.length; i++){
        if(course.keywords[i].includes(search)){
          
          return true;
        }

      }

    }


}

export default SearchAndFilter;
