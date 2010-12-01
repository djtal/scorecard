/* Author: 
	Guillaume Garcera
*/


 $(document).ready(function(){
   // Your code here
   agricola = new BoardGame({"name" : "agricola"})

	window.appView = new BoardGameScoreCard({
		model: agricola,
	});
	window.appView.render();

 });























