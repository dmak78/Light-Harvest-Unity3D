public var amplitude : float;
public var frequency : float;
public var waveAmount : float;
private var originalPosition : Vector3;
public var engage : boolean = false;
public var flipIt : boolean = false;


function Awake () {
	originalPosition = transform.position;
}
	
function Update () {

	
	
		if(engage && amplitude != 0 && frequency!=0){

			waveAmount = Mathf.Sin(frequency*Time.time);	
			if(flipIt){
				waveAmount = 1 - Mathf.Abs(waveAmount);
			}
			else{
				waveAmount = Mathf.Abs(waveAmount);
			}
			
			
			var newPosition : Vector3 = Vector3(0,0,waveAmount*amplitude);
			transform.position = newPosition;
			
		}
		else{
			waveAmount = 0;
			transform.position = originalPosition;
		}
		
 }
 

function Map(value : float, inputMin : float, inputMax : float, outputMin : float, outputMax : float , clamp : boolean) : float 
{
	if (Mathf.Abs(inputMin - inputMax) < Mathf.Epsilon){
		//Debug.Log("Map: avoiding possible divide by zero, check inputMin and inputMax");
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);	
		if( clamp ){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}
