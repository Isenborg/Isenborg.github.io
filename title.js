var correct = ['M','A','R','C','U','S','I','S','E','N','B','O','R','G']
var correctTitle = "MARCUS ISENBORG"
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var isHovering = false
var intervalID

function randomChar(){
    var i = Math.floor(Math.random() * ALPHABET.length)
    return ALPHABET[i]
}

function createRandomString(length){
    var string = "";
    for (let index = 0; index < length; index++) {
        if(correctTitle[index] == ' '){
            string += ' ';
        }
        else{
            string += randomChar()
        }
    }
    return string
}

function correctString(){ 
    var new_string = ""
    for (let index = 0; index < titleString.length; index++) {
        if(titleString[index] != correctTitle[index]){
            if(titleString[index] != ' '){
                new_string += randomChar()
            }
            else{
                new_string += ' '
            }
        }
        
        else {
            new_string += titleString[index]
        } 
    }
    console.log(new_string)
    titleString = new_string
    if(titleString == correctTitle){
        clearInterval(intervalID)
    }
}

function correctTheTitle(){
    var tryOdds = 1
    var correctOdds = 0.1
    titleString = titleElement.textContent
    var new_string = ""
    for (let index = 0; index < titleString.length; index++) {
        if(Math.random() < tryOdds){
            if (Math.random() < correctOdds){
                new_string += correctTitle[index]
            }
            else if(titleString[index] != correctTitle[index]){
                new_string += randomChar()
            }
            else{
                new_string += correctTitle[index]
            }
        }
        else{
            new_string += titleString[index]
        }
    }
    console.log(new_string)
    titleElement.textContent = new_string
    if(new_string == correctTitle){
        clearInterval(intervalID)
    }
}

function modifyTitle(){
    var odds = 0.1;
    string = titleElement.textContent
    new_string = ""
    console.log("hello")
    for (let index = 0; index < string.length; index++) {
        if(string[index] == ' '){
            new_string += ' '
        }
        else{
            if(Math.random() < odds){
                new_string += randomChar()
            }
            else{
                new_string += string[index]
            }
        }
    }
    titleElement.textContent = new_string
}


function onHover(){
    clearInterval(intervalID)
    intervalID = setInterval(modifyTitle, 50)
}

function onHoverOut(){
    clearInterval(intervalID)
    intervalID = setInterval(correctTheTitle, 50)
}

var titleString = createRandomString(correctTitle.length) 
document.addEventListener("DOMContentLoaded", function() {
    // Select the h1 element
    window.titleElement = document.getElementById("title");
    titleElement.addEventListener('mouseover', onHover)
    titleElement.addEventListener('mouseout', onHoverOut)

    titleElement.textContent = titleString
    intervalID = setInterval(correctTheTitle, 50)
  });






    


