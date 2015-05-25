function izettleProduct(imageUrl, productName, variantName, productPrice) {
	this.imageUrl = imageUrl;
	this.productName = productName;
	this.variantName = variantName;
	this.productPrice = productPrice;
}

function getArrayDummyProducts() {
	var izettleProduct1 = new izettleProduct(
		'http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg', 
		'Hamburger', '', 'SEK 21');

	var izettleProduct2 = new izettleProduct(
		'http://www.citycharcoalgrill.com/wp-content/uploads/Vegi-Burger.jpg', 
		'Vegetarian burger', '', 'SEK 44');

	var arrayOfProducts = new Array();
	arrayOfProducts.push(izettleProduct1);
	arrayOfProducts.push(izettleProduct2);

	return arrayOfProducts;
}

function getDummyJsonString () {
/*	var text = "{\"products\" : [{\"imageUrl\":\"http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg\",
		\"productName\":\"Hamburger\", \"variantName":\"\", \"productPrice\":\"SEK 21\" 
		},
		
		{ 
			\"imageUrl\":\"http://www.citycharcoalgrill.com/wp-content/uploads/Vegi-Burger.jpg\",
			\"productName\":\"Vegetarian burger\", \"variantName\":\"\", \"productPrice\":\"SEK 32\" 
		}

	]}";*/

	var textJson = '{"products" : [	{"imageUrl":"http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg","productName":"Hamburger", "variantName":"", "productPrice":"SEK 21"}, {"imageUrl":"http://www.citycharcoalgrill.com/wp-content/uploads/Vegi-Burger.jpg","productName":"Vegetarian burger", "variantName":"", "productPrice":"SEK 32"}]}';

	console.log("text: " + textJson);
	return textJson;
}

function mapJsonStringToIzettleProduct(jsonString) {
	var obj = $.parseJSON(jsonString);
	return obj.products;
	
}