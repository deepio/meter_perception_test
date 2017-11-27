var trial_start_time;
var audio_loaded_time;
var reaction_time;
var current_trial = 0;
var audio_tree = ['audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3'];
var audio_playing = false;
var random_file = RANDOMIZE_FILE_ORDER(audio_tree)[0];
var trial = { rhythm_table: [] };

document.getElementById('send').style.display="none";

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

document.addEventListener('keypress', function(LISTEN)
{
	if ( (LISTEN.keyCode == 13 || LISTEN.which == 13) && audio_playing === false )
	{
		audio_file = audio_tree[random_file[0]];
		console.log('Playing: ' + audio_file);

		MAKE_A_SOUND(audio_file);
		audio_playing = true;
		random_file.splice(0, 1);
		trial.rhythm_table.push(audio_file);
	}
	else if ( (LISTEN.keyCode == 32 || LISTEN.which == 32) && audio_playing === true )
	{
		trial_start_time = Date.now();
		reaction_time = (trial_start_time - audio_loaded_time) / 1000;
		trial.rhythm_table.push(' ' + reaction_time);
		for (var prop in trial)
		{
			document.getElementById('print_all_times').innerHTML = `trial.${prop} = ${trial[prop]}`;
		}
	}
	else {}
});
