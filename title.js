var correct = ['M','A','R','C','U','S','I','S','E','N','B','O','R','G']
var correctTitle = "MARCUS ISENBORG"
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "

function randomChar(){
    var i = Math.floor(Math.random() * ALPHABET.length)
    return ALPHABET[i]
}

function createRandomString(length){
    var string = "";
    for (let index = 0; index < length; index++) {
        string += randomChar()
    }
    return string
}

function correctString(timer){ 
    var new_string = ""
    for (let index = 0; index < titleString.length; index++) {
        if(titleString[index] != correctTitle[index]){
            new_string += randomChar()
        }
        else {
            new_string += titleString[index]
        } 
    }
    console.log(new_string)
    titleString = new_string
    if(titleString == correctTitle){
        clearInterval(timer)
    }
}

function correctTheTitle(){
    correctString()
    titleElement.textContent = titleString
}
var titleString = createRandomString(correctTitle.length) 
document.addEventListener("DOMContentLoaded", function() {
    // Select the h1 element
    window.titleElement = document.getElementById("title");
    titleElement.textContent = titleString
    window.timer = setInterval(correctTheTitle, 50)
  });





    


