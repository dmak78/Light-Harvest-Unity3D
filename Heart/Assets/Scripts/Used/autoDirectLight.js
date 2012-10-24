public var rotX : float;
public var rotY : float;
public var rotZ : float;
public var reset : boolean;
public var autoIntense : boolean;
private var originalRotation : Transform;

public var oscControl_rotx : int;
public var oscControl_roty : int;
public var oscControl_intense : int;

private var oscValue_rotx : float;
private var oscValue_roty : float;
private var oscValue_intense : float;

private var prevOsc_rotx : float;
private var prevOsc_roty : float;
private var prevOsc_intense : float;

public var useOsc : boolean;


private var lightIntensity : float;
private var orgLightIntensity : float;

private var prevIntense : float;

function Awake () {
	originalRotation = transform;
	

	oscValue_rotx= OSCReceiver.messages[oscControl_rotx];
	oscValue_roty = OSCReceiver.messages[oscControl_roty];
	oscValue_intense = OSCReceiver.messages[oscControl_intense];
	
	prevOsc_rotx = oscValue_rotx;
	prevOsc_roty = oscValue_roty;
	prevOsc_intense = oscValue_intense;

}

function Update () {
	
	lightIntensity = light.intensity;
	
	oscValue_rotx= OSCReceiver.messages[oscControl_rotx];
	oscValue_roty = OSCReceiver.messages[oscControl_roty];
	oscValue_intense = OSCReceiver.messages[oscControl_intense];
	
	if(useOsc){
		if(prevOsc_rotx != oscValue_rotx){
			rotX = Map(oscValue_rotx, 0, 1, -30, 30, true);	
		}
		prevOsc_rotx = oscValue_roty;
		
		if(prevOsc_roty != oscValue_roty){
			rotY = Map(oscValue_roty, 0, 1, -30, 30, true);	
		}
		prevOsc_roty = oscValue_roty;
		
		if(prevOsc_intense != oscValue_intense){
			lightIntensity = Map(oscValue_intense, 0, 1, 0, 8, true);	
		}
		prevOsc_intense = oscValue_intense;
		
		light.intensity = lightIntensity;
	}
	
	transform.Rotate(Vector3(rotX,rotY,rotZ));
	
	if(reset){
		transform.rotation = Quaternion(0,180,0,-1);
		rotX=0;
		rotY=0;
		rotZ=0;
		reset=false;
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

