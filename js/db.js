
// GRAB TITLE
var title = firebase.database().ref().child('text');
title.on( 'value', snap => document.getElementById( 'title' ).innerText = snap.val() );

// GRAB EXPERIMENT DATA & ERRORS
var ref = firebase.database().ref('experiment_trials');
ref.on( 'value', gotData, errData );

function gotData(data)
{
	var d = data.val();        					// GRAB DATA OBJECTS
	var keys = Object.keys(d); 					// Array of the keys in the database
	for (var i = 0; i < keys.length; i++ )
	{
		var k = keys[i];
		var track_order = d[k].track_id;
		var table = d[k].rhythm_table;
		for (var j = 0; j < track_order.length; j++)
		{
			var li = createElement('li', track_order[j] + '<br>' + table[j]);
			li.parent('scorelist');
		}
	}
}

function errData(err)
{
	console.log('Error!');
	console.log(err);
}
