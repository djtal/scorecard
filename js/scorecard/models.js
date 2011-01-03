
var ScoreRateBit = Backbone.Model.extend({
  defaults: {
    "name": "",
    "count": 0,
    "rate": 1,
    "total": 0
  },
  
  process: function(){
    this.set({"total": this.get("rate") * this.get("count")});
  
  },
})

var ScoreRangeBit = Backbone.Model.extend({
  defaults: {
    "name": "",
    "count": 0,
    "total": 0
  },
  
  process: function(){
  
  
  },
  
  
})

var Player = Backbone.Model.extend({

  initialize: function() {
    score = new Backbone.Collection();
    _.each(this.get("fields"), function(attr){
        if (attr["type"] == "rate")
          score.add(new ScoreRateBit(attr))
        if (attr["type"] == "range")
          score.add(new ScoreRangeBit(attr))
    }, this)
    this.set({"score": score})
    score.bind("change", this.processTotal, this)
  },
  
  processTotal: function(){
    this.get("score").inject(0, function(attr){
    
    })
  
  }

})

var PlayersList = Backbone.Collection.extend({
  model: Player
});

var Agricola = Backbone.Model.extend({

  defaults: {
    "name": "Agricola",
    "fields": [
    		{"name": "Fields", "default": 0, "type": "rate"},
        {"name": "Pastures", "default": 0, "rate": 1, "type": "rate"}, 
        {"name": "Grain", "default": 0, "type": "range"},
        {"name":"Vegetables", "default": 0, "type": "range"},
        {"name":"Sheep", "default": 0, "type": "range"},
        {"name":"Boar", "default": 0, "type": "range"},
        {"name":"Cattle", "default": 0, "type": "range"},
        {"name":"Unused Spaces", "default": 25, "rate": -1, "type": "rate"},
        {"name":"Fenced Stables", "default": 0, "rate": 1, "type": "rate"},
        {"name":"Clay Rooms", "default": 0, "rate": 1, "type": "rate"},
        {"name":"Stone Rooms", "default": 0, "rate": 2, "type": "rate"},
        {"name":"Family Members", "default": 2, "rate": 3, "max": 5, "type": "rate"},
        {"name":"Cards", "default": 0, "type": "rate", "rate": 1},
        {"name":"Bonus/Begging", "default": 0, "type": "rate", "rate": 1}
    ],
  },

	initialize: function() {  
    players = new PlayersList()
    this.set({"players": players})
	},

	addPlayer: function(_name) {
		this.get("players").add(new Player({"name": _name, "fields": this.get("fields")}))
	}
});