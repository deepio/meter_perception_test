function setup()
{

	// GRAB TITLE
	var title = firebase.database().ref().child('text');
	title.on( 'value', snap => document.getElementById( 'title' ).innerText = snap.val() );

}

function draw()
{
}

// function move() {
//     var elem = document.getElementById("myBar");
//     var width = 1;
//     var id = setInterval(frame, 10);
//     function frame() {
//         if (width >= 100) {
//             clearInterval(id);
//         } else {
//             width++;
//             elem.style.width = width + '%';
//         }
//     }
// }
