var PlayerScoreLine = Backbone.View.extend({

	className: "player",
	 
	initialize: function() {
		_.bindAll(this, "render");
		this.model.bind('change', this.render);
  },
	
})


var PlayerNewView = Backbone.View.extend({


}



var BoardGameScoreCard = Backbone.View.extend({

  el: $("#main"),
  
  className: "boardgame",
  
  template: Handlebars.compile("<h1>{{name}}</h1><div>hey this is a simple for the moment.<br /> Just learn the whole thing</div>"),

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.model.bind('change', this.render)
    this.newPlayerView = new PlayerNewView()
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    $(this.el).append(this.newPlayerView.render().el)
  }
  


});
