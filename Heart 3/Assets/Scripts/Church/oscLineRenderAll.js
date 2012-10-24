
var c1 : Color = Color.yellow;
var c2 : Color = Color.red;
private var targetMesh : Mesh;
private var vertices : Vector3[];
public var triangles : int[];
public var lineWidth : float = 3;
private var original_lineWidth : float;
public var osc_lineWidth: String;
public var osc_lineWidthLow : float = -1;
public var osc_lineWidthHigh: float = 1;
public var animateWidth : boolean;
public var flipWidth : boolean;
public var frequency : float;
public var waveSpeed : float;
public var hue1 : float;
private var prevHue1 : float;
public var hue2 : float;
private var prevHue2 : float;





public var resolution : int = 3;


function Awake() {
	
	original_lineWidth = lineWidth;
	
//	oscValue = OSCReceiver.messages[oscControl];
//	oscValue = Map(oscValue,0,1,-1,1, false);
	targetMesh = gameObject.GetComponent(MeshFilter).mesh;
	triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);
	lineRenderer.SetColors(c1, c2);
	

	lineRenderer.SetWidth(lineWidth,lineWidth);
	
   
    lineRenderer.SetVertexCount(triangles.length);
	//lineRenderer.useWorldSpace = true;
	for(var i  = 0; i < triangles.length; i+=3){
			if(i < triangles.length){
			lineRenderer.SetPosition(i, vertices[triangles[i]]);
    		lineRenderer.SetPosition(i+1, vertices[triangles[i+1]]);
    		lineRenderer.SetPosition(i+2, vertices[triangles[i+2]]);
			}

    	
	}
	
	var currHSB1 : HSBColor;
	var currHSB2 : HSBColor;
	currHSB1 = HSBColor.FromColor(c1);
	currHSB2 = HSBColor.FromColor(c2);
	hue1 = currHSB1.h;
	hue2 = currHSB2.h;
	prevHue1 = hue1;
	prevHue2 = hue2;
//	var oldHSB : HSBColor;
//	oldHSB = HSBColor(oldColor);	
//	oldHSB.h = hue;
//	renderer.material.SetColor("_TintColor", HSBColor.ToColor(oldHSB));



}

function Update() {
	
	hue1 = Mathf.Clamp(hue1,0,1);
	hue2 = Mathf.Clamp(hue2,0,1);
	
	if(hue1 != prevHue1){
		var currHSB1 : HSBColor;
		currHSB1 = HSBColor.FromColor(c1);
		currHSB1.h = hue1;
	 	c1 = HSBColor.ToColor(currHSB1);
	}
	prevHue1 = hue1;
	if(hue2 != prevHue2){
		var currHSB2 : HSBColor;
		currHSB2 = HSBColor.FromColor(c2);
		currHSB2.h = hue2;
	 	c2 = HSBColor.ToColor(currHSB2);
	}
	prevHue2 = hue2;
	
	
	
	if(!OSCMessageReceived){
		lineWidth=original_lineWidth;
	}
	
	resolution = Mathf.Clamp(resolution,3,(triangles.Length/3));
//	oscValue = OSCReceiver.messages[oscControl];
//	oscValue = Map(oscValue,0,1,-2,2, false);
	targetMesh = gameObject.GetComponent(MeshFilter).mesh;
		triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	var lineRenderer : LineRenderer = gameObject.GetComponent(LineRenderer);
	lineRenderer.SetColors(c1, c2);
   
	if(animateWidth){
		waveSpeed = Mathf.Sin(frequency*Time.time );
		if(flipWidth){
			lineRenderer.SetWidth(lineWidth*waveSpeed,lineWidth*waveSpeed);
		}
		else{
			lineRenderer.SetWidth(lineWidth*waveSpeed,-lineWidth*waveSpeed);
		}
		
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

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	//for(var m = 0; m < oscAddresses.Length; m++){
		if(message.Address == osc_lineWidth){
			lineWidth = Map(message.Values[0],0,1,osc_lineWidthLow,osc_lineWidthHigh,true);
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