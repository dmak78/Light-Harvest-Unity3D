public var targetMesh : Mesh;

public var lineWidth : float = 1;
public var widthAmplitude : float = 1;

private var indvNormals : Vector3[];
public var expandAmplitude : float = 1;

public var controlLineWidth : boolean = false;
public var controlNormals : boolean = false;
public var controlRotation : boolean = false;



public var c1 : Color = Color.yellow;
public var c2 : Color = Color.red;


public var aAmplitude : float = 0;
public var rAmplitude : float = 0;
public var gAmplitude : float = 0;
public var bAmplitude : float = 0;


private var vertices : Vector3[];
private var triangles : int[];

public var frequency : float = 0;
public var sineWave : float;
public var transitionColors : boolean = false;



public var rotationAmplitude : float = 1;


public var engage : boolean = false;
public var flipIt : boolean = false;

private var randoms : float[];
private var normals : Vector3[];







function Start() {
	if(!targetMesh){
		targetMesh = gameObject.GetComponent(MeshFilter).mesh;
	}
	
	randoms = new float[99];
	indvNormals = new Vector3[99];
	triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	normals = targetMesh.normals;
	
	var lineCounter : int = 0 ; 
	for(var i  = 0; i < triangles.length; i+=3){
		var newObject : GameObject;
		newObject = new GameObject("line" + lineCounter);
		indvNormals[lineCounter] = normals[triangles[i]];
		lineCounter++;
		//newObject.transform = gameObject.Find("Lines").transform;
		newObject.AddComponent(LineRenderer);
		var lineRenderer : LineRenderer = newObject.GetComponent(LineRenderer);
		lineRenderer.material = renderer.sharedMaterial;
		lineRenderer.SetColors(c1, c2);
    	lineRenderer.SetWidth(lineWidth,lineWidth);
    	lineRenderer.SetVertexCount(4);
    	lineRenderer.SetPosition(0, vertices[triangles[i]]);
    	lineRenderer.SetPosition(1, vertices[triangles[i+1]]);
    	lineRenderer.SetPosition(2, vertices[triangles[i+2]]);
    	lineRenderer.SetPosition(3, vertices[triangles[i]]);
    	lineRenderer.useWorldSpace = false;
		newObject.transform.parent=gameObject.transform;
		

		//newObjects[i].Push(newObject);
	}
	


}

function Update() {

	for(var r = 0 ; r < randoms.Length; r++){
		randoms[r] = Random.value;
	}
	
	var originalSineWave : float;
	
	if(frequency!=0){
		sineWave = Mathf.Sin(frequency * Time.time);
		if(flipIt){
			originalSineWave = 1 - Mathf.Abs(sineWave);
			sineWave = 1 - Mathf.Abs(sineWave);
			
		}
		else{
			originalSineWave = Mathf.Abs(sineWave);
			sineWave = Mathf.Abs(sineWave);
			
		}
	}
	else{
		sineWave=1;
		originalSineWave =1 ;
	}
	

	var objTrans : Component[];
	var objLines : Component[];
	var objRenderer : Component[];
	//var source : GameObject = GameObject.Find("_Lines");
	objTrans = gameObject.GetComponentsInChildren(Transform);
	objLines = gameObject.GetComponentsInChildren(LineRenderer);
		
	if(engage){		
		for (var trans : Transform in objTrans) {
			//trans.Rotate(Vector3(1,.2,2));
			if(controlRotation){
				trans.Rotate(Vector3(Random.Range(-sineWave*rotationAmplitude,sineWave*rotationAmplitude),Random.Range(-sineWave*rotationAmplitude,sineWave*rotationAmplitude),Random.Range(-sineWave*rotationAmplitude,sineWave*rotationAmplitude)));
				if(sineWave < 0.1){
					ResetRotations();
					}
			}
			else{
				ResetRotations();
			}
		}
		
		if(controlNormals){
			for(var n = 0; n < indvNormals.Length; n++){
				objTrans[n].position = indvNormals[n]*(sineWave*expandAmplitude);
			}
		}
		else{
			ResetPositions();	
		}

		
		for(var line : LineRenderer in objLines){
			if(controlLineWidth){
				line.SetWidth(lineWidth*-(sineWave*(widthAmplitude*5)),lineWidth*(sineWave*(widthAmplitude*5)));
			}
			else{
				line.SetWidth(lineWidth,lineWidth);
			}
	
			if(transitionColors){
				line.material = renderer.material;
				c1.a = sineWave*aAmplitude;
				c2.a = 1-sineWave*aAmplitude;
				c1.r = sineWave*rAmplitude;
				c2.r = 1-sineWave*rAmplitude;
				c1.g = sineWave*gAmplitude;
				c2.g = 1-sineWave*gAmplitude;
				c1.b = sineWave*bAmplitude;
				c2.b = 1-sineWave*bAmplitude;
				line.SetColors(c1, c2);
			}
			else{
				line.SetColors(c1, c2);
				line.material = renderer.material;
			}
			

		}
	
	}	
	else{
		ResetRotations();
		for(var line : LineRenderer in objLines){
			line.SetWidth(lineWidth,lineWidth);
			line.material = renderer.material;
			line.SetColors(c1, c2);
		}
	}
	
	if(rotationAmplitude<=0){
		ResetRotations();
	}

	
	
	
	
}


function ResetRotations(){
	var objTrans : Component[];
			//var objLines : LineRenderer[];
	var source : GameObject = GameObject.Find("_Lines");
	objTrans = source.GetComponentsInChildren(Transform);
	//objLines = source.GetComponentsInChildren(LineRenderer);
	
	for (var trans : Transform in objTrans) {
	//	trans.position = Vector3(0,0,0);
    	trans.rotation = Quaternion(0,0,0,-1);
    	
	}
}

function ResetPositions(){
	var objTrans : Component[];
			//var objLines : LineRenderer[];
	var source : GameObject = GameObject.Find("_Lines");
	objTrans = source.GetComponentsInChildren(Transform);
	//objLines = source.GetComponentsInChildren(LineRenderer);
	
	for (var trans : Transform in objTrans) {
		trans.position = Vector3(0,0,0);
    	//trans.rotation = Quaternion(0,0,0,-1);
    	
	}
}

