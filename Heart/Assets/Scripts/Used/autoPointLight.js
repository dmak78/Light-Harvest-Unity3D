public var posx : float;
public var posz : float;
public var rotZ : float;
public var reset : boolean;

private var originalPosition : Transform;

public var oscControl_posx : int;
public var oscControl_posz : int;
public var oscControl_intense : int;
public var oscControl_range : int;

private var oscValue_posx : float;
private var oscValue_posz : float;
private var oscValue_intense : float;
private var oscValue_range : float;

private var prevOsc_posx : float;
private var prevOsc_posz : float;
private var prevOsc_intense : float;
private var prevOsc_range : float;

public var useOsc : boolean;


private var lightIntensity : float;
private var lightRange : float;


function Awake () {
	
	
	originalPosition = transform;
	

	oscValue_posx= OSCReceiver.messages[oscControl_posx];
	oscValue_posz = OSCReceiver.messages[oscControl_posz];
	oscValue_instense = OSCReceiver.messages[oscControl_intense];
	oscValue_range = OSCReceiver.messages[oscControl_range];
	
	prevOsc_posx = oscValue_posx;
	prevOsc_posz = oscValue_posz;
	prevOsc_intense = oscValue_intense;
	prevOsc_range = oscValue_range;

}

function Update () {
	
	lightIntensity = light.intensity;
	lightRange = light.range;
	
	oscValue_posx= OSCReceiver.messages[oscControl_posx];
	oscValue_posz = OSCReceiver.messages[oscControl_posz];
	oscValue_instense = OSCReceiver.messages[oscControl_intense];
	oscValue_range = OSCReceiver.messages[oscControl_range];
	
	if(useOsc){
		if(prevOsc_posx != oscValue_posx){
			posx = Map(oscValue_posx, 0, 1, -30, 30, true);	
		}
		prevOsc_posx = oscValue_posz;
		
		if(prevOsc_posz != oscValue_posz){
			posz = Map(oscValue_posz, 0, 1, -30, 30, true);	
		}
		prevOsc_posz = oscValue_posz;
		
		if(prevOsc_intense != oscValue_intense){
			lightIntensity = Map(oscValue_intense, 0, 1, 0, 8, true);	
		}
		prevOsc_intense = oscValue_intense;
		
		if(prevOsc_range != oscValue_range){
			lightRange = Map(oscValue_range, 0, 1, 0, 50, true);	
		}
		prevOsc_range = oscValue_range;
		
		
	}
	light.intensity = lightIntensity;
	light.range = lightRange;
	transform.position = Vector3(posx,0,posz);
	
	if(reset){
		transform.position = Vector3(0,0,0);
		lightIntensity = 1;
		light.intensity = lightIntensity;
		posx = 0;
		posz = 0;
		reset=false;
		lightRange = 15;
		light.range = 15;
		
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

