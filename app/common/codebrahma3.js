


function calBill(curr1,curr2,bill){




var gcd, tip=0;
var x=curr1;
var y=curr2;
while(x!=y)
{
    if(x > y)
        x -= y;
    else
        y -= x;
}
gcd=x;

 if((bill%curr1==0) || (bill%curr2==0) || (bill%(curr1 + curr2)==0)){
   tip = 0;  
 } else if(bill>(curr1 + curr2) ) {
 	if(bill%gcd==0 && gcd !=1){
 		tip=0
 	}else if(bill%gcd==0 && gcd ==1){
 		tip=bill%gcd
 	}
   
 } 
 else if((curr1 + curr2) > bill){
if(bill<curr1 && bill<curr2)
{
var smCurr=curr1;
if(curr1>curr2)
smCurr=curr2
tip=smCurr-bill
}
     
else if(curr2 > bill){
          tip = curr2-bill;
     }else if (curr1>bill){
          tip =  curr1-bill;     
     }
      else{
      tip=curr1+curr2-bill;
	}
 }
 console.log(tip)
 
}