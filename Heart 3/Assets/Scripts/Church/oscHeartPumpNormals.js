

public var scale : Vector3;
public var amplitude : float=1;
public var frequency : float;
public var osc_frequency : String;
public var osc_frequencyLow : float;
public var osc_frequencyHigh : float;
public var oscOn : boolean = true; 
public var osc_oscOn : String;
private var counter : int;
private var originalScale : Vector3;
private var original_frequency : float;

function Start () {
	originalScale = transform.localScale;
	original_frequency = frequency;
	amplitude =1;
}
	
function Update () {
	
	var finalFrequency;
	
	if(frequency > 0 && frequency <= 10){
		finalFrequency=frequency;
	}
	else if(frequency > 10 && frequency <= 20){
		finalFrequency=19;
	}
	else if(frequency > 20 && frequency <= 30){
		finalFrequency=29;
	}
	else if(frequency > 30 && frequency <= 40){
		finalFrequency=39;
	}
	else if(frequency > 40 && frequency <= 50){
		finalFrequency=49;
	}
	else if(frequency > 50 && frequency <= 60){
		finalFrequency=60;
	}
	else{
		finalFrequency=0;
	}

	amplitude = Mathf.Clamp(amplitude,0, 5);
	
	
	if(!oscOn){
		frequency = 0;
	}
	//counter++;
	
	scale.x = Mathf.Clamp(scale.x, -10, 10);
	scale.y = Mathf.Clamp(scale.y, -2, 1);
	scale.z = Mathf.Clamp(scale.z, -2, 1.5);
	
	var newScale : Vector3 = Vector3(1,1,1);
	
	if(frequency != 0){
		waveAmount = Mathf.Sin(finalFrequency*Time.time)*amplitude;	
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
 

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_frequency){
			frequency = Map(message.Values[0],0,1,osc_frequencyLow,osc_frequencyHigh,true);
			//index = Map(message.Values[0],0,1,0,materials.Length-1,true);
		}	
		
		if(message.Address == osc_oscOn){
			if(message.Values[0] == 1.0 ){
				if(!oscOn){
					frequency=original_frequency;
					oscOn = true;
				}
				else{
					frequency=0;
					oscOn = false;
				}
				
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
