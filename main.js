//window.webkitSpeechRecognition is an API which will convert speech to text
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start(){
    document.getElementById("textbox").innerHTML = "";
    //start() is pre-defined function of the web speech API which will convert text to speech
    recognition.start();
}

// The onresult function holds all the values of speech converted to text.

recognition.onresult = function(event){
    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textbox").innerHTML = content;
    if(content=="take my selfie"){
        console.log("taking selfie")
        speak();
    }
}

function speak(){
    //window.speechSynthesis is an API which is used to convert text to speech
    var synth = window.speechSynthesis;
    // speech_data contains the text which is taken from the textarea
    speech_data = "Taking Photo in 5 seconds";

    //SpeechSynthesisUtterance function of the API which converts text to speech
    //a new keyword because, for every next text, we want to convert that text to speech
    var say_this = new SpeechSynthesisUtterance(speech_data);
    synth.speak(say_this);
    Webcam.attach(camera);
//setTimeout(function,delay)//it is used to call the function after a delay

    setTimeout(function(){
        take_snapshot();
        save();
    }, 7000)
    
}
//JSON-Javascript object notation
//JSON{key:value,key:value,key:value}
//-Webcam.set is a function of webcam.js to see the properties for the live view of the webcam.
//it accepts data in JSON format
Webcam.set({
    width:360,
    height: 250,
    image_format: 'png',
    png_quality:100
})

camera = document.getElementById("camera");

//Webcam.snap() is a predefined function of webcam.js which is used to take a selfie,
//this function contains data_uri that can be used to show preview of the image which generates after taking a snapshot.
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+ data_uri +'">';
        console.log("displaying selfie");
    })
}

//The src holds the image link in img tag. So src is the important part of img tag
//the href holds the link of the anchor tag
//we get the src of the image tag and update it to the href of the anchor tag
//We are taking src from the img tag, because the src has the image link in it,
//and we want the image link so that we can download that image.
//The purpose of writing a code for automatically clicking the anchor tag is we want
//the image should get downloaded automatically, and we don’t have to click any
//button.

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click()
}
