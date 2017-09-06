// 2 currencies x,y
// Bill -> z
// Minimize the tip 

function getGcd(a,b){								// returns Greatest common divisor of both the denomination
	while(a!=b){
		if(a>b)
		a -= b
		else
		b -=a
	}
	return a
}

function calTip(x,y,z){								// fxn to calculate minimum tip
	var tip,gcd=getGcd(x,y);
	if((z%x==0) || (z%y==0) || (z%(x + y)==0)){		// if bill is completely divisble by either of the denomination or by the sum of it
   		tip = 0;  
 	}else if(z>(x + y)){							// if bill is greater than sum of denominations and is not divisible by them
 	if(z%gcd==0 && z>x*y -x-y)									// if bill is divisible by gcd of both the denomination
 		tip=0;
 	else{
 		tip=tipReduce(x,y,z)							// if bill is not divisible by gcd of both the denomination. Tip will be difference of next divisible number and bill
 		}
 	} 
	else if((x + y) > z){   						// if bill is less than sum of denominations
		if(z<x && z<y){								
		var smallerCurrency=x;
			if(x>y)
			smallerCurrency=y;
			tip=smallerCurrency-z;
		} 
		else if(y > z){
	          tip = y-z;
	     }else if (x>z){
	          tip =  x-z;     
	     }
	      else{
	      tip=x+y-z;
		}
	}
	return tip;
}

function calTip(x, y, z) {
  
var maxValue = (x > y)? x: y;
var minValue = Math.min(x,y)
	var smallestPossible = 0;
	var rememberValues = [];
	var startPoint =  Math.floor(z / maxValue);

	for(var k = startPoint; k > -1; k-- ) {
	var result =  k * maxValue;
	var reminder =  z - result;
	var reminderDivision = reminder % minValue;
	var divisionWithMinValue = Math.floor(reminder/minValue);
	var calcDifference = z - (result + (divisionWithMinValue * minValue));
	if(calcDifference > smallestPossible) {
	    smallestPossible = calcDifference;
	  rememberValues = [k, divisionWithMinValue];
	  
	}
	if(reminderDivision === 0) {
	    return 0;               
	}
	}

	tip = ((rememberValues[0] * maxValue) + ((rememberValues[1]+1) * minValue)) -z;
	return tip;
  
}
var output = calTip(17,23,93);
console.log(output);
