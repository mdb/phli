if(!phli || typeof phli === 'undefined') {
  var phli = {};
}

phli.FormView = Backbone.View.extend({
  events: {
    'click a': 'search'
  },

  search: function(event) {
    event.preventDefault();

    var formData = this.$el.find('form').serialize();

    window.console.log(formData);
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