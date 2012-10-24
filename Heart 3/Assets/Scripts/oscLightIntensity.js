public var osc_address_intensity : String;
public var oscIntensityLow : float = 0;
public var oscIntensityHigh : float = 1;
public var intensity : float = .25;

function Awake(){
	gameObject.light.intensity = intensity;
}

function Start(){
	gameObject.light.intensity = intensity;
}
function Update () {
	intensity = Mathf.Clamp(intensity, oscIntensityLow,oscIntensityHigh);
	gameObject.light.intensity = intensity;
}


function OSCMessageReceived(message : OSC.NET.OSCMessage){


		if(message.Address == osc_address_intensity){
			intensity = Map(message.Values[0],0,1,oscIntensityLow,oscIntensityHigh,true);
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