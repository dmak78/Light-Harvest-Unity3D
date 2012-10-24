public var objects : GameObject[];


public var osc_objects : String[];
public var osc_objectsOn : boolean[];



function Start() {
	for(var o = 0 ; o < osc_objectsOn.Length; o++){
			if(osc_objectsOn[o] == true){
				objects[o].active = true;
			}
			else{
				objects[o].active = false;
			}
	}
}


function Update () {
	
	
	for(var o = 0 ; o < objects.Length; o++){
			if(osc_objectsOn[o] == true){
				objects[o].active = true;
			}
			else{
				objects[o].active = false;
			}
	}


	
}


function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	for(var m = 0; m < osc_objects.Length; m++){
	
		if(message.Address == osc_objects[m]){
			if(message.Values[0] == 1.0){
				osc_objectsOn[m] = !osc_objectsOn[m];
			}
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