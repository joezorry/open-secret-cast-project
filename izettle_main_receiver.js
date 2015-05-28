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

    var arrayOfProducts = $.parseJSON(event.data).products;
    setupList(arrayOfProducts);

    window.messageBus.send(event.senderId, event.data);
  }

  // initialize the CastReceiverManager with an application status message
  window.castReceiverManager.start({statusText: "Application is starting"});
  console.log('Receiver Manager started'); 

  //For testing internally
  //var arrayOfProducts = $.parseJSON(getDummyJsonString()).products;
  //setupList(arrayOfProducts);
};

var MAX_NUM_OF_PRODUCTS_ON_ONE_PAGE = 6;

var currentPage = 1;
var numberOfPages = 0;
var arrayOfProducts;

function setupList(arrayOfProducts) {
  var numberOfPages = (arrayOfProducts.length - 1) % MAX_NUM_OF_PRODUCTS_ON_ONE_PAGE;
  console.log("numberOfPages " + numberOfPages);
  initListWithArrayOfProducts(arrayOfProducts, 1);
  if (numberOfPages <= 2) {
    showPage(arrayOfProducts, 2);
  }
}

// utility function to display the text message in the input field
function displayText(text) {
  console.log(text);
  document.getElementById("message").innerHTML = text;
  document.getElementById("p_message").innerHTML = text;
  window.castReceiverManager.setApplicationState(text);
};

function showPage(arrayOfProducts, showPage) {
  console.log("ShowPage called " + showPage);

  $('.product_list')
  .delay('10000')
  .slideUp('500', function() {
    console.log("Remove");
    $('.product_list_item').detach();
    initListWithArrayOfProducts(arrayOfProducts, showPage);
  })
  .slideDown('500', function() {
    console.log("add");
    pageSwitcher(arrayOfProducts);
  });
}

function pageSwitcher(arrayOfProducts) {
  if (currentPage < numberOfPages) {
    currentPage = currentPage + 1;
    console.log("CurrentPage " + currentPage);
  } else {
    currentPage = 1;
  }
  showPage(arrayOfProducts, 1);
}

function initListWithArrayOfProducts(arrayOfProducts, page) {
  var cList = $('.product_list')
  $.each(arrayOfProducts, function(i) {

    //This is some horrible math
    i = (page * MAX_NUM_OF_PRODUCTS_ON_ONE_PAGE - MAX_NUM_OF_PRODUCTS_ON_ONE_PAGE) + i;

    if (i < MAX_NUM_OF_PRODUCTS_ON_ONE_PAGE * page && arrayOfProducts[i] != null) {

      var product = arrayOfProducts[i];

      console.log("ProductName " + arrayOfProducts[i].productName);

      var li = $('<li/>')
      .addClass('product_list_item')
      .appendTo(cList);

      var container = $('<div />')
      .addClass('container')
      .appendTo(li)

      var imgWrapper = $('<div/>')
      .addClass('imgWrapper')
      .appendTo(container);

      if("FOLDER" == product.productType) {
        var imageList = $('<img/>')
        .attr({'src': product.childProducts[0].imageUrl})
        .appendTo(imgWrapper);
      } else {
        var imageList = $('<img/>')
        .attr({'src': product.imageUrl})
        .appendTo(imgWrapper);
      }


      if (product.variantName.trim() != null && product.variantName.trim()) {
        var titleList = $('<span/>')
        .addClass('product_title_with_variant')
        .text(product.productName)
        .appendTo(container);

        var variantName = $("<span/>")
        .addClass('variantName')
        .text(product.variantName)
        .appendTo(container);

      } else {
        var titleList = $('<span/>')
        .addClass('product_title')
        .text(product.productName)
        .appendTo(container);
      }

      if ("VARIANT_FOLDER" == product.productType || "FOLDER" == product.productType) {

        var variantArray = product.childProducts.reverse();

        $.each(variantArray, function(index) {

          var variantProduct = product.childProducts[index];

          var variantNamePriceContainer = $('<div />')
          .addClass('variant_column_container')
          .appendTo(container);

          console.log("ChildName : " + variantProduct.variantName);

          var calcMarigin;
          if (index == 0) {
            calcMarigin = 0;
          } else {
            calcMarigin = (index * 160);
          }

          var nameOfChildProduct;
          if (variantProduct.variantName == "") {
            nameOfChildProduct = variantProduct.productName;
            console.log("CHILD PRODUCT NAME: INSIDE  " + JSON.stringify(variantProduct));
          } else {
            nameOfChildProduct = variantProduct.variantName;
          }

          console.log("CHILD PRODUCT NAME:  " + nameOfChildProduct);

          console.log("New margin title " + calcMarigin);
          var variantNameColumn = $('<span />')
          .addClass('variant_name_right')
          .text(nameOfChildProduct)
          .appendTo(variantNamePriceContainer);
          variantNameColumn.css({
            'right': calcMarigin + 'px',
          });

          var calcMarigin;
          if (index == 0) {
            calcMarigin = 20;
          } else {
            calcMarigin = (index * 170);
          }

          var variantPriceColumn = $('<span />')
          .addClass('variant_price_right')
          .text(variantProduct.productPrice)
          .appendTo(variantNamePriceContainer);
          variantPriceColumn.css({
            'right': calcMarigin + 'px',
          })

        });

} else {
  var priceList = $('<span/>')
  .addClass('product_price')
  .text(product.productPrice)
  .appendTo(container);
}
}
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