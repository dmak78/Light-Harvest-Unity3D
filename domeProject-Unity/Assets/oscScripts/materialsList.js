var materials : Material[]; 
private var prevIndex : int;
var changeInterval = 0.33; 
public var index : int = 0;

public var osc_index : String;
public var oscOn : boolean = true; 
public var osc_oscOn : String;

public var activate : boolean = false;


function Start(){
	renderer.sharedMaterial = materials[index];
	prevIndex = index;
}


function Update () { 
	
	if(Input.GetKey(KeyCode.T)){
		activate = !activate;
	}
	
	if(activate){
		oscOn=true;
	}else{
		oscOn=false;
		index=2;
	}

	//if(!OSCMessageReceived){
	//	index = 0;	
	//}
	
	
	
	if(Time.deltaTime > changeInterval){
		index++;
	}
	
	index = Mathf.Clamp(index, 0 , materials.Length-1);
	
	if(prevIndex != index){
   		 renderer.sharedMaterial = materials[index];
   		// renderer.material.Lerp(materials[index],materials[prevIndex],.2);
   		 prevIndex = index;
	}
	
	
	

    // we want this material index now 

    
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_index){
			if(message.Values[0]==1.0 && oscOn){
				index++;
				if(index==materials.Length){
					index=0;
				}
			}
			//index = Map(message.Values[0],0,1,0,materials.Length-1,true);
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