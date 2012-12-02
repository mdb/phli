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
  $('.download').attr('href', '/api'+window.location.search).on('click', function () {
    $(this).text('Downloading CSV...').addClass('secondary');
  });

  $.getJSON('/api'+window.location.search+'&preview=1', null, function(data) {
    console.log(data)
    var i, j, header, item, itemRow, value;
    $('.count').text(data.d.__count + ' results');

    for (i=0; i<data.headings.length; i++) {
      header = data.headings[i];
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
    $('body').removeClass('no-preview');
  });
}
