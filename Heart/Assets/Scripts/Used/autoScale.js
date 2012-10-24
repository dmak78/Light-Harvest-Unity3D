
public var scaleAmount : float = 1;
private var originalScale : Vector3;
public var oscControl : int;
private var oscScale : float;
private var prevScale : float;
public var useOsc : boolean;
public var prev : float;



function Start(){
	originalScale = transform.localScale;
	scaleAmount = originalScale.x;
	oscScale = OSCReceiver.messages[oscControl];
	prevScale=oscScale;
	prev = scaleAmount;
}
function Update () {
	
	oscScale = OSCReceiver.messages[oscControl];
	
	if(prevScale != oscScale){
		transform.localScale = Vector3(oscScale,oscScale,oscScale);
		prevScale = oscScale;
	}
	else{	
		if(scaleAmount != prev){
			scaleAmount = Mathf.Clamp(scaleAmount, 0 , 1);
			transform.localScale = (Vector3(scaleAmount,scaleAmount,scaleAmount));
		}
		prev=scaleAmount;
		
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