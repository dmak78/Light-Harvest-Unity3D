public var fft_freq_angle : int;
public var fft_freq_intensity : int;
public var angleScale : float = 1 ;
public var intensityScale : float = 1;
public var angleAmount : float;
public var intensityAmount : float;

private var orgAngle : float;
private var orgIntensity : float;

function Start (){
	orgAngle = light.spotAngle;
	orgIntensity = light.intensity;
	
}
function Update () {
	angleAmount = oscFFTReceiver.ffts[fft_freq_angle] * angleScale;
	intensityAmount = oscFFTReceiver.ffts[fft_freq_intensity] * intensityScale;
	
	light.intensity = Mathf.Lerp(light.intensity ,orgIntensity*intensityAmount,.5);
	light.spotAngle = Mathf.Lerp(light.spotAngle ,orgAngle*angleAmount,.5);
	
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