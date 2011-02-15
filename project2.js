function init() {
	
	// add the onlick event to the calculate button
	var button = document.getElementById("button_click");
	if(window.addEventListener) {
		button.addEventListener("click", validate, false);
	} else {
		button.attachEvent("onclick", validate); // IE hack
	}
}

function validate() {
	
	var house = new House();
	
	// Levels validation
	if (!document.getElementById("1").checked && !document.getElementById("2").checked) {
		if (!document.getElementById("levelsErrorField")) {
			var levelsErrorField = document.createElement("span");
			levelsErrorField.setAttribute("id", "levelsErrorField");
			levelsErrorField.className = "errorField";
			levelsErrorField.appendChild(document.createTextNode("You must select the number of levels."));
			document.getElementById("inputLevelsContainer").appendChild(levelsErrorField);
		}
	} else {
		var removeError = document.getElementById("levelsErrorField");
		house.setLevels("1");
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	// squareFootage validation
	squareFootRegEx = /^\d{1,5}$/;
	if (squareFootRegEx.test(document.getElementById("squareFeet").value) == false) {
		if (!document.getElementById("squareFootErrorField")) {
			var squareFootErrorField = document.createElement("span");
			squareFootErrorField.setAttribute("id", "squareFootErrorField");
			squareFootErrorField.className = "errorField";
			squareFootErrorField.appendChild(document.createTextNode("You must provide a square footage under 100,000."));
			document.getElementById("inputSquareFeetContainer").appendChild(squareFootErrorField);
		}
	} else {
		var removeError = document.getElementById("squareFootErrorField");
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	// style validatioin
	if (document.getElementById("style").value == "none") {
		if (!document.getElementById("styleErrorField")) {
			var styleErrorField = document.createElement("span");
			styleErrorField.setAttribute("id", "styleErrorField");
			styleErrorField.className = "errorField";
			styleErrorField.appendChild(document.createTextNode("You must select a style."));
			document.getElementById("inputStyleContainer").appendChild(styleErrorField);
		}
	} else {
		var removeError = document.getElementById("styleErrorField");
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	// bedroom validation 
	if (document.getElementById("bedrooms").value == "none") {
		if (!document.getElementById("bedroomsErrorField")) {
			var bedroomsErrorField = document.createElement("span");
			bedroomsErrorField.setAttribute("id", "bedroomsErrorField");
			bedroomsErrorField.className = "errorField";
			bedroomsErrorField.appendChild(document.createTextNode("You must select a number of bedrooms."));
			document.getElementById("inputBedroomsContainer").appendChild(bedroomsErrorField);
		}
	} else {
		var removeError = document.getElementById("bedroomsErrorField");
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	// bathrooms validation
	bathroomRegEx = /^(\d|\.){1,}$/;
	if (bathroomRegEx.test(document.getElementById("bathrooms").value) == false) {
		if (!document.getElementById("bathroomsErrorField")) {
			var bathroomsErrorField = document.createElement("span");
			bathroomsErrorField.setAttribute("id", "bathroomsErrorField");
			bathroomsErrorField.className = "errorField";
			bathroomsErrorField.appendChild(document.createTextNode("You must enter the number of bathrooms"));
			document.getElementById("inputBathroomsContainer").appendChild(bathroomsErrorField);
		}
	} else {
		var removeError = document.getElementById("bathroomsErrorField");
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	// garage validation
	if (document.getElementById("garageStalls").value == "none") {
		if (!document.getElementById("garageStallsErrorField")) {
			var garageStallsErrorField = document.createElement("span");
			garageStallsErrorField.setAttribute("id", "garageStallsErrorField");
			garageStallsErrorField.className = "errorField";
			garageStallsErrorField.appendChild(document.createTextNode("You must select the number of garage stalls."));
			document.getElementById("inputGarageStallsContainer").appendChild(garageStallsErrorField);
		}
	} else {
		var removeError = document.getElementById("garageStallsErrorField");
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	if (!document.getElementById("levelsErrorField") && !document.getElementById("squareFootErrorField")
	&& !document.getElementById("styleErrorField") && !document.getElementById("bedroomsErrorField") 
	&& !document.getElementById("bathroomsErrorField") && !document.getElementById("garageStallsErrorField")) {
		if (!document.getElementById("output")) {
			
			// create an output div
			var output = document.createElement("div");
			output.setAttribute("id", "output");
			output.appendChild(document.createTextNode("Here is the calculation for the cost of your house:"));
			
			// calculation for squareFootage cost 
			var squareFootOutput = document.createElement("div");	
			house.setSquareFeet(document.getElementById("squareFeet").value);
			squareFootOutput.appendChild(document.createTextNode("Square Footage Cost: " + house.getSquareFeet()));
			output.appendChild(squareFootOutput);

			document.getElementById("wrapper").appendChild(output);
		}
	} else {
		var removeOutput = document.getElementById("output");
		if (removeOutput) {
			removeOutput.parentNode.removeChild(removeOutput);
		}
	}
}

function House() {
	
	// define variables
	var levels;
	var squareFeet;
	var style;
	var bedrooms;
	var bathrooms;
	var garageStalls;
	
	// create getter and setter methods for each variable
	// Levels
	this.getLevels = function() {
		return levels;
	}
	this.setLevels = function(input) {
		levels = input;
	}

	// squareFeet
	this.getSquareFeet = function() {
		return squareFeet;
	}
	this.setSquareFeet = function(input) {
		squareFeet = input;
	}
	
	// style
	this.getStyle = function() {
		return style;
	}
	this.setStyle = function(input) {
		style = input;
	}
	
	// bedrooms
	this.getBedrooms = function() {
		return bedrooms;
	}
	this.setBedrooms = function(input) {
		bedrooms = input;
	}
	
	// bathrooms
	this.getBathrooms = function() {
		return bathrooms;
	}
	this.setBathrooms = function(input) {
		bathrooms = input;
	}

	// garageStalls
	this.getGarageStalls = function() {
		return garageStalls;
	}
	this.setLevels = function(input) {
		garageStalls = input;
	}
	
	// calculate the cost of the house
	this.calculateCost = function(levels, squareFeet, style, bedrooms, bathrooms, garageStalls) {
		var additionalCost = 15000*bedrooms + 20000*bathrooms + 5000*garageStalls;
		if (levels == "1") {
			var totalCost = 115*squareFeet + additionalCost;
		} else {
			var totalCost = 100*squareFeet + additionalCost;
		}
	}
}

