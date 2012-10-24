
public var amount : float = 1;
private var original_amount : float;
public var osc_amount : String;
public var osc_amountLow : float;
public var osc_amountHigh : float;
public var autoRotateOn : boolean = false;
public var osc_on: String;

function Start(){
	original_amount = amount;
}

function Update () {
	
	

	if(autoRotateOn){
		GetComponent(Transform).Rotate(Vector3.up * (Time.deltaTime*amount));
	}
	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);

		if(message.Address == osc_amount){
			amount = Map(message.Values[0],0,1,osc_amountLow,osc_amountHigh,true);
		
		}	
		if(message.Address == osc_on){
			if(message.Values[0] == 1 ){
				autoRotateOn = !autoRotateOn;
			}
		
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