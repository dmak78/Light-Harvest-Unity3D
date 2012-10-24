public var scrollSpeed : float;
public var osc_address_speed : String;
public var osc_scroll_low : float;
public var osc_scroll_high : float;
public var oscOn : boolean;
public var osc_address_osc_on : String;
private var originalSpeed : float;
public var scrollNormals : boolean;
public var osc_address_scroll_normals : String;

function Start(){
	originalSpeed = scrollSpeed;
}

function Update () {
	if(!oscOn){
		scrollSpeed = 0;
	}
	scrollSpeed = Mathf.Clamp(scrollSpeed, osc_scroll_low,osc_scroll_high);
	var offset : float = Time.time * scrollSpeed;
	
	if(renderer.material.HasProperty("_BumpMap") && scrollNormals){
		renderer.material.SetTextureOffset ("_BumpMap", Vector2(0,offset));
	}
	if(renderer.material.HasProperty("_MainTex")){
		renderer.material.SetTextureOffset ("_MainTex", Vector2(0,offset));
	}
    
    
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
		if(message.Address == osc_address_speed && oscOn){
			scrollSpeed= Map(message.Values[0],0,1,osc_scroll_low,osc_scroll_high,true);
		}	
		
		if(message.Address == osc_address_scroll_normals && oscOn){
			if(message.Values[0] == 1.0){
				scrollNormals = !scrollNormals;
			}
		}
		
		if(message.Address == osc_address_osc_on){
			if(message.Values[0] == 1.0){
				oscOn = !oscOn;
				scrollSpeed = originalSpeed;
			}
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