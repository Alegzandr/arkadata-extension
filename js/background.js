'use strict';

$(function () {
  var channel = 'arkadataediting';
  var clientId = '?client_id=fnr8bq0bdgofecehqlmkneixnoqo6s';
  var apiStreams = 'https://api.twitch.tv/kraken/streams/' + channel + clientId;

  localStorage.setItem('arkadataLive', 'off');

  function checkLive() {
    $.get(apiStreams, function (data) {
      if (data.stream !== null) {
        if (localStorage.getItem('arkadataLive') === 'off') {
          var iconUrl = '../img/notif' + (Math.floor(Math.random() * 5) + 1  ) + '.jpg';

          chrome.browserAction.setTitle({ title: 'ARKADATA - Online' });
          chrome.browserAction.setIcon({ path: '../img/icon_on.png' });

          chrome.notifications.create('isLive', {
            type: 'basic',
            iconUrl: iconUrl,
            title: 'ARKADATA Extension',
            message: 'Stream is online, click to watch !',
            isClickable: true
          }, function () {
          });

          localStorage.setItem('arkadataLive', 'on');
        }
      } else {
        localStorage.setItem('arkadataLive', 'off');

        chrome.browserAction.setTitle({ title: 'ARKADATA - Offline' });
        chrome.browserAction.setIcon({ path: '../img/icon_off.png' });
      }
    });
  }

  setInterval(checkLive, 60000);
  checkLive();

  // When clicking on notification
  chrome.notifications.onClicked.addListener(function () {
    chrome.tabs.create({ url: 'https://www.twitch.tv/' + channel });
  });
});
