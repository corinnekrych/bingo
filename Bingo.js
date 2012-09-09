
/* Copyright 2012 the original author: corinne krych.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
*
* @author <a href='mailto:corinnekrych@gmail.com'>corinnekrych</a>
*/
function Bingo(phrases, buttonTheme){
    this.buttonTheme = buttonTheme;
    this.phrases = ['Quick Win', 
    				'Tactical\n Solution', 
    				'Resources', 
    				'Budget', 
    				'Patch', 
    				'QA', 
    				'Delivery', 
    				'Scrum', 
    				'Agile', 
    				'Release', 
    				'Short Term', 
    				'Merge\n Conflicts', 
    				'Rebase', 
    				'Stream', 
    				'POM', 
    				'Clear Case', 
    				'Platform', 
    				'Quality', 
    				'Sprint', 
    				'Product\n Owner', 
    				'Scrum\n Master', 
    				'Specifications', 
    				'Strategic', 
    				'Build', 
    				'Blocking'];
    this.init();
};

Bingo.prototype.init = function() {
	// Reset HTML grid
	$("#grid").empty();

	// Generate random card feed with phrases deck
	this.card = this.randomFeed();

	// Populate HTML grid with randomly fed card
	var out = '';
	var line = 0;
	for (var i = 0 ; i <this.card.length; i++) {
		var modulo = i%5;
		if (modulo == 0) {
			line++;
		}
		var charTheme = String.fromCharCode(97 + modulo);
		out = out + '<div id="item_' + i + '" class="line-'+ line +' ui-block-'+ charTheme +'"><div class="ui-bar ui-bar-e" style="height:60px"><br>'+ this.card[i].label+'</div></div>';
	};
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
	var isSelected = event.data.scope.card[event.data.index].selected;
	if (isSelected) {
		event.data.scope.card[event.data.index].selected = false;
		$(this).removeClass('ui-bar-b').addClass('ui-bar-e');
	} else {
		event.data.scope.card[event.data.index].selected = true;
		$(this).removeClass('ui-bar-e').addClass('ui-bar-b');
	}
	var displayPopup = Bingo.prototype.areYouAboutToYellBullShit.call(this);
};

Bingo.prototype.areYouAboutToYellBullShit = function(arg1, arg2) {
	var isFirstColum = $("div[class*='ui-block-a'] div[class*='ui-bar-b']").length==5;
	var isSecondColum = $("div[class*='ui-block-b'] div[class*='ui-bar-b']").length==5;
	var isThirdColum = $("div[class*='ui-block-c'] div[class*='ui-bar-b']").length==5;
	var isFourthColum = $("div[class*='ui-block-d'] div[class*='ui-bar-b']").length==5;
	var isFifthColum = $("div[class*='ui-block-e'] div[class*='ui-bar-b']").length==5;

	var isFirstLine = $("div[class*='line-1'] div[class*='ui-bar-b']").length==5;
	var isSecondLine = $("div[class*='line-2'] div[class*='ui-bar-b']").length==5;
	var isThirdLine = $("div[class*='line-3'] div[class*='ui-bar-b']").length==5;
	var isFourthLine = $("div[class*='line-4'] div[class*='ui-bar-b']").length==5;
	var isFifthLine = $("div[class*='line-5'] div[class*='ui-bar-b']").length==5;

	if(isFifthColum || isFourthColum || isThirdColum || isSecondColum || isFirstColum
	   || isFifthLine || isFourthLine || isThirdLine || isSecondLine || isFirstLine) {
		$("#bingoDialog").click();
	}

	return false;
};
