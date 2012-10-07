
public var osc_address : String;
public var scaleAmount : float;
static var ffts : float[];
static var averageFFT : float;


function Start(){

	
	ffts = new float[257];
	
	
}
function Update () {
	

}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		var ave : float ;
		if(message.Address == osc_address){
			for(var i = 0 ; i < message.Values.Count; i++){
				ffts[i] = message.Values[i];
				ave+=ffts[i];
			}
			averageFFT=ave/257;
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