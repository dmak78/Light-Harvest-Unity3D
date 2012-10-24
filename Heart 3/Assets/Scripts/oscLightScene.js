public var amount : float;
public var oscAmountLow : float;
public var oscAmountHigh : float;
public var rotateOn : boolean;

public var osc_address_amount : String;
public var osc_address_on : String;

public var intensity : float = 3.5;
public var oscIntensityLow : float = 0;
public var oscIntensityHigh : float = 10;
public var osc_address_intensity : String;
public var theLights : GameObject[];


function Start(){
	
}


function Update () {
	intensity = Mathf.Clamp(intensity, oscIntensityLow, oscIntensityHigh);
	for(var l = 0; l < theLights.length; l++){
		theLights[l].light.intensity = intensity;
	}
	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){

		if(message.Address == osc_address_amount){
			amount = Map(message.Values[0],0,1,oscAmountLow,oscAmountHigh,true);
		}
		if(message.Address == osc_address_intensity){
			intensity = Map(message.Values[0],0,1,oscIntensityLow,oscIntensityHigh,true);
		}		
		
//		if(message.Address == osc_address_on){
//			if(message.Values[0] == 1.0){
//				rotateOn = !rotateOn;
//			}
//		}	

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