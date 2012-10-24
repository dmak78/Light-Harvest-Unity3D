public var scale : Vector3;
public var amplitude : float;

private var finalAmp : float;
private var finalFreq : float;
public var frequency : float;
private var counter : int;
private var originalScale : Vector3;

private var oscControl_amplitude : int = 6;
private var oscControl_frequency : int = 7;
private var oscValue_amplitude : float;
private var oscValue_frequency : float;
private var prevOsc_amplitude : float;
private var prevOsc_frequency : float;

private var oscControl_xy : int = 9;
private var oscControl_z : int = 10;
private var oscValue_xy : float;
private var oscValue_z : float;
private var prevOsc_xy : float;
private var prevOsc_z : float;

private var useOsc : boolean = true;



function Awake () {
	originalScale = transform.localScale;
	
//	oscValue_amplitude = OSCReceiver.messages[oscControl_amplitude];
//	oscValue_frequency = OSCReceiver.messages[oscControl_frequency];
//	oscValue_xy = OSCReceiver.messages[oscControl_xy];
//	oscValue_z = OSCReceiver.messages[oscControl_z];
//	prevOsc_xy = oscValue_xy;
//	prevOsc_z = oscValue_z;
//	prevOsc_amplitude =oscValue_amplitude;
//	prevOsc_frequency = oscValue_frequency;
//	finalFreq = frequency;
}
	
function Update () {
	
//	
//		oscValue_amplitude = OSCReceiver.messages[oscControl_amplitude];
//		oscValue_frequency = OSCReceiver.messages[oscControl_frequency];
//		oscValue_xy = OSCReceiver.messages[oscControl_xy];
//		oscValue_z = OSCReceiver.messages[oscControl_z];
//		
//		if(useOsc){
//			if(prevOsc_amplitude !=oscValue_amplitude){
//				amplitude = Map(oscValue_amplitude, 0 , 1, 0, 2, true);
//				prevOsc_amplitude =oscValue_amplitude;
//			}
//			if(prevOsc_frequency != oscValue_frequency){
//				finalFreq = frequency * oscValue_frequency;
//				prevOsc_frequency = oscValue_frequency;
//			}
//			else{
//				finalFreq=frequency;
//			}
//			if(prevOsc_xy !=oscValue_xy){
//				scale.x = Map(oscValue_xy, 0 , 1,-1, 0, true);
//				scale.y = Map(oscValue_xy, 0 , 1, -1, 0, true);
//				prevOsc_xy =oscValue_xy;
//			}
//			if(prevOsc_z !=oscValue_xy){
//				scale.z = Map(oscValue_z, 0 , 1, -200, 1.5, true);
//				prevOsc_z =oscValue_z;
//			}
//		}
//	
				
	counter++;
	amplitude = Mathf.Clamp(amplitude,0, 5);

	scale.x = Mathf.Clamp(scale.x, -2, 1);
	scale.y = Mathf.Clamp(scale.y, -2, 1);
//	scale.z = Mathf.Clamp(scale.z, -20, 1.5);
	
	var newScale : Vector3 = Vector3(1,1,1);
	
	amplitude = Map(OSCReceiver.messages[8],0,1,0,2,true);
	
	if(amplitude != 0){
		waveAmount = Mathf.Sin(counter/(frequency*amplitude));	
		waveAmount = Map(waveAmount, -1, 1, 0, 1, true);
		newScale.x += scale.x*waveAmount;
		newScale.y += scale.y*waveAmount;
		newScale.z += scale.z*waveAmount;
		
	
		newScale.x = originalScale.x * (newScale.x*OSCReceiver.messages[5]);
		newScale.y = originalScale.y * (newScale.y*OSCReceiver.messages[5]);
		newScale.z = originalScale.z * (newScale.z*OSCReceiver.messages[6]);
		
		
		
		transform.localScale = newScale;
	}
	else{
		waveAmount = 0;
		//transform.localScale = originalScale;
	}
	
	
	
			


	
	
//	
//	meshPump.vertices = inVertices;
//	
//	if(Input.GetKey("1")){
// 	}
// 	if(Input.GetKey("2")){
//	 }
//	 if(Input.GetKey("3")){	  
//	 }
	 
	//scale = (Mathf.Sin(counter*frequency)+1)/2;
	//memoryScale=scale;
	
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
