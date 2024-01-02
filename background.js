function changeBackgroundText() {
    var current = document.getElementById("background-text").getAttribute("data-text")
    var new_text = modifyString(current, 100)
    document.getElementById("background-text").setAttribute("data-text", new_text); 
}

function modifyString(str, numChanges) {
    for (let index = 0; index < numChanges; index++) {
        str[Math.floor(Math.random() * str.length)] = getRandomChar()
    }
    return str;
}

function getRandomChar() {
    chars = "abcdefghijklmnopqrstuvw/ "
    var charcode = Math.floor(Math.random() * chars.length);
    return chars[charcode]
}



window.onload = function() {
    var numChars = 10000
    start_text = ""
    for (var i = 0; i < numChars; i++) {
        start_text = start_text + getRandomChar();
    }
    console.log(start_text)
    document.getElementById("background-text").setAttribute("data-text", start_text); 
}
setInterval(changeBackgroundText, 1000);