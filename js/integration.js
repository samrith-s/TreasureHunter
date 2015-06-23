function getImg(str){
	return defaultImages.path+defaultImages[str]
	// if(parent.getImageInGame(parent.currentIntegratedGame,str) === 403)
	// 	return defaultImages.path+defaultImages[str]
	// else
	// 	return parent.getImageInGame(parent.currentIntegratedGame,str)
}

function getText(str){
	return defaultText[str]
	// if(parent.getTextInGame(parent.currentIntegratedGame,str) === 403)
	// 	return defaultText[str]
	// else
	// 	return parent.getTextInGame(parent.currentIntegratedGame,str)
}

window.getImg= getImg
window.getText = getText

//this is the object which contains path for default text and images
defaultImages  ={}
defaultImages.path = "img/"
defaultImages["gh-background"] = "background.jpg";
defaultImages["gh-gold"] = "goldring.png";
defaultImages["gh-life"] = "lifering.png";
defaultImages["gh-travel"] = "caravan.gif";
defaultImages["gh-win"] = "grail.png";
defaultImages["gh-lose"] = "defeat.jpg";
defaultImages["gh-notification"] = "notification.png";
defaultImages["gh-player"] = "player.png";
defaultImages["gh-grail-fail"] = "waste.jpg";
defaultImages["gh-city0"]= "eridor.png";
defaultImages["gh-city1"]= "nyx.png";
defaultImages["gh-city2"]= "zenube.png";
defaultImages["gh-city3"]= "kormia.png";
defaultImages["gh-city4"]= "mithkoti.png";
defaultImages["gh-city5"]= "gragoo.png";
defaultImages["gh-city6"]= "poliwip.png";
defaultImages["gh-city7"]= "lorilia.png";
defaultImages["gh-quest1"] = "treasure.jpg";
defaultImages["gh-quest2"] = "robbery.jpg";
defaultImages["gh-quest3"] = "magicmedicine.jpg";
defaultImages["gh-quest4"] = "doctor.jpg";
defaultImages["gh-quest5"] = "gladiator.jpg";
defaultImages["gh-quest6"] = "sphinx.jpg";
defaultImages["gh-quest7"] = "errands.jpg";
defaultImages["gh-quest8"] = "bloodletting.jpg";






defaultText = {};
defaultText["gh-city-name0"] = "Eridor";
defaultText["gh-city-name1"] = "Nyx";
defaultText["gh-city-name2"] = "Zenube";
defaultText["gh-city-name3"] = "Kormia";
defaultText["gh-city-name4"] = "Mithkoti";
defaultText["gh-city-name5"] = "Gragoo";
defaultText["gh-city-name6"] = "Poliwip";
defaultText["gh-city-name7"] = "Lorilia";
defaultText["gh-quest1-name"] = "Treasure Hunt";
defaultText["gh-quest2-name"] = "Robbery Attempt";
defaultText["gh-quest3-name"] = "Magic Medicine";
defaultText["gh-quest4-name"] = "Visit a Doctor";
defaultText["gh-quest5-name"] = "Gladiator Contest";
defaultText["gh-quest6-name"] = "Meet the Sphinx";
defaultText["gh-quest7-name"] = "Hard Work";
defaultText["gh-quest8-name"] = "Blood Letting";









window.defaultImages = defaultImages;
