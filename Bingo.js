function Bingo(phrases, buttonTheme){
    this.buttonTheme = buttonTheme;
    this.phrases = phrases;

    this.init();

    

};

Bingo.prototype.init = function() {
	this.card = this.randomFeed();
	var out = '';
	for (var i = 0 ; i <this.card.length; i++) {
		var modulo = i%5;
		var charTheme = String.fromCharCode(97 + modulo);
		out = out + '<div id="item_' + i + '" class="ui-block-'+ charTheme +'"><div class="ui-bar ui-bar-e" style="height:60px"><br>'+ this.card[i].label+'</div></div>';
	};
	// Populate grid
	$("#grid").append(out);

	// Add event to each cell of grid
	for (var i = 0 ; i <this.card.length; i++) {
		var selector = "#item_" + i + " div";
		$(selector).on("click", null, {scope: this, index: i}, this.selectItem);
	};
};

Bingo.prototype.randomFeed = function() {
	var tempArray = this.phrases;
	var randomFeedArray =[];
    while (tempArray.length > 0) {
		var randInt = Math.floor(Math.random()*tempArray.length);
		randomFeedArray.push({label:tempArray[randInt], selected:false});
		tempArray.splice(randInt, 1);
    }

	return randomFeedArray;
};

Bingo.prototype.selectItem = function(event) {
  event.data.scope.card[event.data.index].selected = true;
  $(this).removeClass('ui-bar-e').addClass('ui-bar-b');
  var displayPopup = Bingo.prototype.areYouAboutToYellBullShit.call(this);

};

Bingo.prototype.areYouAboutToYellBullShit = function(arg1, arg2) {
	var isFirstColumBingo = $("div[class*='ui-block-a'] div[class*='ui-bar-b']").length==5;
	var isSecondColum = $("div[class*='ui-block-b'] div[class*='ui-bar-b']").length==5;
	var isThirdColum = $("div[class*='ui-block-c'] div[class*='ui-bar-b']").length==5;
	var isFourthColum = $("div[class*='ui-block-d'] div[class*='ui-bar-b']").length==5;
	var isFifthColum = $("div[class*='ui-block-e'] div[class*='ui-bar-b']").length==5;

	if(isFifthColum || isFourthColum || isThirdColum || isSecondColum || isFirstColumBingo) {
		$("#bingoDialog").click();
	}

	return false;



};
