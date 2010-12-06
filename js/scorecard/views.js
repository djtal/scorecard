var PlayerScoreLineView = Backbone.View.extend({

	template: Handlebars.compile($("script[name=player]").html()),

  tagName: "tr",
  className: "player",
	 
	initialize: function() {
		_.bindAll(this, "render");
		this.model.bind('change', this.render);
  },
  
  
  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    return this
  }
	
})


var PlayersViews = Backbone.View.extend({
  
  el: "#score tbody",
  
  
  events: {
    "click .delete": "deletePlayer", 
  },
  
  initialize: function() {
    _.bindAll(this, "render");
    this.model.bind('add', this.render)
    this.model.bind('remove', this.render)
  },
  
  
  deletePlayer: function(ev){
      alert(ev.relatedTarget)
  },
  

  render: function() {
    content = [];
    this.model.each(function(p){
    pv = new PlayerScoreLineView({"model" : p})
      content.push( pv.render().el);
    }, this)
    $(this.el).html(content)
  },
  
})


var BoardGameScoreCard = Backbone.View.extend({

  el: "#main",
  
  className: "boardgame",
  
  template: Handlebars.compile($("script[name=appView]").html()),

  events: {
    "click #newPlayer":     "addPlayer",
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.model.bind('change', this.render)
  },
  
  addPlayer: function(event){
    this.model.addPlayer($("#newPlayerName").val())
    $("#newPlayerName").val("")
    event.preventDefault()
    event.stopPropagation()
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.playersView = new PlayersViews({model: this.model.get("players")})
    this.playersView.render()
    return this
  }
  
});