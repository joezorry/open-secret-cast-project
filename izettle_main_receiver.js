window.onload = function() {
 cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
 cast.receiver.logger.setLevelValue(0);
 window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
 console.log('Starting Receiver Manager');

 setUpCastConnectionEvents();
 muteChromeCast();

  // create a CastMessageBus to handle messages for a custom namespace
  window.messageBus = getCastMessageBus();

  // handler for the CastMessageBus message event
  window.messageBus.onMessage = function(event) {
    console.log('Message [' + event.senderId + ']: ' + event.data);

    // inform all senders on the CastMessageBus of the incoming message event
    // sender message listener will be invoked

    /*var arrayOfProducts = mapJsonStringToIzettleProduct(getDummyJsonString());*/
    var arrayOfProducts = $.parseJSON(event.data).products;
    initListWithArrayOfProducts(arrayOfProducts);

    // display the message from the sender
    displayText(event.data);

    window.messageBus.send(event.senderId, event.data);
  }

  // initialize the CastReceiverManager with an application status message
  window.castReceiverManager.start({statusText: "Application is starting"});
  console.log('Receiver Manager started');

  //For testing internally
  /*var arrayOfProducts = mapJsonStringToIzettleProduct(getDummyJsonString());
  initListWithArrayOfProducts(arrayOfProducts);*/
};

// utility function to display the text message in the input field
function displayText(text) {
  console.log(text);
  document.getElementById("message").innerHTML = text;
  document.getElementById("p_message").innerHTML = text;
  window.castReceiverManager.setApplicationState(text);
};

function initListWithArrayOfProducts(arrayOfProducts) {
  var cList = $('ul.product_list')
  $.each(arrayOfProducts, function(i) {

    var li = $('<li/>')
    .addClass('product_list_item')
    .appendTo(cList);

    var container = $('<div />')
    .addClass('container')
    .appendTo(li)

    var imgWrapper = $('<div/>')
    .addClass('imgWrapper')
    .appendTo(container);

    var imageList = $('<img/>')
    .attr({'src': arrayOfProducts[i].imageUrl})
    .appendTo(imgWrapper);

    var titleList = $('<span/>')
    .addClass('product_title')
    .text(arrayOfProducts[i].productName)
    .appendTo(container);

    var priceList = $('<span/>')
    .addClass('product_price')
    .text(arrayOfProducts[i].productPrice)
    .appendTo(container);
  });
}

function getCastMessageBus() {
  return window.castReceiverManager.getCastMessageBus('urn:x-cast:com.izettle.android.cast');
}

function muteChromeCast() {
   // handler for 'systemvolumechanged' event
   castReceiverManager.onSystemVolumeChanged = function(event) {
    console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
      event.data['muted']);
  };
}

function setUpCastConnectionEvents() {
   // handler for the 'ready' event
   castReceiverManager.onReady = function(event) {
    console.log('Received Ready event: ' + JSON.stringify(event.data));
    window.castReceiverManager.setApplicationState("Application status is ready...");
  };

  // handler for 'senderconnected' event
  castReceiverManager.onSenderConnected = function(event) {
    console.log('Received Sender Connected event: ' + event.data);
    console.log(window.castReceiverManager.getSender(event.data).userAgent);
  };

  // handler for 'senderdisconnected' event
  castReceiverManager.onSenderDisconnected = function(event) {
    console.log('Received Sender Disconnected event: ' + event.data);
    if (window.castReceiverManager.getSenders().length == 0) {
      window.close();
    }
  };
}