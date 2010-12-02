var PlayerScoreLineView = Backbone.View.extend({

    template: Handlebars.compile($("script[name=player]").html()),

  
  
  className: "player",
     
    initialize: function() {
        _.bindAll(this, "render");
        this.model.bind('change', this.render);
  },
    
})


var PlayerNewView = Backbone.View.extend({
  
  template: Handlebars.compile($("script[name=playerNew]").html()),

  render: function() {
    $(this.el).html(this.template());
    return this
  },
  
})

var PlayersViews = Backbone.View.extend({
  
  template: Handlebars.compile($("script[name=players]").html()),
  
  partials: {
    "player": $("script[name=player]").html(),
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON(), {"partials": this.partials}));
    return this
  },
  
})


var BoardGameScoreCard = Backbone.View.extend({

  el: $("#main"),
  
  className: "boardgame",
  
  template: Handlebars.compile($("script[name=appView]").html()),

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.model.bind('change', this.render)
    this.newPlayerView = new PlayerNewView()
    this.playersView = new PlayersViews({model: this.model})
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    $(this.el).append(this.newPlayerView.render().el)
    $(this.el).append(this.playersView.render().el)

    return this
  }
});
