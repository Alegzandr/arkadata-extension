'use strict';

$(function () {
  var channel = 'arkadataediting';
  var clientId = '?client_id=fnr8bq0bdgofecehqlmkneixnoqo6s';

  var apiStreams = 'https://api.twitch.tv/kraken/streams/' + channel + clientId;
  var apiChannels = 'https://api.twitch.tv/kraken/channels/' + channel + clientId;

  // Load title
  $.get(apiChannels, function (data) {
    $('main').html('<h3>' + data.status + '</h3>');
    $('footer').animate({left: '0'}, 'slow', 'swing');
    $('main > h3').fadeIn('slow');

    // Load status
    $.get(apiStreams, function (data) {
      if (data.stream === null) {
        $('main').css('border', 'inset 1px #ff0000').append('<small class="offline">Stream offline</small>');
        $('footer').css('background', '#c00a33');
      }
      else {
        $('main').css('border', 'inset 1px #2fd291').append('<small class="online">Stream online</small>');
        $('footer').css('background', '#2fd291');
      }

      $('main > small').fadeIn('slow');
    });
  });
});
