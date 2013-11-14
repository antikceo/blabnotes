function save() {
  var d = document.getElementById("labnol").innerHTML;
  filepicker.setKey('AeoWySYsRQWugIlof6Gegz');
  filepicker.store(d, function(a) {
    filepicker['export'](a, {extension: '.txt', services:['DROPBOX','GOOGLE_DRIVE','COMPUTER','SEND_EMAIL']}, function(a) {
    });
  });
}
                     
var working, speech;

if (typeof(webkitSpeechRecognition) !== 'function') {  
  document.getElementById("labnol").innerHTML = "We are sorry but Dictation requires the latest version of Google Chrome on your desktop.";
  document.getElementById("messages").style.display = "none";
} else {

  speech = new webkitSpeechRecognition();
  speech.continuous = true;
  speech.maxAlternatives = 5;
  speech.interimResults = true;

  speech.lang = window.navigator.userLanguage || window.navigator.language;
  speech.onend = reset;
 
  reset();
  
  speech.onerror = function (e) {
    var msg = e.error + " error"; 
    if ( e.error === 'no-speech' ) {
      msg = "No speech was detected. Please try again."; 
    } else if ( e.error === 'audio-capture' ) {
      msg = "Please ensure that a microphone is connected to your computer."; 
    } else if ( e.error === 'not-allowed' ) {
      msg = "The app cannot access your microphone. Please go to chrome://settings/contentExceptions#media-stream and allow Microphone access to this website."; 
    } 
    document.getElementById("warning").innerHTML = "<p>" + msg + "</p>"; 
    setTimeout(function() {
      document.getElementById("warning").innerHTML = ""; 
    }, 5000);
  };
  
  speech.onresult = function (e) {
    for (var i = e.resultIndex; i < e.results.length; ++i) {
      if (e.results[i].isFinal) {

        var words = document.getElementById("labnol"); 
        var val = e.results[i][0].transcript; 

        if (val === "\n\n") {
          val = ".<br><br>"; 
        } else if (val === " new sentence") {
          val = ". ";
        } else if (val === " stop listening") {
          val = ". "; action();
        } 
        
        if (words.innerHTML.substr(-2) === ". ") {
          val = val.substr(1,1).toUpperCase() + val.substr(2);          
        }        

        if (words.innerHTML.length === 0) {
          val = val.substr(0,1).toUpperCase() + val.substr(1);          
        }        
        
        document.getElementById("notfinal").innerHTML = ""; 
        words.innerHTML += val;        
      } else {        
        document.getElementById("notfinal").innerHTML = e.results[i][0].transcript;
      }
    }
  };
  
  if (typeof(localStorage) !== 'undefined' ) {
    if ( localStorage.narration === 'undefined' ) {
      localStorage.narration = ""; 
    }
    
    document.getElementById("labnol").innerHTML = localStorage.narration;
  
    setInterval (function () {
      var text = document.getElementById("labnol").innerHTML;  
      if (text !== localStorage.narration) {
        localStorage.narration = text;        
      }
    }, 5000);       
  }  
}
  
function clearSlate() { 
  if (working) {
    speech.stop();
  } 
  document.getElementById("labnol").innerHTML = "";
  reset();
}

function reset() {
  working = false; 
  document.getElementById("status").style.display="none"; 
  document.getElementById("btn").innerHTML = "Start Dictation";  
}

function action() {
  if (working) {
    speech.stop(); 
    reset(); 
  } else {
    speech.start(); 
    working = true; 
    document.getElementById("btn").innerHTML = "Stop Listening"; 
  } 
}

    function toggleVisibility(selectedTab) {
         var content = document.getElementsByClassName('info');
         for(var i=0; i<content.length; i++) {
              if(content[i].id == selectedTab) {
                    content[i].style.display = 'block';
              } else {
                    content[i].style.display = 'none';
              }
         }
    }
