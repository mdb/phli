if(!phli || typeof phli === 'undefined') {
  var phli = {};
}

phli.FormView = Backbone.View.extend({
  events: {
    'click a': 'search'
  },

  search: function(event) {
    event.preventDefault();

    var data = Backbone.Syphon.serialize(this);

    window.console.log(data);
  }
});

phli.FormRouter = Backbone.Router.extend({
  initialize: function() {
    this.createViews();
  },

  createViews: function() {
    this.formView = new phli.FormView({el: '#form-view'});
  }
});

$(document).ready(function(){
  phli.router = new phli.FormRouter();
});