function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
}

function updateAnim(obj, current, change, duration) {

    $({curValue: current}).stop().animate({curValue: change}, {
        duration: 500,
        easing:'swing', // can be anything
        step: function() { // called on every step
            // Update the element's text with rounded-up value:
            obj.text(commaSeparateNumber(Math.round(this.curValue)));
        },
        complete:function(){
            obj.text(commaSeparateNumber(Math.round(this.curValue)));
        }
    });
    
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}