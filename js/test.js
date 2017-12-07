////////////////////////
// INITIALIZE FIREBASE
////////////////////////
var config = {
	apiKey: "AIzaSyB3DHDj-41nfcUUHY1bSI7h9eBF_1Mlbak",
	authDomain: "meter-perception-experiment.firebaseapp.com",
	databaseURL: "https://meter-perception-experiment.firebaseio.com",
	projectId: "meter-perception-experiment",
	storageBucket: "",
	messagingSenderId: "837214283382"
};
firebase.initializeApp(config);

// Grab Title
var title = firebase.database().ref().child('text');
title.on( 'value', snap => document.getElementById( 'title' ).innerText = snap.val() );


////////////////////////
// SET EXPERIMENT GLOBAL VARIABLES
////////////////////////
var trial_start_time;
var audio_loaded_time;
var reaction_time;
var current_trial = 0;
var audio_playing = false;
var audio_tree = ['audio/test/1a.mp3', 'audio/test/1b.mp3', 'audio/test/2a.mp3', 'audio/test/2b.mp3'];


////////////////////////
// FUNCTIONS
////////////////////////
function ROUND_TO(n, digits)
{
     if (digits === undefined)
		 {
       digits = 0;
     }
     var multiplicator = Math.pow(10, digits);
     n = parseFloat((n * multiplicator).toFixed(11));
     var test =(Math.round(n) / multiplicator);
     return +(test.toFixed(digits));
   }

function MAKE_A_SOUND(file)
{
	var audio = new Audio(file);
	audio.play();
	audio_loaded_time = Date.now();
	document.getElementById('audio_status').style.display="block";
	document.getElementById('keyboard_img').style.display="block";
	audio.addEventListener("ended", function()
	{
	     audio.currentTime = 0;
	     audio_playing = false;
			 current_trial ++;
			 document.getElementById('audio_status').style.display="none";
			 document.getElementById('keyboard_img').style.display="none";
			 progress_bar = ROUND_TO( ((current_trial/4) * 100), 2);
			 PROGRESS_BAR_STATUS_CHECK(current_trial, progress_bar);
	});
}

function PROGRESS_BAR_STATUS_CHECK(current_trial, progress_bar)
{
	if ( current_trial >= '4' )
	{
		$('#p').attr('aria-valuenow', '100' ).css('width', '100%').text('Complete. Move on to the experiment.').addClass('progress-bar-success');
		$('#skip').addClass('btn-success').removeClass('btn-primary');
		$('#audio_status').addClass('btn-success').removeClass('btn-primary');
	}
	else
	{
		$('#p').attr('aria-valuenow', progress_bar ).css('width', progress_bar+'%').text(progress_bar +'%');
	}
}

////////////////////////
// SET LISTENERS
////////////////////////
document.addEventListener('keypress', function(LISTEN)
{
	if ( (LISTEN.keyCode == 13 || LISTEN.which == 13) && audio_playing === false )
	{
		audio_file = audio_tree[0];
		console.log('Playing: ' + audio_file);

		MAKE_A_SOUND(audio_file);
		audio_playing = true;
		audio_tree.splice(0, 1);
	}
	else if ( (LISTEN.keyCode == 32 || LISTEN.which == 32) && audio_playing === true )
	{
		trial_start_time = Date.now();
		reaction_time = (trial_start_time - audio_loaded_time) / 1000;
	}
	else {}
});

document.getElementById('audio_status').style.display="none";
document.getElementById('keyboard_img').style.display="none";
document.getElementById('skip').addEventListener('click', () =>
{
	window.location.href = "./experiment.html";
});
