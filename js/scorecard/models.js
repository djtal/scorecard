var Player = Backbone.Model.extend({
	defaults: {
		"Fields": 0,
		"Pastures" : 0,
		"Grain" : 0,
		"Vegetables" : 0,
		"Sheep" : 0,
		"Boar" : 0,
		"Cattle" : 0,
		"Unused Spaces" : 25,
		"Fenced Stables" : 0,
		"Clay Rooms" : 0,
		"Stone Rooms" : 0,
		"Family Members" : 2,
		"Cards" : 0,
		"Bonus/Begging" : 0,
  }

})

var PlayersList = Backbone.Collection.extend({
  model: Player
});

var BoardGame = Backbone.Model.extend({
	
	initialize: function() {
	 this.set({"players": new PlayersList})
	},

	addPlayer: function(_player) {
		this.get("players").add(_player)
	}
});

