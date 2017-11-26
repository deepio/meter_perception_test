var clicked_time;
var created_time;
var loaded_time;
var reaction_time;
var difference_time;
var audio_file = 'audio/1.mp3';
var audio_playing = false;
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

//

document.addEventListener('keypress', function(LISTEN)
{
	if ( (LISTEN.keyCode == 13 || LISTEN.which == 13) && audio_playing === false )
	{
		MAKE_A_SOUND(audio_file);
		audio_playing = true;
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
