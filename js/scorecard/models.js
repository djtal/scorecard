var Player = Backbone.Model.extend({

})

var PlayersList = Backbone.Collection.extend({
  model: Player
});

var Agricola = Backbone.Model.extend({

  defaults: {
    "name": "Agricola",
    "fields": [
    		{"name": "Fields", "default": 0},
        {"name": "Pastures", "default": 0}, 
        {"name": "Grain", "default": 0},
        {"name":"Vegetables", "default": 0},
        {"name":"Sheep", "default": 0},
        {"name":"Boar", "default": 0},
        {"name":"Cattle", "default": 0},
        {"name":"Unused Spaces", "default": 25},
        {"name":"Fenced Stables", "default": 0},
        {"name":"Clay Rooms", "default": 0},
        {"name":"Stone Rooms", "default": 0},
        {"name":"Family Members", "default": 2},
        {"name":"Cards", "default": 0},
        {"name":"Bonus/Begging", "default": 0}
    ],
  },

	initialize: function() {
	 this.set({"players": new PlayersList})
	},

	addPlayer: function(_name) {
    attrs = _.reduce(this.get("fields"), function(list, field){
      list.push({"name": field["name"], "value": field["default"]})
      return list
    }, [])
		this.get("players").add(new Player({"name": _name, "fields": attrs}))
	}
});