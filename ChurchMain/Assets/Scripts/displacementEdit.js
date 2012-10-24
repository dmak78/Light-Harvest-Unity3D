


public var displaceAmount : float ;
public var osc_displaceAmount : String;
public var osc_displaceLow : float;
public var osc_displaceHigh : float = 1.0;
private var originalDisplace : float;
public var osc_oscOn : String;
public var oscOn : boolean;

public var osc_highChange: String;

function Start(){
	displaceAmount = renderer.material.GetFloat("_DisplacementScale");
	originalDisplace = displaceAmount;
}


function Update () {
	
//	if(!OSCMessageReceived){
//		displaceAmount = originalDisplace;
//	}
	
	if(oscOn){
		renderer.material.SetFloat( "_DisplacementScale", displaceAmount );
	}
	 
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_displaceAmount){
			displaceAmount = Map(message.Values[0],0,1,osc_displaceLow,osc_displaceHigh,true);
		}	
		
		if(message.Address == osc_highChange){
			osc_displaceHigh = Map(message.Values[0],0,1,0,-20,true);
		}	
		
		if(message.Address == osc_oscOn){
			if(message.Values[0] == 1.0 ){
				oscOn = !oscOn;
			}
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