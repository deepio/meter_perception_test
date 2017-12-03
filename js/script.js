// [TODO] Divide code into more files ?

// INITIALIZE
var config = {
	apiKey: "AIzaSyB3DHDj-41nfcUUHY1bSI7h9eBF_1Mlbak",
	authDomain: "meter-perception-experiment.firebaseapp.com",
	databaseURL: "https://meter-perception-experiment.firebaseio.com",
	projectId: "meter-perception-experiment",
	storageBucket: "",
	messagingSenderId: "837214283382"
};
firebase.initializeApp(config);

// GRAB TITLE
// firebase.database.enableLogging(true);
var title = firebase.database().ref().child('text');
title.on( 'value', snap => document.getElementById( 'title' ).innerText = snap.val() );


var trial_start_time;
var audio_loaded_time;
var reaction_time;
var current_trial = 0;
var audio_playing = false;
var audio_tree = ['audio/1a.mp3', 'audio/1b.mp3', 'audio/2a.mp3', 'audio/2b.mp3', 'audio/3a.mp3', 'audio/3b.mp3', 'audio/4a.mp3', 'audio/4b.mp3', 'audio/5a.mp3', 'audio/5b.mp3', 'audio/6a.mp3', 'audio/6b.mp3', 'audio/7a.mp3', 'audio/7b.mp3', 'audio/8a.mp3', 'audio/8b.mp3', 'audio/9a.mp3', 'audio/9b.mp3', 'audio/10a.mp3', 'audio/10b.mp3', 'audio/11a.mp3', 'audio/11b.mp3', 'audio/12a.mp3', 'audio/12b.mp3'];
var random_file = RANDOMIZE_FILE_ORDER(audio_tree)[0];
var trial = {
	name: [],
	track_id: [],
	rhythm_table: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
}

function MAKE_A_SOUND(file)
{
	var audio = new Audio(file);
	audio.play();
	audio_loaded_time = Date.now();
	audio.addEventListener("ended", function()
	{
	     audio.currentTime = 0;
	     audio_playing = false;
			 current_trial ++;
			 if ( current_trial == audio_tree.length ) {document.getElementById('send').style.display="block";}
			 progress_bar = roundTo( ((current_trial/24) * 100), 2);
			 $('#p').attr('aria-valuenow', progress_bar ).css('width', progress_bar+'%').text(progress_bar +'%');
	});
}

function RANDOMIZE_FILE_ORDER(file_list)
{
	var output = [];
	for (i = 0; i < file_list.length; i++)
	{
		var a = Math.trunc( Math.random() * ((file_list.length) - 0) );
		output.push(a);
		for (j = 0; j < i; j++)
		{
			if ( output[i] == output[j] )
			{
				output.pop();
				i--;
			}
		}
	}
	return [output];
}

document.getElementById('a').addEventListener('click', () =>
{
	current_trial = current_trial + 10;
	console.log('yup.');
	progress_bar = roundTo( ((current_trial/24) * 100), 2);
	if ( current_trial >= '24' )
	{
		$('#p').attr('aria-valuenow', '100' ).css('width', '100%').text('Complete').addClass('progress-bar-success');
	}
	else
	{
		$('#p').attr('aria-valuenow', progress_bar ).css('width', progress_bar+'%').text(progress_bar +'%');
	}
});

document.getElementById('send').addEventListener('click', () =>
{
	trial.name.push( document.getElementById('name').value );
	var ref = firebase.database().ref('experiment_trials');
	ref.push(trial);
	window.location.reload();
});

document.addEventListener('keypress', function(LISTEN)
{
	if ( (LISTEN.keyCode == 13 || LISTEN.which == 13) && audio_playing === false )
	{
		audio_file = audio_tree[random_file[0]];
		console.log('Playing: ' + audio_file);

		MAKE_A_SOUND(audio_file);
		audio_playing = true;
		random_file.splice(0, 1);
		trial.track_id.push(' ' + audio_file);
	}
	else if ( (LISTEN.keyCode == 32 || LISTEN.which == 32) && audio_playing === true )
	{
		trial_start_time = Date.now();
		reaction_time = (trial_start_time - audio_loaded_time) / 1000;

		if ( current_trial == 0 )
		{
			trial.rhythm_table[0].push(' ' + reaction_time);
		}
		else if ( current_trial == 1 )
		{
			trial.rhythm_table[1].push(' ' + reaction_time);
		}
		else if ( current_trial == 2 )
		{
			trial.rhythm_table[2].push(' ' + reaction_time);
		}
		else if ( current_trial == 3 )
		{
			trial.rhythm_table[3].push(' ' + reaction_time);
		}
		else if ( current_trial == 4 )
		{
			trial.rhythm_table[4].push(' ' + reaction_time);
		}
		else if ( current_trial == 5 )
		{
			trial.rhythm_table[5].push(' ' + reaction_time);
		}
		else if ( current_trial == 6 )
		{
			trial.rhythm_table[6].push(' ' + reaction_time);
		}
		else if ( current_trial == 7 )
		{
			trial.rhythm_table[7].push(' ' + reaction_time);
		}
		else if ( current_trial == 8 )
		{
			trial.rhythm_table[8].push(' ' + reaction_time);
		}
		else if ( current_trial == 9 )
		{
			trial.rhythm_table[9].push(' ' + reaction_time);
		}
		else if ( current_trial == 10 )
		{
			trial.rhythm_table[10].push(' ' + reaction_time);
		}
		else if ( current_trial == 11 )
		{
			trial.rhythm_table[11].push(' ' + reaction_time);
		}
		else if ( current_trial == 12 )
		{
			trial.rhythm_table[12].push(' ' + reaction_time);
		}
		else if ( current_trial == 13 )
		{
			trial.rhythm_table[13].push(' ' + reaction_time);
		}
		else if ( current_trial == 14 )
		{
			trial.rhythm_table[14].push(' ' + reaction_time);
		}
		else if ( current_trial == 15 )
		{
			trial.rhythm_table[15].push(' ' + reaction_time);
		}
		else if ( current_trial == 16 )
		{
			trial.rhythm_table[16].push(' ' + reaction_time);
		}
		else if ( current_trial == 17 )
		{
			trial.rhythm_table[17].push(' ' + reaction_time);
		}
		else if ( current_trial == 18 )
		{
			trial.rhythm_table[18].push(' ' + reaction_time);
		}
		else if ( current_trial == 19 )
		{
			trial.rhythm_table[19].push(' ' + reaction_time);
		}
		else if ( current_trial == 20 )
		{
			trial.rhythm_table[20].push(' ' + reaction_time);
		}
		else if ( current_trial == 21 )
		{
			trial.rhythm_table[21].push(' ' + reaction_time);
		}
		else if ( current_trial == 22 )
		{
			trial.rhythm_table[22].push(' ' + reaction_time);
		}
		else if ( current_trial == 23 )
		{
			trial.rhythm_table[23].push(' ' + reaction_time);
		}
		else if ( current_trial == 24 )
		{
			trial.rhythm_table[24].push(' ' + reaction_time);
		}
		else {}
	}
	else {}
});

function roundTo(n, digits) {
     if (digits === undefined) {
       digits = 0;
     }

     var multiplicator = Math.pow(10, digits);
     n = parseFloat((n * multiplicator).toFixed(11));
     var test =(Math.round(n) / multiplicator);
     return +(test.toFixed(digits));
   }

// Hide button until experiment is over.
// document.getElementById('send').style.display="none";
