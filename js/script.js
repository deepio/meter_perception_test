var clicked_time; var created_time; var loaded_time; var reaction_time; var difference_time;
var obj =
{
	table: []
};

function MAKE_A_SOUND()
{
	var audio = new Audio('audio/1.mp3');
	created_time = Date.now();
	audio.play();
	loaded_time = Date.now();
}

//

document.addEventListener('keypress', function(LISTEN)
{
	if (LISTEN.keyCode == 32 || LISTEN.which == 32)
	{
		clicked_time = Date.now();
		reaction_time = (clicked_time - loaded_time) / 1000;
		difference_time = (clicked_time - created_time) / 1000;
		obj.table.push(reaction_time);
		for (const prop in obj)
		{
			document.getElementById('print_all_times').innerHTML = `obj.${prop} = ${obj[prop]}`;
			document.getElementById('print_latest_time').innerHTML = difference_time;
		}
	}
	else if (LISTEN.keyCode == 13 || LISTEN.which == 13)
	{
		MAKE_A_SOUND();
	}
	else {}
});
