public var frequency : float;
public var osc_frequency : String;
public var osc_frequencyLow : float;
public var osc_frequencyHigh : float = 1;

public var amplitude : float;
public var osc_amplitude : String;
public var osc_amplitudeLow : float;
public var osc_amplitudeHigh : float;
public var speed : float;
public var osc_speed : String;
public var osc_speed_low : float;
public var osc_speed_high: float;
private var normals : Vector3[];
public var ampLerp : float;
public var osc_oscOn : String;
public var oscOn : boolean;
private var prevOscOn : boolean;

private var previousSpeed : float;

var originalVertices : Vector3[];
var previousVertices : Vector3[];

var originalMesh : Mesh;


function Start () {
	originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = originalMesh.vertices;
	modifiedVertices = originalVertices;
	previousVertices = originalVertices;
	previousSpeed = speed;

}

function Update () {
	
	if(!oscOn){
		frequency=0;
	}
	if(oscOn && prevOscOn==false){
		frequency = 10;
	}
	
	prevOscOn = oscOn;
	
	ampLerp = Mathf.Clamp(ampLerp, 0 , 1);
	
	speed = Mathf.Lerp(previousSpeed, speed, ampLerp);
	
	previousSpeed = speed;

	if(frequency>0 && speed>0 && amplitude>0 && oscOn ){
		originalMesh = gameObject.GetComponent(MeshFilter).mesh;
		var modifiedVertices = originalVertices;
		normals = originalMesh.normals;
		for(var i = 0; i < modifiedVertices.Length; i++){
			var y = modifiedVertices[i].y;
			var offset : float = Mathf.Sin( (y * frequency) + (speed*Time.time) ) * amplitude;
			modifiedVertices[i].z =  normals[i].z * offset;
			modifiedVertices[i].z = Mathf.Lerp(previousVertices[i].z, modifiedVertices[i].z, ampLerp);
		}
	originalMesh.vertices = modifiedVertices;
	previousVertices = modifiedVertices;
		
	}
	
}


function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_amplitude){
			var tempAmp = Map(message.Values[0],0,1,osc_amplitudeLow,osc_amplitudeHigh,true);
			amplitude = Mathf.Lerp(amplitude, tempAmp, ampLerp);
		}	
		
		if(message.Address == osc_frequency){
			var tempFreq = Map(message.Values[0],0,1,osc_frequencyLow,osc_frequencyHigh,true);
			frequency = Mathf.Lerp(frequency,tempFreq,ampLerp);
		}	
	
		if(message.Address == osc_speed){
			speed = Map(message.Values[0],0,1,osc_speed_low,osc_speed_high,true);
		}
		
		if(message.Address == osc_oscOn){
			if(message.Values[0] == 1.0){
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