public var inflateSpeed : float;
public var frequency : float;
public var osc_frequency : String;
public var osc_frequencyLow : float;
public var osc_frequencyHigh : float;
private var original_frequency : float;
public var amplitude : float;
private var original_amplitude : float;
public var osc_amplitude : String;
public var osc_amplitudeLow : float;
public var osc_amplitudeHigh : float;
public var osc_oscOn : String;
public var oscOn : boolean;
var originalVertices : Vector3[];
private var mesh : Mesh;



//function Start () {
//	var mesh : Mesh = GetComponent(MeshFilter).mesh;
//	originalVertices = mesh.vertices;
//}


function Awake () {
	mesh = GetComponent(MeshFilter).mesh;
	originalVertices = mesh.vertices;
	original_frequency = frequency;
	original_amplitude = amplitude;
	
}


function Update () {

	
	if(!oscOn){
		frequency = original_frequency;
		amplitude = original_amplitude;
	}
	if(frequency<.15){
		frequency = original_frequency;
		
	}
	if(amplitude<.15){
		amplitude = original_amplitude;
		
	}
	
	mesh  = GetComponent(MeshFilter).mesh;
	if(oscOn){

		var vertices : Vector3[] = mesh.vertices;
		var normals : Vector3[] = mesh.normals;
		var center : Vector3 = transform.position;
	
		for(var i = 0; i < vertices.Length; i++){
			//debug draw ray params start point, direction, color
		//	Debug.DrawRay(center+vertices[i], normals[i]*10, Color.blue);
			inflateSpeed = Mathf.Sin(frequency*Time.time ) ;
			inflateSpeed += Mathf.Sin(i + frequency* Time.time);
			//inflateSpeed = Mathf.Abs(inflateSpeed);
			vertices[i].x = normals[i].x*(inflateSpeed*(amplitude*5));
			vertices[i].x += originalVertices[i].x;
		
		}
		mesh.vertices = vertices;	
	}
	else{
		mesh.vertices = originalVertices;
	}



}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++)
		if(message.Address == osc_frequency && oscOn){
			var tempFreq = Map(message.Values[0],0,1,osc_frequencyLow,osc_frequencyHigh,true);
			frequency = Mathf.Lerp(frequency,tempFreq,.6);
		}	
		if(message.Address == osc_amplitude && oscOn){
			var tempAmp = Map(message.Values[0],0,1,osc_amplitudeLow,osc_amplitudeHigh,true);
			amplitude = Mathf.Lerp(amplitude,tempAmp,.6);
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