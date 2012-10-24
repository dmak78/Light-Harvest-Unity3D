public var scale : Vector3;
public var amplitude : float;
public var frequency : float;
private var counter : int;
private var originalScale : Vector3;

function Start () {
	originalScale = transform.localScale;
}
	
function Update () {
	amplitude = Mathf.Clamp(amplitude,0, 5);
	counter++;
	
	scale.x = Mathf.Clamp(scale.x, -2, 1);
	scale.y = Mathf.Clamp(scale.y, -2, 1);
	scale.z = Mathf.Clamp(scale.z, -2, 1.5);
	
	var newScale : Vector3 = Vector3(1,1,1);
	
	if(amplitude != 0){
		waveAmount = Mathf.Sin(counter/frequency)*amplitude;	
		waveAmount = Map(waveAmount, -1, 1, 0, 1, true);
	}
	else{
		waveAmount = 0;
	}
	
	
	
	newScale.x += scale.x*waveAmount;
	newScale.y += scale.y*waveAmount;
	newScale.z += scale.z*waveAmount;
		
	
		newScale.x = originalScale.x * newScale.x;
		newScale.y = originalScale.y * newScale.y;
		newScale.z = originalScale.z * newScale.z;
		


	transform.localScale = newScale;
	
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
