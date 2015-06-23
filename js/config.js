var config = {};

config.land = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src=' " + theme.background + "'/>"}
    ],
    locations: function () {
        var allLocations = [];
        for (var i = 0, len=cities.length; i < len; i++) {
            cityImg = getImg("gh-city"+i);
            allLocations.push({
                name: cities[i].name,
                states: [
                    {
                        name: "default", 
                        representation: "<img src='"+cityImg+"'/>"
                    }
                ]
            });
        }

        return allLocations;
    }()
};

config.cardholder = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: function() {
        var allLocations = [];
        for(var i=0; i<3; i++) {
            allLocations.push({
                name: 'card-item-' + (i+1),
                states: [
                    {
                        name: "default",
                        representation: "<img class='card-img' src='' /><div class='card-name'></div><div class='card-type'></div><div class='card-desc'></div><div class='card-microdesc'></div>"
                    }
                ]
            });            
        }

        allLocations.push({
            name: "find",
            states: [
                {name: "default", representation: messages.find_button}
            ]
        }, {
            name: "travel",
            states: [
                {name: "default", representation: messages.travel_button}
            ]
        });


        return allLocations;
    }()
};


config.player = {
    type: "entity",
    states: [
        {name: "default", representation: "<img src='" + theme.player + "' />"}
    ]
};

config.hud = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {
            name: "health",
            states: [
                {name: "default", representation: "<span>" + currencies.health + "</span><img src='" + theme.health + "' />"}
            ]
        },
        {
            name: "gold",
            states: [
                {name: "default", representation: "<span>" + currencies.gold + "</span><img src='" + theme.gold + "' />"}
            ]
        }
    ]
}

// config.notification = {
//     type: "environment",
//     states: [
//         {name: "default", representation: "<img src='"+theme.notificationBack+"'/><div id='notification-content'></div>"}
//     ]
// };
