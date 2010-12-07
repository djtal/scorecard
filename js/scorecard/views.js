var PlayerScoreLineView = Backbone.View.extend({

	template: Handlebars.compile($("script[name=player]").html()),

  tagName: "tr",
  className: "player",
  
	events: {
    "click .delete": "deletePlayer", 
    "click .field-value":   "editScoreField",
    "leave .field-edit":   "toggleFieldEdit",
  }, 
   
	initialize: function() {
		_.bindAll(this, "render", "editScoreField", "deletePlayer", "toggleFieldEdit" )
		this.model.bind('change', this.render)
  },
  
  deletePlayer: function(ev){
      this.remove();
      ev.stopPropagation()
      this.model.trigger("remove", this.model);
  },
  
  editScoreField: function(ev){
    $(ev.currentTarget).addClass("hidden")
    $(_.without(this.valueFields, ev.currentTarget)).removeClass("hidden")
    input = _.first($(ev.currentTarget).next(".field-edit"))
    $(input).removeClass("hidden")
    $(_.without(this.editFields, input)).addClass("hidden")
   
  },
  
  toggleFieldEdit: function(ev){
    $(ev.currentTarget).prev(".field-value").toggleClass("hidden")
    $(ev.currentTarget).toggleClass("hidden")
  },
  
  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    this.editFields = this.$(".field-edit")
    this.valueFields = this.$(".field-value")
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