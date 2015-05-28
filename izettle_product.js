function izettleProduct(imageUrl, productName, variantName, productPrice, childProducts, productType) {
	this.imageUrl = imageUrl;
	this.productName = productName;
	this.variantName = variantName;
	this.productPrice = productPrice;
	this.childProducts = childProducts;
	this.productType = productType;
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

		/*var textJson = 
		'{"products" : ['
		+ '{"imageUrl":"http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg","productName":"Hamburger", "variantName":"", "productPrice":"SEK 21"},' 
		+ '{"imageUrl":"http://www.citycharcoalgrill.com/wp-content/uploads/Vegi-Burger.jpg","productName":"Vegetarian burger", "variantName":"", "productPrice":"SEK 32"},' 
		+ '{"imageUrl":"http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps28800_UGG143377D12_18_1b.jpg","productName":"Awesome Hamburger", "variantName":"Extra cheese", "productPrice":"SEK 55"},'
		+ '{"imageUrl":"http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg","productName":"Hamburger", "variantName":"", "productPrice":"SEK 21"},' 
		+ '{"imageUrl":"http://www.citycharcoalgrill.com/wp-content/uploads/Vegi-Burger.jpg","productName":"Vegetarian burger", "variantName":"", "productPrice":"SEK 32"},' 
		+ '{"imageUrl":"http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps28800_UGG143377D12_18_1b.jpg","productName":"Awesome Hamburger", "variantName":"Extra cheese", "productPrice":"SEK 55"},'
		+ '{"imageUrl":"http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg","productName":"Hamburger", "variantName":"", "productPrice":"SEK 21"},' 
		+ '{"imageUrl":"http://www.citycharcoalgrill.com/wp-content/uploads/Vegi-Burger.jpg","productName":"Vegetarian burger", "variantName":"", "productPrice":"SEK 32"},' 
		+ '{"imageUrl":"http://hostedmedia.reimanpub.com/TOH/Images/Photos/37/300x300/exps28800_UGG143377D12_18_1b.jpg","productName":"Awesome Hamburger", "variantName":"Extra cheese", "productPrice":"SEK 55"}'
		+ ']}'; */

		var textJson = '{"products":[{"childProducts":[{"imageUrl":"http://image.izettletest.com/productimage/3xTi8t0aibmtIUAhOMtvmzFJKy8.jpeg","productName":"Espresso","productPrice":"15,00 kr","productType":"PRODUCT","variantName":"Single"},{"imageUrl":"http://image.izettletest.com/productimage/3xTi8t0aibmtIUAhOMtvmzFJKy8.jpeg","productName":"Espresso","productPrice":"20,00 kr","productType":"PRODUCT","variantName":"Double"}],"imageUrl":"http://image.izettletest.com/productimage/3xTi8t0aibmtIUAhOMtvmzFJKy8.jpeg","productName":"Espresso","productPrice":"0,00 kr","productType":"VARIANT_FOLDER","variantName":""},{"childProducts":[{"imageUrl":"http://image.izettletest.com/productimage/2IY0zHganFB5rdd1g_xYycuM_rc.jpeg","productName":"Brie","productPrice":"55,00 kr","productType":"PRODUCT","variantName":""},{"imageUrl":"http://image.izettletest.com/productimage/zx1IBsaHeVuFhsXB0CDfdHkOHpc.jpeg","productName":"Salami","productPrice":"50,00 kr","productType":"PRODUCT","variantName":""},{"imageUrl":"http://image.izettletest.com/productimage/dFw6LupwILyd0GfPYbRZ7pWRZo0.jpeg","productName":"Ham","productPrice":"40,00 kr","productType":"PRODUCT","variantName":""}],"imageUrl":"","productName":"Sandwiches","productPrice":"0,00 kr","productType":"FOLDER","variantName":""},{"childProducts":[{"imageUrl":"http://image.izettletest.com/productimage/zdgYen5UG1qifukp34EvkBgN-z0.jpeg","productName":"Macciato","productPrice":"17,00 kr","productType":"PRODUCT","variantName":"Single"},{"imageUrl":"http://image.izettletest.com/productimage/zdgYen5UG1qifukp34EvkBgN-z0.jpeg","productName":"Macciato","productPrice":"22,00 kr","productType":"PRODUCT","variantName":"Double"}],"imageUrl":"http://image.izettletest.com/productimage/zdgYen5UG1qifukp34EvkBgN-z0.jpeg","productName":"Macciato","productPrice":"0,00 kr","productType":"VARIANT_FOLDER","variantName":""},{"imageUrl":"http://image.izettletest.com/productimage/-SVjfvblaqhFVJ4bcXFY4wB0jV8.jpeg","productName":"Sallad","productPrice":"65,00 kr","productType":"PRODUCT","variantName":""},{"childProducts":[{"imageUrl":"http://image.izettletest.com/productimage/YlMHQGLj7nW8lveSu6-_bQkaaY4.jpeg","productName":"Cappucino","productPrice":"25,00 kr","productType":"PRODUCT","variantName":"Small"},{"imageUrl":"http://image.izettletest.com/productimage/YlMHQGLj7nW8lveSu6-_bQkaaY4.jpeg","productName":"Cappucino","productPrice":"30,00 kr","productType":"PRODUCT","variantName":"Medium"},{"imageUrl":"http://image.izettletest.com/productimage/YlMHQGLj7nW8lveSu6-_bQkaaY4.jpeg","productName":"Cappucino","productPrice":"35,00 kr","productType":"PRODUCT","variantName":"Large"}],"imageUrl":"http://image.izettletest.com/productimage/YlMHQGLj7nW8lveSu6-_bQkaaY4.jpeg","productName":"Cappucino","productPrice":"0,00 kr","productType":"VARIANT_FOLDER","variantName":""},{"imageUrl":"http://image.izettletest.com/productimage/km0-iqRQp81lQep8MLszIKmRugI.jpeg","productName":"Smoothie","productPrice":"40,00 kr","productType":"PRODUCT","variantName":""}]}';

		console.log("text: " + textJson);
		return textJson;
	}

	function mapJsonStringToIzettleProduct(jsonString) {
		var obj = $.parseJSON(jsonString);
		return obj.products;

	}