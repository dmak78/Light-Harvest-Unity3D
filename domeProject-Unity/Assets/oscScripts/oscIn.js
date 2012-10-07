public var oscAddresses : String[];
public var oscValuesIn : float[];
private var prevOscValuesIn : float[];
static var oscValuesOut : float[];
private var prevOscValuesOut : float[];
public var oscScaling : Vector4[];


function Start(){
	oscValuesIn = new float[oscAddresses.Length];
	prevOscValuesIn = new float[oscAddresses.Length];
	oscValuesOut = new float[oscAddresses.Length];

//	for(var x = 0 ; x < oscValuesOut.Length; x++){
//		oscValuesOut[x] = oscScaling[x].w;
//	}


}

function Update () {
//	for(var c = 0 ; c < components.Length; c++){
//		components[c] = gameObject.GetComponent(getComponent[c]);
//		components[c].scaleAmount = testFloat;
//	}

	for(var i = 0 ; i < oscValuesIn.Length; i++){
		//oscValuesIn[i] = Mathf.Clamp(oscValuesIn[i],oscScaling[i].x,oscScaling[i].y);
		if(prevOscValuesIn[i] != oscValuesIn[i]){
					var oscValueTrans : float;
			oscValueTrans = Map(oscValuesIn[i],oscScaling[i].x,oscScaling[i].y,oscScaling[i].z,oscScaling[i].w,true);
			oscValuesOut[i] = oscValueTrans;
		}


		prevOscValuesIn[i] = oscValuesIn[i];
	}
	
	

}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == oscAddresses[m]){
			oscValuesIn[m] = message.Values[0];
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