
var c1 : Color = Color.yellow;
var c2 : Color = Color.red;
private var targetMesh : Mesh;
private var vertices : Vector3[];
public var triangles : int[];
public var lineWidth : float = 3;
public var scale : float = 1;
public var numSubMesh : int;

public var oscControl : int;
private var oscValue : float;
private var prevOsc : float;
public var useOsc : boolean = false;

public var useWavy : boolean;

public var resolution : int = 3;


function Awake() {
	
//	oscValue = OSCReceiver.messages[oscControl];
//	oscValue = Map(oscValue,0,1,-1,1, false);
	targetMesh = gameObject.GetComponent(MeshFilter).mesh;
	triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);
	lineRenderer.SetColors(c1, c2);
	
	if(useOsc){
		lineRenderer.SetWidth(lineWidth*oscValue,lineWidth*oscValue);
		prevOsc = oscValue;
	}
	else{
		 lineRenderer.SetWidth(lineWidth,lineWidth);
	}
   
    lineRenderer.SetVertexCount(triangles.length);
	//lineRenderer.useWorldSpace = true;
	for(var i  = 0; i < triangles.length; i+=3){
			if(i < triangles.length){
			lineRenderer.SetPosition(i, vertices[triangles[i]]);
    		lineRenderer.SetPosition(i+1, vertices[triangles[i+1]]);
    		lineRenderer.SetPosition(i+2, vertices[triangles[i+2]]);
			}

    	
	}


}

function Update() {
	resolution = Mathf.Clamp(resolution,3,(triangles.Length/3));
//	oscValue = OSCReceiver.messages[oscControl];
//	oscValue = Map(oscValue,0,1,-2,2, false);
	targetMesh = gameObject.GetComponent(MeshFilter).mesh;
		triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);
	lineRenderer.SetColors(c1, c2);
   
   	if(useOsc){
		if(prevOsc != oscValue){
			lineRenderer.SetWidth(lineWidth*oscValue,lineWidth*oscValue);
		}
		prevOsc = oscValue;
	}
	else{
		 lineRenderer.SetWidth(lineWidth,lineWidth);
	}
    lineRenderer.SetVertexCount(triangles.length);
	//lineRenderer.useWorldSpace = true;
	
	for(var i  = 0; i < triangles.Length; i+=3){
			if(i < triangles.Length){
			lineRenderer.SetPosition(i, vertices[triangles[i]]);
    		lineRenderer.SetPosition(i+1, vertices[triangles[i+1]]);
    		lineRenderer.SetPosition(i+2, vertices[triangles[i+2]]);
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