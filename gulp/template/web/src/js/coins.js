(function(){
    var NUMBER_OF_COINS = 8;
    function init()
    {
        var container1 = document.getElementsByClassName('stars')[0];
        try{
            for (var i = 0; i < NUMBER_OF_COINS; i++) 
            {
                container1.appendChild(createALeaf());
            }
        }catch(e){
            
        }
    }

    function randomInteger(low, high)
    {
        return low + Math.floor(Math.random() * (high - low));
    }


    function randomFloat(low, high)
    {
        return low + Math.random() * (high - low);
    }


    function pixelValue(value)
    {
        return value/100 + 'rem';
    }


    function durationValue(value)
    {
        return value + 's';
    }


    function createALeaf()
    {
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');
        image.src = 'images/star1.png';
        leafDiv.style.top ="0px";
        leafDiv.style.left = randomInteger(100,150)+"px";

        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
        leafDiv.style.webkitAnimationName = 'fade, drop';
        leafDiv.style.animationName = 'fade, drop ';
        image.style.webkitAnimationName = spinAnimationName;
        image.style.animationName = 'clockwiseSpin';

        var fadeAndDropDuration = durationValue(randomFloat(3, 5));
        var spinDuration = durationValue(randomFloat(1,3));
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

        var leafDelay = durationValue(randomFloat(0, 1));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
        image.style.webkitAnimationDuration = spinDuration;
        image.style.animationDuration = spinDuration;

        leafDiv.style.animationIterationCount="infinite";
        
        leafDiv.appendChild(image);
        return leafDiv;
    }



    init();
})();

