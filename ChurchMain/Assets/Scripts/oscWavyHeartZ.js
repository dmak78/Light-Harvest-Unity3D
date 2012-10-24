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
public var oscOn : boolean;



private var originalVertices : Vector3[];


function Start () {
	var originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = originalMesh.vertices;
	modifiedVertices = originalVertices;

}

function Update () {
	
	ampLerp = Mathf.Clamp(ampLerp, 0 , 1);
	
	if(frequency>0 && speed>0 && amplitude>0 && oscOn ){
		var originalMesh = gameObject.GetComponent(MeshFilter).mesh;
		var modifiedVertices = originalVertices;
		normals = originalMesh.normals;
		for(var i = 0; i < modifiedVertices.Length; i++){
		var x = modifiedVertices[i].x;
		var offset : float = Mathf.Sin( (x * frequency) + (speed*Time.time) ) * amplitude;
		modifiedVertices[i].z =  normals[i].z * offset;
	}
	
	originalMesh.vertices = modifiedVertices;
		
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