public var scale : Vector3;
public var scaleAmount : float = 1;
private var memoryScale : Vector3;
private var counter : int;
public var frequency : float;
private var originalScale : Vector3;
public var amplitude : float = 0;
private var meshPump : Mesh;
private var inVertices : Vector3[];
private var orgVertices : Vector3[];
public var waveAmount : float;

function Start () {
 	meshPump = gameObject.GetComponent(MeshFilter).mesh;
	orgVertices = meshPump.vertices;
}
	
function Update () {
	amplitude = Mathf.Clamp(amplitude,0, 5);
	counter++;
	
	meshPump = gameObject.GetComponent(MeshFilter).mesh;
	inVertices = meshPump.vertices;
	
	if(amplitude != 0){
		waveAmount = Mathf.Sin(counter/frequency)*amplitude;	
		waveAmount = Map(waveAmount, -1, 1, 0, 1, true);
	}
	else{
		waveAmount = 0;
	}
	
	var newScale : Vector3 = Vector3(1,1,1);
	
	newScale.x += scale.x*waveAmount;
	newScale.y += scale.y*waveAmount;
	newScale.z += scale.z*waveAmount;
		
	for(var i = 0; i < inVertices.length; i++){
		inVertices[i].x = orgVertices[i].x * newScale.x;
		inVertices[i].y = orgVertices[i].y * newScale.y;
		inVertices[i].z = orgVertices[i].z * newScale.z;


	}
	
	meshPump.vertices = inVertices;
	
	if(Input.GetKey("1")){
 	}
 	if(Input.GetKey("2")){
	 }
	 if(Input.GetKey("3")){	  
	 }
	 
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
