
private var mesh : Mesh;
private var normals : Vector3[];
private var originalNormals : Vector3[];
private var vertices : Vector3[];
var originalVertices : Vector3[];
public var expandAmount : float ;
private var finalExpanAmount : float;
public var osc_expandAmount : int;
public var oscLow_expandAmount : float = 0;
public var oscHigh_expandAmount : float = 1;
public var oscAddress : String;
public var osc_oscOn : String;
public var oscOn : boolean;
public var waveSpeed : float;
public var frequency : float;
public var animateAmount : boolean;
public var osc_address_animate : String;
public var osc_address_frequency : String;
public var osc_frequency_low : float = 0;
public var osc_frequency_high : float = 1;


function Start (){
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = mesh.vertices ;
	normals = mesh.normals;
	originalNormals = normals;
	finalExpanAmount = expandAmount;
}


function Update () {
	
//	if(osc_expandAmount !=0){
//		expandAmount = Map(oscIn.oscValuesOut[osc_expandAmount],0,1,oscLow_expandAmount,oscHigh_expandAmount,true);
//	}

	if(animateAmount){
		waveSpeed = Mathf.Sin(frequency*Time.time );
		finalExpandAmount = expandAmount*waveSpeed;

		var newScale : float = Map(Mathf.Abs(finalExpandAmount), 0, expandAmount,1,.3,true);
		transform.localScale = Vector3(newScale,newScale,newScale);
	}
	else{
		finalExpandAmount = expandAmount;
	}

	if(!OSCMessageReceived || !oscOn){
		//expandAmount = 0;
		finalExpandAmount=0;
	}
	
	if(oscOn){
		mesh = gameObject.GetComponent(MeshFilter).mesh;
		vertices = mesh.vertices;
		normals = mesh.normals;
	
		for(var i =  0 ; i < vertices.Length; i++){
			vertices[i] = originalVertices[i] + (normals[i]*finalExpandAmount);
		}
		mesh.vertices = vertices;
		mesh.RecalculateNormals();
		mesh.RecalculateBounds();	
	}
	else{
		mesh.vertices = originalVertices;	
		mesh.RecalculateNormals();
		mesh.RecalculateBounds();	
	}
	



	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){

		if(message.Address == oscAddress){
			var tempExpand = Map(message.Values[0],0,1,oscLow_expandAmount,oscHigh_expandAmount,true);
			expandAmount = Mathf.Lerp(expandAmount, tempExpand , .6);
		}
		if(message.Address == osc_address_animate){
			if(message.Values[0] == 1.0){
				animateAmount = !animateAmount;
			}
		}
		if(message.Address == osc_address_frequency){
			frequency = Map(message.Values[0],0,1,osc_frequency_low,osc_frequency_high,true);
		}		
		if(message.Address == osc_oscOn){
			if(message.Values[0] == 1.0){
				oscOn = !oscOn;
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