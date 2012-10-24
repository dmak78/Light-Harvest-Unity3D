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
private var normals : Vector3[];
public var ampLerp : float;
public var osc_oscOn : String;
public var oscOn : boolean = false;

private var mesh : Mesh;


private var originalVertices : Vector3[];


function Start () {
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = mesh.vertices;


}

function Update () {
	
	ampLerp = Mathf.Clamp(ampLerp, 0 , 1);
	mesh = gameObject.GetComponent(MeshFilter).mesh;
if(oscOn){
	
	if(frequency>0 && speed>0 && amplitude>0 ){
		var modifiedVertices = originalVertices;
		normals = mesh.normals;
		
		for(var i = 0; i < modifiedVertices.Length; i++){
			var z = modifiedVertices[i].z;
			var offset : float = Mathf.Sin( (z * frequency) + (speed*Time.time) ) * amplitude;
			modifiedVertices[i].x =  normals[i].x * offset;
			mesh.vertices = modifiedVertices;
		}
		
	}
}

if(!oscOn){
	
}
	
		
	
}


function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_amplitude && oscOn){
			var tempAmp = Map(message.Values[0],0,1,osc_amplitudeLow,osc_amplitudeHigh,true);
			amplitude = Mathf.Lerp(amplitude, tempAmp, ampLerp);
		}	
		
		if(message.Address == osc_frequency && oscOn){
			var tempFreq = Map(message.Values[0],0,1,osc_frequencyLow,osc_frequencyHigh,true);
			frequency = Mathf.Lerp(frequency,tempFreq,ampLerp);
		}	
	
		if(message.Address == osc_speed && oscOn){
			speed = message.Values[0];
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