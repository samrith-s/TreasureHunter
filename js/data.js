
$BASE_URL = 'img/';

var theme = {};

theme.background = $BASE_URL + 'background.jpg';
theme.find = $BASE_URL + 'find.png';
theme.player = $BASE_URL + 'player.png';
theme.health = $BASE_URL + 'health.png';
theme.gold = $BASE_URL + 'gold.png';
theme.messagebg = $BASE_URL + 'messagebg.png';
theme.victoryHeaderColor = '#007506';
theme.defeatHeaderColor = '#750600';
theme.informationHeaderColor = '#023244';

var messages = {};

messages.here = 'The treasure is somewhere in this city!';
messages.east = 'The treasure is to the east of this city';
messages.west = 'The treasure is to the west of this city';
messages.north = 'The treasure is to the north of this city';
messages.south = 'The treasure is to the south of this city';

messages.findInsufficient = 'Sorry, my friend, you cannot afford that!';
messages.findFail = 'No treasure here, buddy! That was a waste of 500 gold.'
messages.victory = 'You have found the treasure! Indiana Jones would be proud of you!';
messages.defeat = 'You have died a slow and painful death without reaching anywhere near the treasure!';
messages.instructions = 
	'Move by clicking on the cities. Click to select and double click to use a card.' +
	' You lose when health drops to zero.';

messages.travel_button = 'Lose 20 life and travel to another city';
messages.find_button = 'Use 500 gold to hunt for treasure';


var currencies = {};

currencies.health = 100;
currencies.gold = 500;		

var cities = [
	{
		name: 'Cromerth',
		specs: {
			left: 40.25,
			top: 1.25
		}
	},
	{
		name: 'Inverness',
		specs: {
			left: 74,
			top: 22.5,
		}
	},
	{
		name: 'Wealdstone',
		specs: {
			left: 30.75,
			top: 23,
		}
	},
	{
		name: 'Murtovaara',
		specs: {
			left: 60,
			top: 45.5,
		}
	},
	{
		name: 'Ashton',
		specs: {
			left: 6.5,
			top: 42.5,
		}
	},
	{
		name: 'Transmere',
		specs: {
			left: 15,
			top: 82.5,
		}
	}
];

var card_items = [
	{
		name: "Robbery",
		img: "robbery.jpg",
		desc: "A treasure hunter must also be nifty at robbing to reach his chest.",
		type: "Task",
		microdesc: "Lose 0 - 20 life to gain 100 - 200 gold",
		key: "rb"
	},
	{
		name: "The Sphinx",
		img: "sphinx.jpg",
		desc: "Lost, are we? I only help those who help themselves. Answer me and be guided.",
		type: "Interaction",
		microdesc: "Answer a question and get directions",
		key: "sp"
	},
	{
		name: "Bloodrite",
		img: "bloodrite.jpg",
		desc: "A bloodrite is magic at it's purest, darkest form. Are you willing to sacrifice?",
		type: "Magic",
		microdesc: "Lose 5 - 10 life to gain 10 - 50 life",
		key: "br"
	},
	{
		name: "Rogue Warrior",
		img: "rogue.jpg",
		desc: "A little training never hurt anyone, eh?",
		type: "Interaction",
		microdesc: "Lose 10 - 35 gold to gain 100 - 200 gold and 10 - 20 life.",
		key: "rw"
	},
	{
		name: "Allure",
		img: "allure.jpg",
		desc: "The invisible can help you at times.",
		type: "Magic",
		microdesc: "Lose or gain 10 - 50 life",
		key: "al"
	},
	{
		name: "Healer",
		img: "healer.jpg",
		desc: "Healing. With no strings attached. Honestly.",
		type: "Magic",
		microdesc: "Gain 20 - 40 life",
		key: "he"
	},
	{
		name: "Gold Mine",
		img: "treasure.jpg",
		desc: "Come on, help yerself, mate!",
		type: "Magic",
		microdesc: "Gain 200 - 400 gold",
		key: "gm"
	}
];



