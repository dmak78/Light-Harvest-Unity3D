//@script ExecuteInEditMode()





public var scaleFactor : Vector3;
public var uniScale : float;
private var prevUniScale : float;
public var osc_xScale : String;
public var oscLow_xScale : float;
public var oscHigh_xScale : float;



function Update () {
	

	
	uniScale = Mathf.Clamp(uniScale , 0 ,2);
	
	if(uniScale != prevUniScale){
		scaleFactor = Vector3(uniScale,uniScale,uniScale);
	}
	
	prevUniScale = uniScale;
	
	transform.localScale = scaleFactor;
	
	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_xScale){
			scaleFactor.x = Map(message.Values[0],0,1,oscLow_xScale,oscHigh_xScale,true);
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