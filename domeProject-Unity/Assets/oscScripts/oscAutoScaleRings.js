
public var osc_scaleAmount : String;
public var osc_frequency : int = 0;
public var osc_scaleAmountLow : float;
public var osc_scaleAmountHigh : float = 1;
public var scaleAmount : float;

private var originalScale : Vector3;
private var originalScaleAmount : float;

public var lerpAmount : float;


function Start(){
	originalScale = transform.localScale;
	scaleAmount = originalScale.x;
	originalScaleAmount = scaleAmount;
	
	

}
function Update () {
	
	osc_frequency = Mathf.Clamp(osc_frequency, 0 , 256);
	
	lerpAmount = Mathf.Clamp(lerpAmount, 0, 1);

	if(!OSCMessageReceived){
	//	scaleAmount = originalScaleAmount;
	}
	
	var currentScale : Vector3 = transform.localScale;
	var newScale : Vector3 = Vector3(scaleAmount,scaleAmount,scaleAmount);
	var lerpedScale : Vector3 = Vector3.Lerp(currentScale,newScale,lerpAmount);
	transform.localScale = lerpedScale;
	

}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_scaleAmount){
			scaleAmount = Map(message.Values[osc_frequency],0,1,osc_scaleAmountLow,osc_scaleAmountHigh,true);
		}	

		
//	}


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