/* Author: 
	Guillaume Garcera
*/


 $(document).ready(function(){
   // Your code here
   agricola = new Agricola()

	window.appView = new BoardGameScoreCard({
		model: agricola,
	});
	window.appView.render();

 });
