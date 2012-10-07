public var scaleAmount : float = 1;
private var originalScale : Vector3;
private var oscControl : int = 11;
private var oscScale : float;
private var prevOsc : float;
private var prevScale: float;
private var useOsc : boolean = true;


function Start(){
	originalScale = transform.localScale;
	scaleAmount = originalScale.x;
	oscScale = OSCReceiver.messages[oscControl];
	prevOsc = oscScale;
	prevScale = scaleAmount;
}
function Update () {
	
	oscScale = OSCReceiver.messages[oscControl];
	oscScale = Map(oscScale, 0 , 1 ,-300, 0, true);
	
	if(useOsc){
		if(prevOsc!= oscScale){
			transform.localScale = Vector3(1,1,oscScale);		
		}
		prevOsc = oscScale;
	}
	else{	
	//	if(scaleAmount != prevScale){
				//scaleAmount = Mathf.Clamp(scaleAmount, 0 , 1);

			transform.localScale = Vector3(1,1,scaleAmount);
	//}
		
	//	prevScale = scaleAmount;
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