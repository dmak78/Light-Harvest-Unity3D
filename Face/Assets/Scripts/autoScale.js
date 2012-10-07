
public var scaleAmount : float = 1;
private var originalScale : Vector3;
public var sineWave : float;
public var frequency : float;

function Start(){
	originalScale = transform.localScale;
	scaleAmount = originalScale.x;
	//oscScale = OSCReceiver.messages[oscControl];
	//prevScale=oscScale;

}
function Update () {
//	
////	if(OSCReceiver.messages[0]){
////		sineWave = -OSCReceiver.messages[0];
////	}
//	else if(frequency!=0){
//		sineWave = Mathf.Sin(Time.time * frequency);
//		sineWave = Mathf.Abs(sineWave);
//	}
//	else{
//		sineWave=1;
//	}
	
	scaleAmount = Mathf.Clamp(scaleAmount, 0 , 1);
	sineWave = Mathf.Clamp(sineWave, 0 , 1 );

	transform.localScale = (Vector3(scaleAmount,scaleAmount,scaleAmount))*sineWave;

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