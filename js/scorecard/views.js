var ScoreBitView = Backbone.View.extend({
  template:  Handlebars.compile($("script[name=score-bit]").html()),
  tagName: "td",
  className: "grid_1",
  
  events: {
    "click .field-total":   "showEdit",
    "blur .field-edit":   "hideEdit",
    "change .field-edit input":   "updatePlayerScore",
  },
  
  initialize: function() {
		_.bindAll(this, "render", "showEdit", "hideEdit", "updatePlayerScore")
		this.model.bind('change', this.render)
  },
  
  showEdit: function(){
    this.$(".field-total").addClass("hidden")
    this.$(".field-edit").removeClass("hidden")
  },
  
  hideEdit: function(){
    this.$(".field-total").removeClass("hidden")
    this.$(".field-edit").addClass("hidden")
  },
  
  updatePlayerScore: function(){
    this.model.set({"count": this.$(".field-edit input").val()})
    this.model.process()
  },
  
  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
})

var PlayerScoreLineView = Backbone.View.extend({

	template: Handlebars.compile($("script[name=player]").html()),

  tagName: "tr",
  className: "player",
  
	events: {
    "click .delete": "deletePlayer", 
  }, 
   
	initialize: function() {
		_.bindAll(this, "render", "deletePlayer")
		this.model.bind('change', this.render)
  },
  
  deletePlayer: function(ev){
      this.remove();
      ev.stopPropagation()
      this.model.trigger("remove", this.model);
  },
  
  
  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    var content = []
    this.model.get("score").each(function(score){
      sv = new ScoreBitView({"model": score})
      content.push(sv.render().el)
    })
    this.$("#player-" + this.model.get("name") + "-score").replaceWith(content)
    return this
  }
	
})


var PlayersViews = Backbone.View.extend({
  
  el: "#score tbody",
  
  initialize: function() {
    _.bindAll(this, "render", "deletePlayer");
    this.model.bind('add', this.render)
    this.model.bind('remove', this.render)
    this.model.bind('remove', this.deletePlayer)
  },
  
  
  deletePlayer: function(player){
      this.model.remove(player)
  },
  
  render: function() {
    var content = [];
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