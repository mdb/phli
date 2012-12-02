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

if (window.location.search) {
  $('.loading').show();

  $.getJSON('/api'+window.location.search+'&preview=1', null, function(data) {
    var i, j, header, item, itemRow, value;
    $('.count').text(data.d.__count + ' results');

    // TODO API should provide data.headers and data.items
    data.headers = ['id', 'work_description', 'permit_type_code', 'permit_type_name'];
    data.items = [
      ['123', 'ROUGHIN FOR NEW KITCHEN,BATH,HALF', 'EZPLUM', 'PLU-EZ PLUMBING'],
      ['456', 'MOAR ROUGHIN FOR NEW KITCHEN,BATH,HALF', 'EZPLUM', 'PLU-EZ PLUMBING'],
      ['239', 'ROUGHIN FOR NEW PONY', 'EZPZ', 'PLUS-EZ PLUMBING'],
      ['2394', 'SUPER ROUGHIN FOR NEW HALF', 'EZPIE', 'PLU-EZ APLOMBING']
    ];

    for (i=0; i<data.headers.length; i++) {
      header = data.headers[i];
      $('.preview thead tr').append('<th>'+header+'</th>');
    }

    for (i=0; i<data.items.length; i++) {
      item = data.items[i];
      itemRow = '<tr>';
      for (j=0; j<item.length; j++) {
        value = item[j];
        itemRow += '<td>'+value+'</td>';
      }
      itemRow += '</tr>';
      $('.preview tbody').append(itemRow);
    }

    $('.loading').hide();
    $('.preview').show();
  });
}
