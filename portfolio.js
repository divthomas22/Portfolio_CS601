function validate(){
    var valfirst = firstName();
    var vallast = lastName();
    var valsubject = subject();
    var valfood = formFood(); // make sure at least one option is selected
    var valmethod = formMethod(); // make sure at least one option is selected

    // check if all validations passed
    if (valfirst && vallast && valsubject && valfood && valmethod){
        alert("All validations passed.");
        return true;
    } else {
        alert("Validations failure. Form not submitted."); // even if just one failed
    }
    return false; //stops the form submission
}

function firstName(){
    var firstName = document.getElementById("firstName").value;
    if (firstName.length < 2){
        alert("Sorry, minimum character length required for first name is 2.");
    }
    var regEx = /^[a-zA-Z]+$/;
    if (!firstName.match(regEx)){
        alert("Sorry, only alpha characters are allowed in first name.");
    } else {
        return true;
    }

    return false;
}

function lastName(){
    var lastName = document.getElementById("lastName").value;
    if (lastName.length < 2){
        alert("Sorry, minimum character length required for last name is 2.");
    }
    var regEx = /^[a-zA-Z]+$/;
    if (!lastName.match(regEx)){
        alert("Sorry, only alpha characters are allowed in last name.");
    } else {
        return true;
    }

    return false;
}

function subject(){
    var subject = document.getElementById("subject").value;
    if (subject.length < 1){
        alert("Sorry, minimum character length required for subject is 1.");
    }
    if (subject.length > 20){
        alert("Sorry, maximum character length allowed for subject is 20.");
    } else {
        return true;
    }

    return false;
}

function formFood(){
    var foods = document.getElementsByName("foodType");
    for (var i = 0; i < foods.length; i++){
        if (foods[i].checked){
            return true;
        }
    }
    alert("Please select at least one food preference.");
    return false;
}

function formMethod(){
    var methods = document.getElementsByName("method");
    for (var i = 0; i < methods.length; i++){
        if (methods[i].checked){
            return true;
        }
    }
    alert("Please select at least one communication preference.");
    return false;
}

//load coursework from json
function fetchJSON() {
    console.log("Fetching JSON...");

    //fetch json
    fetch("coursework.json")
    //returns promise using response class
    .then((response) => {
        if (!response.ok) //checks status of response (returns error if not okay (200))
            throw new Error(response.status + " (" + response.statusText + ")");
        else return response.text(); //if code 200 - return json data
     })
    .then((data) => {
        console.log(data); //for testing .. 
        processJSON(data); // sends data to be processed into the HTML
    })
    .catch((err) => console.log("JSON fetch failed! " + err));
}

//process coursework data
function processJSON(data) {
    console.log("Processing JSON...");
    let courseData = JSON.parse(data); 
    //get table that data will be entered into 
    let tbody = document.getElementById("courses"); 
    //loop through the degrees list 
    for (let i = 0; i < courseData.courses.length; i++) { 
        let course = courseData.courses[i];
        //create a tr element to hold the course data
        coursetr = document.createElement("tr");
        // determine how the data will be displayed 
        coursetr.innerHTML += "<td>" + course.semester + "</td>" + 
        "<td>" + course.code + "</td>" + 
        "<td>" + course.name + "</td>" + 
        "<td>" + course.grade + "</td>";

        //append the list element to the unordered list element as a child
        tbody.appendChild(coursetr);
    }

}