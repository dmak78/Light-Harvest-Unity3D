public var frequency : float;
public var amplitude : float;
public var speed : float;

//public var oscControl_freq : int = 3;
//public var oscControl_amp : int = 4;
//public var oscControl_speed : int = 5;
//
//private var oscValue_freq : float;
//private var oscValue_amp : float;
//private var oscValue_speed : float;
//
//private var prevOsc_freq : float;
//private var prevOsc_amp : float;
//private var prevOsc_speed : float;

public var useOsc : boolean = false;

private var originalVertices : Vector3[];


function Start () {
	var originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = originalMesh.vertices;
	
	
//	oscValue_freq= OSCReceiver.messages[oscControl_freq];
//	oscValue_amp = OSCReceiver.messages[oscControl_amp];
//	oscValue_speed = OSCReceiver.messages[oscControl_speed];
//	
//	 prevOsc_freq = oscValue_freq;
//	prevOsc_amp = oscValue_amp;
//	prevOsc_speed = oscValue_speed;
}

function Update () {
	
//	oscValue_freq= OSCReceiver.messages[oscControl_freq];
//	oscValue_amp = OSCReceiver.messages[oscControl_amp];
//	oscValue_speed = OSCReceiver.messages[oscControl_speed];
//	
//	if(useOsc){
//		if(prevOsc_freq != oscValue_freq){
//			frequency = Map(oscValue_freq, 0, 1, -30, 30, true);	
//		}
//		prevOsc_freq = oscValue_freq;
//		
//		if(prevOsc_amp != oscValue_amp){
//			amplitude = Map(oscValue_amp, 0, 1, -30, 30, true);	
//		}
//		prevOsc_amp = oscValue_amp;
//		
//		if(prevOsc_speed != oscValue_speed){
//			speed = Map(oscValue_speed, 0, 1, -30, 30, true);	
//		}
//		prevOsc_speed = oscValue_speed;
//		
//	}

	
	
	var originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	var modifiedVertices = originalVertices;
	for(var i = 0; i < modifiedVertices.Length; i++){
		var y = modifiedVertices[i].y;
		var offset : float = Mathf.Sin( (y * (frequency*OSCReceiver.messages[10])) + ((speed*Time.time)*OSCReceiver.messages[10]) ) * (amplitude*OSCReceiver.messages[9]);
		modifiedVertices[i].z = offset;
	}
	
	originalMesh.vertices = modifiedVertices;
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