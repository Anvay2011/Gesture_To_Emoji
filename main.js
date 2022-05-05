prediction_1 = " ";
prediction_2 = " ";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality:90
});
camera =document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/B4HdhSWT4/model.json',modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}

function speak(){
    console.log("speaking");
    var synth = window.speechSynthesis;
    speak_data_1="The First Prediction is "+ prediction_1;
    speak_data_2="and The Second Prediction is "+ prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    console.log("checking");
    img= document.getElementById('captured_image');
    classifier.classify(img,gotResult);
    prediction_1 = " ";
    prediction_2 = " ";
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{

        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(results[0].label=="Rock"){
            document.getElementById("update_emoji").innerHTML="&#129304;";
        }
        if(results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="Good"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }

        if(results[1].label=="Rock"){
            document.getElementById("update_emoji2").innerHTML="&#129304;";
        }
        if(results[1].label=="Victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";
            console.log("&#128522");
        }
        if(results[1].label=="Good"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
    }
}