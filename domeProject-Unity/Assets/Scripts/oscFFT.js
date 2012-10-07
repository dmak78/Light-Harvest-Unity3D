
public var osc_address : String;
public var scaleAmount : float;


//public var curffts : float[];

private var lineRenderer : LineRenderer;

public var lineWidth : float;

public var c1 : Color = Color.yellow;
public var c2 : Color = Color.red;

public var counter : int;

private var prevffts : float [];

public var testfft : float ;

function Start(){

	
	prevffts = new float[257];
	
		var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);

	lineRenderer.SetWidth(lineWidth,lineWidth);
	lineRenderer.SetColors(c1, c2);
   
    lineRenderer.SetVertexCount(256);
	//lineRenderer.useWorldSpace = true;

	for(var f  = 0; f < oscFFTReceiver.ffts.length-2;f++){
			
//			lineRenderer.SetPosition(f, Vector3((f*100),(ffts[f])*scaleAmount,0));
//    		lineRenderer.SetPosition(f+1, Vector3((f+1*100),(ffts[f+1])*scaleAmount,0));

			//var curfft1 = Mathf.Lerp(prevffts[f+counter],oscFFTReceiver.ffts[f+counter],.5);
		//	var curfft2 = Mathf.Lerp(prevffts[f+counter+1],oscFFTReceiver.ffts[f+1+counter],.5);
			//var curfft1 = Mathf.Lerp(prevffts[f],oscFFTReceiver.ffts[f],.5*Time.deltaTime);
		//	var curfft2 = Mathf.Lerp(prevffts[f+1],oscFFTReceiver.ffts[f+1],.5*Time.deltaTime);
		
			var curfft1 : float = oscFFTReceiver.ffts[f];
			var curfft2 : float = oscFFTReceiver.ffts[f+1];
    		
    		
    		lineRenderer.SetPosition(f, Vector3(f,curfft1*scaleAmount,0));
    		lineRenderer.SetPosition(f+1, Vector3(f+1,curfft2*scaleAmount,0));
  
	}
	
	//prevffts = oscFFTReceiver.ffts;
	
	
}
function Update () {
	

	
	var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);

	lineRenderer.SetWidth(lineWidth,lineWidth);
	lineRenderer.SetColors(c1, c2);
   
	for(var f  = 0; f < oscFFTReceiver.ffts.length-2;f++){
			
//			lineRenderer.SetPosition(f, Vector3((f*100),(ffts[f])*scaleAmount,0));
//    		lineRenderer.SetPosition(f+1, Vector3((f+1*100),(ffts[f+1])*scaleAmount,0));

			//var curfft1 = Mathf.Lerp(prevffts[f+counter],oscFFTReceiver.ffts[f+counter],.01);
			//var curfft2 = Mathf.Lerp(prevffts[f+counter+1],oscFFTReceiver.ffts[f+1+counter],.01);
    		
			var curfft1 : float = Mathf.Lerp(prevffts[f],oscFFTReceiver.ffts[f],.6);
			var curfft2 : float = Mathf.Lerp(prevffts[f+1],oscFFTReceiver.ffts[f+1],.6);
			
			prevffts[f] = curfft1;
			prevffts[f+1]= curfft2;
			
			curfft1 *= scaleAmount;
			curfft2 *= scaleAmount;
			
		//	curfft1 = Mathf.Clamp(curfft1,0,.5);
		//	curfft12 = Mathf.Clamp(curfft2,0,.5);
    		
    		//if(f+1<257){
    		lineRenderer.SetPosition(f, Vector3(f,curfft1,0));
    		lineRenderer.SetPosition(f+1, Vector3(f+1,curfft2,0));	
    		//}		
			

	
    	
	}

}


//
//function OSCMessageReceived(message : OSC.NET.OSCMessage){
//	//Debug.Log("I got a message! " + message.Values[0]);
//	
//	//for(var m = 0; m < oscAddresses.Length; m++){
//		if(message.Address == osc_address){
//			for(var i = 0 ; i < message.Values.Count; i++){
//				ffts[i] = message.Values[i];
//				
//			}
//		}
//
//
//}

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