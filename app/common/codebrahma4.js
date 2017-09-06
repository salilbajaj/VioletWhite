// 2 currencies x,y
// Bill -> z
// Minimize the tip 

function calTip(x, y, z) {         // fxn to calculate tip
	var maxVal = Math.max(x,y);
	var minVal = Math.min(x,y);
	var smallestVal = 0;
	var rememberValues = [];
	var startPoint =  Math.floor(z / maxVal);	
	for(var k = startPoint; k > -1; k-- ) {
	var result =  k * maxVal;
	var remainder =  z - result;
	var remainderDivision = remainder % minVal;
	var divisionWithMinValue = Math.floor(remainder/minVal);
	var calcDifference = z - (result + (divisionWithMinValue * minVal));
	if(calcDifference > smallestPossible) {
	    smallestPossible = calcDifference;
	  rememberValues = [k, divisionWithMinValue];	  
	}
	if(remainderDivision === 0) {
	    return 0;               
	}
}

	tip = ((rememberValues[0] * maxVal) + ((rememberValues[1]+1) * minVal)) -z;
	return tip;
  
}
var output = calTip(17,23,93);
console.log(output);
