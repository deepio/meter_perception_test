var clicked_time;
var created_time;
var loaded_time;
var reaction_time;
var difference_time;
var audio_file = 'audio/1.mp3';
var audio_tree = ['audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3'];
var audio_playing = false;
var random_file = RANDOMIZE_FILE_ORDER(audio_tree)[0];
var obj =
{
	table: []
};
document.getElementById('send').style.display="none";

function MAKE_A_SOUND(file)
{
	var audio = new Audio(file);
	audio.play();
	loaded_time = Date.now();
	audio.addEventListener("ended", function()
	{
	     audio.currentTime = 0;
	     audio_playing = false;
			 document.getElementById('send').style.display="block";
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
		obj.table.push(audio_file);
	}
	else if ( (LISTEN.keyCode == 32 || LISTEN.which == 32) && audio_playing === true )
	{
		clicked_time = Date.now();
		reaction_time = (clicked_time - loaded_time) / 1000;
		obj.table.push(' ' + reaction_time);
		for (const prop in obj)
		{
			document.getElementById('print_all_times').innerHTML = `obj.${prop} = ${obj[prop]}`;
			// document.getElementById('print_latest_time').innerHTML = difference_time;
		}
	}
	else {}
});
