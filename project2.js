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
	
	
	// Validate that either 1 or 2 levels are selected
	if (!levels1.checked && !levels2.checked) {
		
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
		
		// if there is an error message remove it
		if (removeError) {
			removeError.parentNode.removeChild(removeError);
		}
	}
	
	// squareFootage validation
	squareFootRegEx = /^\d{1,4}$/;
	if (squareFootRegEx.test(squareFeet) == false) {
		if (!document.getElementById("squareFootErrorField")) {
			var squareFootErrorField = document.createElement("span");
			squareFootErrorField.setAttribute("id", "squareFootErrorField");
			squareFootErrorField.className = "errorField";
			squareFootErrorField.appendChild(document.createTextNode("You must provide a square footage under 10,000."));
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
	if (bedrooms == "none") {
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
	if (bathroomRegEx.test(bathrooms) == false) {
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
	if (garageStalls == "none") {
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
			
			// create an output div: <div id="output">Here is the calculation for the cost of your house:</div>
			var output = document.createElement("div");
			output.setAttribute("id", "output");
			output.appendChild(document.createTextNode("Here is the calculation for the cost of your house:"));
			
			// Create an new instance of the house Class named house and set its values
			var house = new House();
			house.setSquareFeet(squareFeet);
			house.setBedrooms(bedrooms);
			house.setBathrooms(bathrooms);
			house.setGarageStalls(garageStalls);
			
			
			// ---------------------------------------------- squareFootage cost -----------------------------------
			
			// calculation for squareFootage cost 
			if (document.getElementById("1").checked) {
				multiplier = "115";
			} else {
				multiplier = "100";
			}
			
			// create a container for the square footage total to live in: 
			// <div class="outputContainer">
			// <label>Square Footage Cost:</label>
			// <span class="costCalc">100 * 200</label>
			// <span class="costOutput">$20000</span>
			// </div>
			var squareFootOutput = document.createElement("div");
			squareFootOutput.className = "outputContainer";
			squareFootOutputLabel = document.createElement("label");
			squareFootOutputLabel.appendChild(document.createTextNode("Square Footage Cost: "));
			squareFootOutput.appendChild(squareFootOutputLabel);
			var squareFootOutputCalc = document.createElement("span");
			squareFootOutputCalc.className = "costCalc";
			squareFootOutputCalc.appendChild(document.createTextNode("$" + multiplier + " x " + house.getSquareFeet() + " ="));
			squareFootOutput.appendChild(squareFootOutputCalc);	
			var squareFootTotalContainer = document.createElement("span");
			squareFootTotalContainer.className = "costOutput";
			
			// calculate the cost based on the square footage
			var squareFootTotal = multiplier * house.getSquareFeet();
			squareFootTotalContainer.appendChild(document.createTextNode("$" + squareFootTotal));
			squareFootOutput.appendChild(squareFootTotalContainer);
			output.appendChild(squareFootOutput);
			
			// ----------------------------------- bedrooms Cost calculation --------------------------------------
			
			// create a container for the bedrooms total to live in:
			var bedroomsOutput = document.createElement("div");
			bedroomsOutput.className = "outputContainer";
			bedroomsOutputLabel = document.createElement("label");
			bedroomsOutputLabel.appendChild(document.createTextNode("Bedrooms Cost: "));
			bedroomsOutput.appendChild(bedroomsOutputLabel);
			var bedroomsOutputCalc = document.createElement("span");
			bedroomsOutputCalc.className = "costCalc";
			bedroomsOutputCalc.appendChild(document.createTextNode(house.getBedrooms() + " x $15000 = "));
			bedroomsOutput.appendChild(bedroomsOutputCalc);
			var bedroomsTotalContainer = document.createElement("span");
			bedroomsTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bedrooms
			var bedroomsTotal = house.getBedrooms() * 15000;
			bedroomsTotalContainer.appendChild(document.createTextNode("$" + bedroomsTotal));
			bedroomsOutput.appendChild(bedroomsTotalContainer);
			output.appendChild(bedroomsOutput);
			
			// ---------------------------------- bathroom cost calculation -----------------------------------------
			
			// create a container for the bathrooms total to live in:
			var bathroomsOutput = document.createElement("div");
			bathroomsOutput.className = "outputContainer";
			bathroomsOutputLabel = document.createElement("label");
			bathroomsOutputLabel.appendChild(document.createTextNode("Bathrooms Cost: "));
			bathroomsOutput.appendChild(bathroomsOutputLabel);
			var bathroomsOutputCalc = document.createElement("span");
			bathroomsOutputCalc.className = "costCalc";
			bathroomsOutputCalc.appendChild(document.createTextNode(house.getBathrooms() + " x $20000 = "));
			bathroomsOutput.appendChild(bathroomsOutputCalc);
			var bathroomsTotalContainer = document.createElement("span");
			bathroomsTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bathrooms
			var bathroomsTotal = house.getBathrooms() * 20000;
			bathroomsTotalContainer.appendChild(document.createTextNode("$" + bathroomsTotal));
			bathroomsOutput.appendChild(bathroomsTotalContainer);
			output.appendChild(bathroomsOutput);

			// ------------------------------- garage cost calculation ------------------------------------------------
			
			// create a container for the garage total to live in:
			var garageOutput = document.createElement("div");
			garageOutput.className = "outputContainer";
			garageOutputLabel = document.createElement("label");
			garageOutputLabel.appendChild(document.createTextNode("Garage Cost: "));
			garageOutput.appendChild(garageOutputLabel);
			var garageOutputCalc = document.createElement("span");
			garageOutputCalc.className = "costCalc";
			garageOutputCalc.appendChild(document.createTextNode(house.getGarageStalls() + " x $5000 = "));
			garageOutput.appendChild(garageOutputCalc);
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
			var totalOutput = document.createElement("div");
			totalOutput.className = "outputContainer";
			totalOutputLabel = document.createElement("label");
			totalOutputLabel.appendChild(document.createTextNode("Total: "));
			totalOutput.appendChild(totalOutputLabel);
			var totalOutputCalc = document.createElement("span");
			totalOutputCalc.className = "costCalc";
			totalOutputCalc.appendChild(document.createTextNode(""));
			totalOutput.appendChild(totalOutputCalc);
			var totalTotalContainer = document.createElement("span");
			totalTotalContainer.className = "costOutput";	
			totalTotalContainer.appendChild(document.createTextNode("$" + totalCost));
			totalOutput.appendChild(totalTotalContainer);
			output.appendChild(totalOutput);		
			
						
			// append the output to the wrapper
			document.getElementById("wrapper").appendChild(output);
			

		
		// if there is already output --> delete it and then reshow it with the new values	
		} else {
			var removeOutput = document.getElementById("output");
			removeOutput.parentNode.removeChild(removeOutput);
			
			// --------------------- go through and recalcate and reappend the output --------------------------
			
			// create an output div: <div id="output">Here is the calculation for the cost of your house:</div>
			var output = document.createElement("div");
			output.setAttribute("id", "output");
			output.appendChild(document.createTextNode("Here is the calculation for the cost of your house:"));
			
			// Create an new instance of the house Class named house and set its values
			var house = new House();
			house.setSquareFeet(squareFeet);
			house.setBedrooms(bedrooms);
			house.setBathrooms(bathrooms);
			house.setGarageStalls(garageStalls);
			
			
			// ---------------------------------------------- squareFootage cost -----------------------------------
			
			// calculation for squareFootage cost 
			if (document.getElementById("1").checked) {
				multiplier = "115";
			} else {
				multiplier = "100";
			}
			
			// create a container for the square footage total to live in: 
			// <div class="outputContainer">
			// <label>Square Footage Cost:</label>
			// <span class="costCalc">100 * 200</label>
			// <span class="costOutput">$20000</span>
			// </div>
			var squareFootOutput = document.createElement("div");
			squareFootOutput.className = "outputContainer";
			squareFootOutputLabel = document.createElement("label");
			squareFootOutputLabel.appendChild(document.createTextNode("Square Footage Cost: "));
			squareFootOutput.appendChild(squareFootOutputLabel);
			var squareFootOutputCalc = document.createElement("span");
			squareFootOutputCalc.className = "costCalc";
			squareFootOutputCalc.appendChild(document.createTextNode("$" + multiplier + " x " + house.getSquareFeet() + " ="));
			squareFootOutput.appendChild(squareFootOutputCalc);	
			var squareFootTotalContainer = document.createElement("span");
			squareFootTotalContainer.className = "costOutput";
			
			// calculate the cost based on the square footage
			var squareFootTotal = multiplier * house.getSquareFeet();
			squareFootTotalContainer.appendChild(document.createTextNode("$" + squareFootTotal));
			squareFootOutput.appendChild(squareFootTotalContainer);
			output.appendChild(squareFootOutput);
			
			// ----------------------------------- bedrooms Cost calculation --------------------------------------
			
			// create a container for the bedrooms total to live in:
			var bedroomsOutput = document.createElement("div");
			bedroomsOutput.className = "outputContainer";
			bedroomsOutputLabel = document.createElement("label");
			bedroomsOutputLabel.appendChild(document.createTextNode("Bedrooms Cost: "));
			bedroomsOutput.appendChild(bedroomsOutputLabel);
			var bedroomsOutputCalc = document.createElement("span");
			bedroomsOutputCalc.className = "costCalc";
			bedroomsOutputCalc.appendChild(document.createTextNode(house.getBedrooms() + " x $15000 = "));
			bedroomsOutput.appendChild(bedroomsOutputCalc);
			var bedroomsTotalContainer = document.createElement("span");
			bedroomsTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bedrooms
			var bedroomsTotal = house.getBedrooms() * 15000;
			bedroomsTotalContainer.appendChild(document.createTextNode("$" + bedroomsTotal));
			bedroomsOutput.appendChild(bedroomsTotalContainer);
			output.appendChild(bedroomsOutput);
			
			// ---------------------------------- bathroom cost calculation -----------------------------------------
			
			// create a container for the bathrooms total to live in:
			var bathroomsOutput = document.createElement("div");
			bathroomsOutput.className = "outputContainer";
			bathroomsOutputLabel = document.createElement("label");
			bathroomsOutputLabel.appendChild(document.createTextNode("Bathrooms Cost: "));
			bathroomsOutput.appendChild(bathroomsOutputLabel);
			var bathroomsOutputCalc = document.createElement("span");
			bathroomsOutputCalc.className = "costCalc";
			bathroomsOutputCalc.appendChild(document.createTextNode(house.getBathrooms() + " x $20000 = "));
			bathroomsOutput.appendChild(bathroomsOutputCalc);
			var bathroomsTotalContainer = document.createElement("span");
			bathroomsTotalContainer.className = "costOutput";
			
			// calculate the cost based on the number of bathrooms
			var bathroomsTotal = house.getBathrooms() * 20000;
			bathroomsTotalContainer.appendChild(document.createTextNode("$" + bathroomsTotal));
			bathroomsOutput.appendChild(bathroomsTotalContainer);
			output.appendChild(bathroomsOutput);

			// ------------------------------- garage cost calculation ------------------------------------------------
			
			// create a container for the garage total to live in:
			var garageOutput = document.createElement("div");
			garageOutput.className = "outputContainer";
			garageOutputLabel = document.createElement("label");
			garageOutputLabel.appendChild(document.createTextNode("Garage Cost: "));
			garageOutput.appendChild(garageOutputLabel);
			var garageOutputCalc = document.createElement("span");
			garageOutputCalc.className = "costCalc";
			garageOutputCalc.appendChild(document.createTextNode(house.getGarageStalls() + " x $5000 = "));
			garageOutput.appendChild(garageOutputCalc);
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
			var totalOutput = document.createElement("div");
			totalOutput.className = "outputContainer";
			totalOutputLabel = document.createElement("label");
			totalOutputLabel.appendChild(document.createTextNode("Total: "));
			totalOutput.appendChild(totalOutputLabel);
			var totalOutputCalc = document.createElement("span");
			totalOutputCalc.className = "costCalc";
			totalOutputCalc.appendChild(document.createTextNode(""));
			totalOutput.appendChild(totalOutputCalc);
			var totalTotalContainer = document.createElement("span");
			totalTotalContainer.className = "costOutput";	
			totalTotalContainer.appendChild(document.createTextNode("$" + totalCost));
			totalOutput.appendChild(totalTotalContainer);
			output.appendChild(totalOutput);		
			
						
			// append the output to the wrapper
			document.getElementById("wrapper").appendChild(output);
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

