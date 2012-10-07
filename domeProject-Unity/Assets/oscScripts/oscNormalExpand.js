
private var mesh : Mesh;
private var normals : Vector3[];
private var originalNormals : Vector3[];
private var vertices : Vector3[];
private var originalVertices : Vector3[];
public var expandAmount : float ;
public var osc_expandAmount : int;
public var oscLow_expandAmount : float = 0;
public var oscHigh_expandAmount : float = 1;
public var oscAddress : String;
public var osc_oscOn : String;
public var oscOn : boolean;


function Start (){
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = mesh.vertices ;
	normals = mesh.normals;
	originalNormals = normals;
}


function Update () {
	
//	if(osc_expandAmount !=0){
//		expandAmount = Map(oscIn.oscValuesOut[osc_expandAmount],0,1,oscLow_expandAmount,oscHigh_expandAmount,true);
//	}

	if(!OSCMessageReceived || !oscOn){
		expandAmount = 0;
	}
	

	mesh = gameObject.GetComponent(MeshFilter).mesh;
	vertices = mesh.vertices;
	normals = mesh.normals;
	
	for(var i =  0 ; i < vertices.Length; i++){
		vertices[i] = originalVertices[i] + (normals[i]*expandAmount);
	}
	
	mesh.vertices = vertices;
	
	mesh.RecalculateNormals();
	mesh.RecalculateBounds();
	
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){

		if(message.Address == oscAddress){
			var tempExpand = Map(message.Values[0],0,1,oscLow_expandAmount,oscHigh_expandAmount,true);
			expandAmount = Mathf.Lerp(expandAmount, tempExpand , .6);
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