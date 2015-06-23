
// THIS IS HOW YOU MAKE A GAME

// function list ->
// 	initEnvironments()
// 	initGame()
// 	initGlobalObservers()

// 	initWallets();

// 	initCards();
//	initJSCSS();

// 	play();
// 	checkAnswer();

// 	move();

// 	cards = {};
//	cards.render();
// 	cards.hover();
// 	cards.select();

// 	update.score();
// 	update.life();

// 	fin.

var environments = {};
var entities = {};
var init = {};
var cards = {};
var animations = {};
var observers = {};

$(function() {
	init.environments();
	init.JSCSS();
	// cards.render();
	init.player();
	$('*').bind('contextmenu', function(event) {
		helpers.notification(messages.instructions, 'Instructions', 'Dismiss', {
			header:theme.informationHeaderColor,
			buttonText: '#fff'
		}, function() {});

		event.preventDefault();
	}).load(function() {
		$('#loading').fadeOut();
	});
});

init.environments = function() {

	environments.land = new Environment('land');
	environments.cardholder = new Environment('cardholder');
	entities.player = new Entity('player');
	environments.hud = new Environment('hud');

	loadConfig(environments.land);
	loadConfig(environments.cardholder);
	loadConfig(entities.player);
	loadConfig(environments.hud);

	initQuiz();

	var resources = {
		health: currencies.health,
		gold: currencies.gold
	};

	var quesbank = [];
	quesbank = Question.all;

	shuffle(quesbank);

	var hasGrail = [];
	for(var i=0, len=cities.length; i<len; i++)
		hasGrail.push(false);

	hasGrail[randBetween(0, hasGrail.length)] = true;

	// intrvl = setInterval(function() {
	// 	console.log(helpers.hasGrail(hasGrail));
	// 	console.log(hasGrail);
	// }, 2500);

	observers.land(resources, hasGrail, quesbank);
}

init.JSCSS = function() {

	var citynum = 0;
	$('#land .location').each(function() {
		$(this).css({
			left: cities[citynum].specs.left + '%',
			top: cities[citynum].specs.top + '%',
		});
		citynum++;
	});
}

init.player = function() {
	$('#player').appendTo('#land');
}

observers.cards = function(num, type, resources, quesbank, hasGrail) {
	$('.card-item').eq(num).unbind('click').on('click', function() {

		$('.card-item').removeClass('greyscale-25 greyscale-50');
		if(num===0) {
			$('.card-item').eq(1).css({zIndex:1}).removeClass('card-active').addClass('greyscale-25');
			$('.card-item').eq(2).css({zIndex:0}).removeClass('card-active').addClass('greyscale-50');
		}
		if(num===1) {
			$('.card-item').eq(0).css({zIndex:0}).removeClass('card-active').addClass('greyscale-25');
			$('.card-item').eq(2).css({zIndex:0}).removeClass('card-active').addClass('greyscale-25');
		}
		if(num===2) {
			$('.card-item').css({zIndex: 0}).removeClass('card-active');
			$('.card-item').eq(0).addClass('greyscale-50');
			$('.card-item').eq(1).addClass('greyscale-25');
		}
		$(this).addClass('card-active').css({zIndex: 2});
		if($(this).hasClass('greyscale-100'))
			$(this).unbind('dblclick');
		else
			$('.card-active').unbind('dblclick').on('dblclick', function() {
					cards.click(type, resources, quesbank, num, hasGrail);
					$(this).addClass('greyscale-100').unbind('dblclick').removeClass('card-active');
			});
	});

	$('#travel').unbind('click').on('click', function() {
		$('#cardholder').fadeOut();
		$('#land').removeClass('blur');
		if(resources.health-20<=0) {
			helpers.defeat(resources);
			resources.health = 0;
		}
		else {
			updateAnim($('#health span'), resources.health, resources.health-20, 500);
			resources.health = resources.health - 20;
		}
	});
}

observers.land = function(resources, hasGrail, quesbank) {
	$('#land .location').unbind('click').on('click',function() {
		$('.city-faded').animate({opacity:1}, 400).removeClass('city-faded');
		$('#land .location').removeClass('no-click');
		
		var pos = $(this).position();
		
		$(this).addClass('no-click').find('img').animate({opacity:0},400).addClass('city-faded');
		
		animations.move($('#player'), pos, 2000, function() {
			if(resources.health<=0)
				helpers.defeat(resources);
			else {
				cards.render(resources, hasGrail, quesbank);
				$('#cardholder').fadeIn(function() {
					$('#land').addClass('blur');
				});
			}
		});
	});
};

observers.playerMove = function(obj) {
	var this_ = $(obj);
	
	animations.move(this_, pos);
}

animations.move = function(obj, position, duration, complete) {

	var top_ = (position.top / obj.parent().height()) * 100;
	var left_ = (position.left / obj.parent().width()) * 100;

	obj.animate({
		top: top_ + '%',
		left: left_ + '%'
	}, {
		duration: duration,
		complete: complete
	});

};

//Cards functions

cards.render = function(resources, hasGrail, quesbank) {
	var cilen = card_items.length;
	$('.card-item').removeClass('greyscale-100 no-click card-item greyscale-50 greyscale-25 card-active');
	for(var i=0; i<3; i++) {
		var randNum = randBetween(0, cilen);
		$('#card-item-' + (i+1)).addClass('card-item').removeClass('location');
		$('#card-item-' + (i+1)).find('.card-name').text(card_items[randNum].name);
		$('#card-item-' + (i+1)).find('.card-type').text(card_items[randNum].type);
		$('#card-item-' + (i+1)).find('.card-img').attr('src', $BASE_URL + card_items[randNum].img);
		$('#card-item-' + (i+1)).find('.card-desc').text(card_items[randNum].desc);
		$('#card-item-' + (i+1)).find('.card-microdesc').text(card_items[randNum].microdesc);
		observers.cards(i, card_items[randNum].key, resources, quesbank, hasGrail);
	}

	$('#card-item-2').addClass('card-active').css({zIndex: 2});
	$('#card-item-1').addClass('greyscale-25').css({zIndex: 0});
	$('#card-item-3').addClass('greyscale-25').css({zIndex: 0});
};

cards.click = function(key, resources, quesbank, num, hasGrail) {
	console.log(num);

	switch(key) {
	    case 'rb':
	    	cards.helpers.rb(resources);
	        break;

	    case 'sp':
	    	cards.helpers.quiz(resources, quesbank, num, hasGrail);
	        break;

	    case 'br':
	    	cards.helpers.br(resources);
	        break;

	    case 'rw':
	    	cards.helpers.rw(resources);
	        break;

	    case 'al':
	    	cards.helpers.al(resources);
	        break;

	    case 'he':
	    	cards.helpers.he(resources);
	        break;

	    case 'gm':
	    	cards.helpers.gm(resources);
	        break;
	};
};

cards.helpers = {};

cards.helpers.rb = function(resources) {
	var randLifeLoss = randBetween(0, 20);
	var randGoldGain = randBetween(100, 200);

	if(resources.health-randLifeLoss<=0)
		helpers.defeat(resources);
	else {
		updateAnim($('#health span'), resources.health, resources.health-randLifeLoss,500);
		updateAnim($('#gold span'), resources.gold, resources.gold+randGoldGain,500);

		resources.health = resources.health-randLifeLoss;
		resources.gold = resources.gold+randGoldGain;
	}
};

cards.helpers.br = function(resources) {
	var randLifeLoss = randBetween(5, 10);
	var randLifeGain = randBetween(10, 50);

	if(resources.health-randLifeLoss<=0)
		helpers.defeat(resources);
	else {
		updateAnim($('#health span'), resources.health, resources.health+(randLifeGain-randLifeLoss),500);
		
		resources.health = resources.health+(randLifeGain-randLifeLoss);
	}
};

cards.helpers.rw = function(resources) {
	var randGoldLoss = randBetween(10, 35);
	var randGoldGain = randBetween(100, 200);
	var randLifeGain = randBetween(10, 20);

	updateAnim($('#health span'), resources.health, resources.health + randLifeGain, 500);
	updateAnim($('#gold span'), resources.gold, resources.gold + (randGoldGain - randGoldLoss), 500);

	resources.health = resources.health + randLifeGain;
	resources.gold = resources.gold + (randGoldGain-randGoldLoss);

	return "You lost " + randGoldLoss + " to gain " + randGoldGain + " gold and " + randLifeGain + " life!"
};

cards.helpers.al = function(resources) {
	var rand = randBetween(0, 1);
	var randLifeGainLoss = randBetween(10, 50);

	if(rand===0) {
		if(resources.health-randLifeGainLoss<=0)
			helpers.defeat(resources)
		else {
			updateAnim($('#health span'), resources.health, resources.health-randLifeGainLoss, 500);
			resources.health = resources.health - randLifeGainLoss;
			return "You lost " + randLifeGainLoss + "life!";
		}
	}
	else {
		updateAnim($('#health span'), reosurces.health, resources.health+randLifeGainLoss, 500);
		resources.health = resources.health + randLifeGainLoss;
		return "You gained " + randLifeGainLoss + "life!";
	}
};

cards.helpers.he = function(resources) {
	var randLifeGain = randBetween(20, 40);

	updateAnim($('#health span'), resources.health, resources.health + randLifeGain, 500);
	resources.health = resources.health + randLifeGain;
	
	return "You gained " + randLifeGain + " life!";
};

cards.helpers.gm = function(resources) {
	var randGoldGain = randBetween(200, 400);

	updateAnim($('#gold span'), resources.gold, resources.gold + randGoldGain, 500);
	resources.gold = resources.gold + randGoldGain;

	return "You gained " + randGoldGain + " gold!";
};

cards.helpers.quiz = function(resources, quesbank, num, hasGrail) {
	var question = quesbank.pop();

	console.log(question);

	$('#cardholder').fadeOut();
	$('#quiz').fadeIn(function() {
		Question.showQuizPanel(quiz, question);
		$('#land').addClass('blur');
		helpers.playQuiz(question, quesbank, num, hasGrail);
	});
};

//Initlializing helpers
var helpers = {}

/*--------------------------
 *	Play Quiz Helper
 *	@params
 		question -> question object
 		quesbank -> array of question objects
---------------------------- */
helpers.playQuiz = function(question, quesbank, num, hasGrail) {

	$(question).unbind('answered').on('answered', function(e, data) {
        if(data.correct==="true") {
            if(quesbank.length===0) {
                quesbank = Question.all;
                shuffle(quesbank);
            }
            else {
            	switch(helpers.hasGrail(hasGrail))
            }
        }
        else {
            quesbank.unshift(question);
        }
    });
};

helpers.victory = function(resources, message, hasGrail) {
	if(resources.health>0)
		alert(message);
};

/*--------------------------
 *	Defeat Helper
 *	@params
 		resources -> object with gold and health values
---------------------------- */
helpers.defeat = function(resources) {
	updateAnim($('#health span'), resources.health, 0, 500);
	resources.health = 0;
	
	helpers.notification('You have died a slow and painful death without reaching anywhere near the treasure!', 'defeat', 'Play Again', {
			header: theme.defeatHeaderColor, 
			buttonText:'#fff'
		}, function() {location.reload(); });

	$('#land #cardholder').addClass('no-click');	
};

helpers.notification = function(message, header, buttonText, color, funct) {
	$('#ptotemy-game').addClass('blur');
	var template = 
		'<div id="messages">' +
			'<div class="message-container">' + 
				'<img src="' + theme.messagebg + '" />' + 
				'<div class="message-header" style="color:' + color.header + '">' + header + '</div>' +
				'<div class="message-body">' + message + '</div>' + 
				'<div class="message-button" style="color:' + color.buttonText + '; background:' + color.header + '">' + buttonText + '</div>' +
			'</div>' + 
		'</div>';

	$('#messages').remove();
	$('body').append(template).find('#messages').hide();
	$('#messages').fadeIn(1000);
	execFunct = function() {
		$('.message-button').unbind('click').on('click', function() {
			funct();
			$('#messages').fadeOut(1000,function() {
				$(this).remove();
				$('#ptotemy-game').removeClass('blur');
			});
		});
	}();
};

helpers.hasGrail = function(hasGrail) {
	var indx = hasGrail.indexOf(true);
	var pos = {player: {}, grail: {}};

	pos.player.top = parseFloat(document.getElementById('player').style.top.split('%')[0]);
	pos.player.left = parseFloat(document.getElementById('player').style.left.split('%')[0]);

	pos.grail.top = parseFloat(document.getElementById(cities[indx].name).style.top.split('%')[0]);
	pos.grail.left = parseFloat(document.getElementById(cities[indx].name).style.left.split('%')[0]);

	if($('#player').position().top===$('#' + cities[indx].name).position().top && $('#player').position().left===$('#' + cities[indx].name).position().left )
		return 'here';
	if((pos.player.top>pos.grail.top-20) && (pos.player.top<pos.grail.top+20) && (pos.player.left<pos.grail.left))
		return 'east';
	if((pos.player.top>pos.grail.top-20) && (pos.player.top<pos.grail.top+20) && (pos.player.left>pos.grail.left))
		return 'west';
	if((pos.player.left>pos.grail.left-10) && (pos.player.left<pos.grail.left+10) && (pos.player.top<pos.grail.top))
		return 'south';
	if((pos.player.left>pos.grail.left-10) && (pos.player.left<pos.grail.left+10) && (pos.player.top>pos.grail.top))
		return 'north';


	// if(pos.player.top)
};




