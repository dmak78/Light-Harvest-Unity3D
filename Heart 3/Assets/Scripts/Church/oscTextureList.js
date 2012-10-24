var textures : Texture2D[]; 
private var prevIndex : int;
var changeInterval = 0.33; 
public var index : int;
public var osc_index : String;
public var oscOn : boolean = true; 
public var osc_oscOn : String;

public var osc_address_inc : String;
public var osc_address_dec : String;



function Start(){
	if(oscOn){
	if(renderer.material.HasProperty("_MainTex")){
		renderer.material.SetTexture("_MainTex", textures[index]);
	}
		
	}

}


function Update () { 

//	if(!OSCMessageReceived){
//		index = 0;	
//	}
	
	index = Mathf.Clamp(index, 0 , textures.Length-1);
	
	if(prevIndex != index && oscOn){
		if(renderer.material.HasProperty("_MainTex")){	
   		 renderer.material.SetTexture("_MainTex", textures[index]);
		}
	}
	
	 prevIndex = index;
	

    // we want this material index now 

    
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_index){
			if(message.Values[0]==1.0 && oscOn){
				index++;
				if(index==textures.Length){
					index=0;
				}
			}
			index = Map(message.Values[0],0,1,0,textures.Length-1,true);
		}	
		
		if(message.Address == osc_oscOn){
			if(message.Values[0] == 1.0 ){
				oscOn = !oscOn;
			}
		}
		
		if(message.Address == osc_address_inc){
			index++;
		}
		if(message.Address == osc_address_dec){
			index--;
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