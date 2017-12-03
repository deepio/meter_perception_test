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
		var trial_key = keys[i];
		var track_order = d[trial_key].track_id;
		var table = d[trial_key].rhythm_table;

		console.log(trial_key);
		console.log(track_order);
		console.log(table);

		
		// for (var j = 0; j < track_order.length; j++)
		// {
		// 	console.log("test");
		// }
	}
}

function errData(err)
{
	console.log('Error!');
	console.log(err);
}




// var li = createElement('li', track_order[j] + '<br>' + table[j]);
// var li = createElement('li', table[j]);
// li.parent('messages');
