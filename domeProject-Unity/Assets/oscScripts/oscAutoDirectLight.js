public var oscAddIntensity : String;
public var osc_lightItensityLow : float;
public var osc_lightItensityHigh : float = 1;
public var oscAddRotX : String;
public var oscAddRotY : String;
public var oscAddRotZ: String;
public var oscAddLightR : String;
public var oscAddLightG : String;
public var oscAddLightB : String;
public var rotX : float;
public var rotXLow : float;
public var rotXHigh : float;
public var rotY : float;
public var rotYLow : float;
public var rotYHigh : float;
public var rotZ : float;
public var rotZLow : float;
public var rotZHigh : float;
public var reset : boolean;
public var rotate : boolean;
private var originalRotation : Transform;
private var lightColor : Color;
public var lightR : float;
public var lightG : float;
public var lightB : float;
public var lightA : float;


private var lightIntensity : float;

private var originalIntensity : float;




function Awake () {
	originalRotation = transform;
	lightR=light.color.r;
	lightG=light.color.g;
	lightB=light.color.b;
	lightA=light.color.a;
	originalIntensity =light.intensity;

}

function Update () {
		
	if(!OSCMessageReceived){
		lightIntensity = originalIntensity;
	}
		
	
	if(rotate){
		transform.Rotate(Vector3(rotX,rotY,rotZ));
	}
	else{
		transform.rotation = Quaternion(0,0,0,-1);

	}
	
	if(reset){
		transform.rotation = Quaternion(0,0,0,-1);
		rotX=0;
		rotY=0;
		rotZ=0;
		reset=false;
	}
	
	light.color = Color(lightR,lightG,lightB ,lightA);
	
	light.intensity = lightIntensity;

	
	
	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == oscAddRotX){
			rotX = Map(message.Values[0],0,1,rotXLow,rotXHigh,true);
		}	
		
		if(message.Address == oscAddRotY){
			rotY= Map(message.Values[0],0,1,rotYLow,rotYHigh,true);
		}	
		
		if(message.Address == oscAddRotZ){
			rotZ= Map(message.Values[0],0,1,rotZLow,rotZHigh,true);
		}
		if(message.Address == oscAddLightR){
			lightR= Map(message.Values[0],0,1,1,0,true);
		}	
		if(message.Address == oscAddLightG){
			lightG= Map(message.Values[0],0,1,1,0,true);
		}	
		if(message.Address == oscAddLightB){
			lightB= Map(message.Values[0],0,1,1,0,true);
		}	
		if(message.Address == oscAddLightB){
			lightIntensity= Map(message.Values[0],0,1,osc_lightItensityLow,osc_lightItensityHigh,true);
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

