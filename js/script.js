'use strict';

$(function () {
  var channel = 'arkadataediting';
  var clientId = '?client_id=fnr8bq0bdgofecehqlmkneixnoqo6s';

  var apiStreams = 'https://api.twitch.tv/kraken/streams/' + channel + clientId;
  var apiChannels = 'https://api.twitch.tv/kraken/channels/' + channel + clientId;

  // Load status
  $.get(apiStreams, function (data) {
    if (data.stream !== null)
      $('.status').html('Stream online')
  });

  // Load title
  $.get(apiChannels, function (data) {
    $('.title').html(data.status);
  });
});
