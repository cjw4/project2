// ----------------- Add an event handler dynamicly on page load -------------------

function init() {
	
	// add the onlick event to the calculate button
	var button = document.getElementById("button_click");
	if(window.addEventListener) {
		button.addEventListener("click", validate, false);
	} else {
		button.attachEvent("onclick", validate); // IE hack
	}
}

// ---------------- Validate the input and do the relevant calculations --------------------

function validate() {
	
	// Get the input values and store them as variabels
	var levels1 = document.getElementById("1");
	var levels2 = document.getElementById("2");
	var squareFeet = document.getElementById("squareFeet").value;
	var bedrooms = document.getElementById("bedrooms").value;
	var bathrooms = document.getElementById("bathrooms").value;
	var garageStalls = document.getElementById("garageStalls").value;
	
	// Create an new instance of the house Class named house
	var house = new House();
	
	// Validate that either 1 or 2 levels are selected
	if (!document.getElementById("1").checked && !document.getElementById("2").checked) {
		
		// if there is no error message show an error message
		if (!document.getElementById("levelsErrorField")) {
			var levelsErrorField = document.createElement("span");
			levelsErrorField.setAttribute("id", "levelsErrorField");
			levelsErrorField.className = "errorField";
			levelsErrorField.appendChild(document.createTextNode("You must select the number of levels."));
			document.getElementById("inputLevelsContainer").appendChild(levelsErrorField);
		}
	
	// otherwise either level 1 or 2 is selected
	} else {
		var removeError = document.getElementById("levelsErrorField");
		
		if (document.getElementById("1").checked) {
		house.setLevels("1");
		} else {
			house.setLevels("2");
		}
		
		// if there is an error message remove it
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
	
	// if there are no error messages being displayed, display the output costs & cacluations
	if (!document.getElementById("levelsErrorField") && !document.getElementById("squareFootErrorField")
	&& !document.getElementById("styleErrorField") && !document.getElementById("bedroomsErrorField") 
	&& !document.getElementById("bathroomsErrorField") && !document.getElementById("garageStallsErrorField")) {
		
		// as long as there is no output already
		if (!document.getElementById("output")) {
			
			// create an output div
			var output = document.createElement("div");
			output.setAttribute("id", "output");
			output.appendChild(document.createTextNode("Here is the calculation for the cost of your house:"));
			
			// ----------------------- squareFootage cost -----------------------------------
			
			// calculation for squareFootage cost 
			var squareFootOutput = document.createElement("div");	
			house.setSquareFeet(document.getElementById("squareFeet").value);
			if (document.getElementById("1").checked) {
				multiplier = "115";
			} else {
				multiplier = "100";
			}
			squareFootOutput.appendChild(document.createTextNode("Square Footage Cost: " + multiplier + " x " + house.getSquareFeet()));
			
			// create a container for the square footage total to live in
			var squareFootTotalContainer = document.createElement("span");
			squareFootTotalContainer.className = "costOutput";
			
			// calculate the cost based on the square footage
			var squareFootTotal = multiplier * house.getSquareFeet();
			squareFootTotalContainer.appendChild(document.createTextNode("$" + squareFootTotal));
			squareFootOutput.appendChild(squareFootTotalContainer);
			output.appendChild(squareFootOutput);
			
			// ----------------------------------- bedrooms Cost calculation --------------------------------------
			
			// calculate cost for the number of bedrooms
			var bedroomsOutput = document.createElement("div");
			house.setBedrooms(document.getElementById("bedrooms").value);
			bedroomsOutput.appendChild(document.createTextNode("Bedrooms Cost: " + house.getBedrooms() + " x $15000"));
			output.appendChild(bedroomsOutput);

			// create a container for the bedroom total to live in
			var bedroomsTotalContainer = document.createElement("span");
			bedroomsTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bedrooms
			var bedroomsTotal = house.getBedrooms() * 15000;
			bedroomsTotalContainer.appendChild(document.createTextNode("$" + bedroomsTotal));
			bedroomsOutput.appendChild(bedroomsTotalContainer);
			output.appendChild(bedroomsOutput);
			
			// ---------------------------------- bathroom cost calculation -----------------------------------------
			
			// calculate cost for the number of bathrooms
			var bathroomsOutput = document.createElement("div");
			house.setBathrooms(document.getElementById("bathrooms").value);
			bathroomsOutput.appendChild(document.createTextNode("Bathrooms Cost: " + house.getBathrooms() + " x $20000"));
			output.appendChild(bedroomsOutput);
			
			// create a container for the bathrooms total to live in
			var bathroomsTotalContainer = document.createElement("span");
			bathroomsTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bathrooms
			var bathroomsTotal = house.getBathrooms() * 20000;
			bathroomsTotalContainer.appendChild(document.createTextNode("$" + bathroomsTotal));
			bathroomsOutput.appendChild(bathroomsTotalContainer);
			output.appendChild(bathroomsOutput);

			// ------------------------------- garage cost calculation ------------------------------------------------
			
			// calculate cost for the number of garage spaces
			var garageOutput = document.createElement("div");
			house.setGarageStalls(document.getElementById("garageStalls").value);
			garageOutput.appendChild(document.createTextNode("Garage Cost: " + house.getGarageStalls() + " x $5000"));
			output.appendChild(garageOutput);
			
			// create a container for the bathrooms total to live in
			var garageTotalContainer = document.createElement("span");
			garageTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bathrooms
			var garageTotal = house.getGarageStalls() * 5000;
			garageTotalContainer.appendChild(document.createTextNode("$" + garageTotal));
			garageOutput.appendChild(garageTotalContainer);
			output.appendChild(garageOutput);
			
			// -------------------------------- total cost calculation ------------------------------------------------
			
			// calculate the cost based on the calculateCost method
			if (levels1.checked) {
				var totalCost = house.calculateCost(1, squareFeet, bedrooms, bathrooms, garageStalls);
			} else {
				var totalCost = house.calculateCost(2, squareFeet, bedrooms, bathrooms, garageStalls);
			}
			// create a container for the total cost to live in
			var totalContainer = document.createElement("div");
			totalContainer.appendChild(document.createTextNode("Total: $" + totalCost));
			output.appendChild(totalContainer);			
						
			// append the output to the wrapper
			document.getElementById("wrapper").appendChild(output);
			

		
		// if there is already output --> delete it and then reshow it with the new values	
		} else {
			var removeOutput = document.getElementById("output");
			removeOutput.parentNode.removeChild(removeOutput);
			
			// --------------------- go through and recalcate and reappend the output --------------------------
			
			
		}
	
	// if there are errors introduced define a removeOutput variable	
	} else {
		var removeOutput = document.getElementById("output");
		
		// if the remove output variable exists then remove it
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
	this.setGarageStalls = function(input) {
		garageStalls = input;
	}
	
	// calculate the cost of the house
	this.calculateCost = function(levels, squareFeet, bedrooms, bathrooms, garageStalls) {
		var additionalCost = 15000*bedrooms + 20000*bathrooms + 5000*garageStalls;
		if (levels == 1) {
			var totalCost = 115*squareFeet + additionalCost;
		} else {
			var totalCost = 100*squareFeet + additionalCost;
		}
		return totalCost;
	}
}

