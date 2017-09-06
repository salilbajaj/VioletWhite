function tipReduce(x, y, z) {
  
var maxValue = (x > y)? x: y;
var minValue = (x < y)? x:y;
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
  
  return ((rememberValues[0] * maxValue) + (rememberValues[1]+1 * minValue)) -z;
    ];
  
}