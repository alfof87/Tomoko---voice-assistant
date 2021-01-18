//funzione per riconoscimento della voce
function addEventListener(){
  var btn = $('#btn');
  // var result = $('#result');
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();


  btn.click(send);

  function send(){
    recognition.start();
    console.log("Clicca 'Consenti' e parla");
//funzione per la gestione degli eventi
    recognition.onresult = function(event){
      // console.log(event);

      var text = event.results[0][0].transcript;
      console.log(text);


      // document.getElementById('result').innerHTML = text;
      read(text);
    }
  }
  function read(text){
    var speech = new SpeechSynthesisUtterance();
    speech.text = text;



    var time = moment().format('h:mm');
    var date = moment().format('dddd D MMMM YYYY');



    if (text == 'Che ore sono') {
      speech.text = 'sono le' + time;
    }
    else if (text == 'Apri Google') {
      speech.text = 'subito';
      window.open("http://www.google.com/");
    }
    else if (text == 'Apri Facebook') {
      speech.text = 'subito';
      window.open("https://www.facebook.com/");
    }
    else if (text == 'Raccontami una barzelletta') {
      speech.text = 'Un uomo entra in un caffe. Ma nota che manca l’accento, così con un pennarello gigante aggiunge l’accento mancante. E se ne va… Caffè corretto.';
    }
    else if (text == 'chi sei') {
      speech.text = 'sono Tomòco, il tuo assistente personale';
    }
    else if (text == 'Che giorno è oggi') {
      speech.text = date;
    }
    else if (text == 'Come stai') {
      speech.text = 'bene, grazie';
    }
    else if (text == 'Buongiorno') {
      speech.text = 'salve';
    }
    else if (text == 'ciao' || 'ciao tomoko') {
      speech.text = 'salve';
    }

    window.speechSynthesis.speak(speech);
  }

}

function getMeteo(){
  var query = $("#result").val();
  var apiKey = "20a3c0a3f2c9eaac2135061bbb41199b";

  var btnMeteo = $('#btnMeteo');
  // var city = "Rome";
  btnMeteo.click(function(){
    var city = $("#input").val();
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&appid=20a3c0a3f2c9eaac2135061bbb41199b",
      method: "GET",
      data: {
        api_key: "20a3c0a3f2c9eaac2135061bbb41199b",
        query: query
      },
      success: function(data){
        console.log("OK");
        var results = data["weather"][0]["description"];
        var temp = data["main"]["temp"] + "°C";
        var name = data["name"];
        console.log(name, temp, results);
        $("#result").empty();
        $("#result").append(name, ", ", temp, ", ", results);
      },
      error: function(){
        console.log("ERROR");
      }
    });
  })

}




function init(){
addEventListener();
getMeteo();
}
$(document).ready(init);
