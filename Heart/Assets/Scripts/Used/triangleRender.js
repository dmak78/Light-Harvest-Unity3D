
public var targetMesh : Mesh;
public var material : Material;
private var vertices : Vector3[];
private var triangles : int[];
private var uvs : Vector2[];
public var expandAmount : float;

public var gravity : boolean;

private var oscControl_expand : int = 13;
private var oscValue_expand : float;
private var prevOsc_expand : float;
public var useOsc : boolean = true;

private var oscControl_explode : int = 93;
private var oscValue_explode : float;
private var prevOsc_explode : float;



function Awake() {
	
//	oscValue_expand = OSCReceiver.messages[oscControl_expand];
//	
//	oscValue_expand = OSCReceiver.messages[oscControl_explode];
//	
//	prevOsc_expand = oscValue_expand;
//	
//	prevOsc_explode = oscValue_explode;
	
	
	//targetMesh = gameObject.GetComponent(MeshFilter).mesh;
	triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	uvs = targetMesh.uv;
	
	for(var i  = 0; i < triangles.length; i+=3){
	
		var polyMesh : Mesh;
		var newVertices : Array = [];
		var newIndices : Array = [];	
		var newUVs : Array = [];
		
		polyMesh = new Mesh();
		
		newVertices.Push(vertices[triangles[i]]);
		newVertices.Push(vertices[triangles[i+1]]);
		newVertices.Push(vertices[triangles[i+2]]);
		
		newIndices.Push(newVertices.length-3);
		newIndices.Push(newVertices.length-2);
		newIndices.Push(newVertices.length-1);
		
		newUVs.Push(uvs[triangles[i]]);
		newUVs.Push(uvs[triangles[i+1]]);
		newUVs.Push(uvs[triangles[i+2]]);
		
		polyMesh.vertices = newVertices;
		polyMesh.triangles = newIndices;
		polyMesh.uv = newUVs;
		
		polyMesh.RecalculateNormals();
		polyMesh.RecalculateBounds();
		
		var newTriLine : GameObject;
		newTriLine = new GameObject("triangleLine");
		newTriLine.AddComponent(triangleRenderAug);
	    newTriLine.AddComponent(MeshFilter);
	    newTriLine.AddComponent(Rigidbody);
	    var rigidBody : Rigidbody = newTriLine.GetComponent(Rigidbody);

	    rigidBody.useGravity = false;
//	    rigidBody.velocity = Vector3(Random.Range(-10,10),Random.Range(-5,5),Random.Range(10,50));
//	    rigidBody.angularVelocity =Vector3(Random.Range(-1,1),Random.Range(-1,1),Random.Range(-1,1));
//	    rigidBody.mass = Random.Range(10,70);
//	    rigidBody.inertiaTensor = Vector3(5, 1, 1);
	    newTriLine.GetComponent(MeshFilter).mesh = polyMesh;	    
	    newTriLine.AddComponent(MeshRenderer);
		newTriLine.AddComponent(MeshCollider);
		var collider : MeshCollider = newTriLine.GetComponent(MeshCollider);
		collider.sharedMesh = polyMesh;

		newTriLine.renderer.material = material;
		newTriLine.transform.parent=transform;
		
		//GeometryHelper.CreatePoly(vertices[triangles[i]],vertices[triangles[i+1]],vertices[triangles[i+2]]);
		//newObjects[i].Push(newObject);
	}

	expandAmount=1;
}

function Update() {
	expandAmount=1;
//	oscValue_expand = OSCReceiver.messages[oscControl_expand];
//	oscValue_expand = OSCReceiver.messages[oscControl_explode];
	expandAmount =Map(OSCReceiver.messages[12], 0,1,-20, 3,true);
	
	
	
//	if(useOsc){
//		if(prevOsc_expand != oscValue_expand){
//			expandAmount = Map(oscValue_expand, 0, 1, -20, 3,true);	
//		}
//		prevOsc_expand = oscValue_expand;
//		
//		if(prevOsc_explode != oscValue_explode){
//			if(oscValue_explode){
//				gravity=true;
//			}
//		}
//		prevOsc_explode = oscValue_explode;
//	}
	
	if(OSCReceiver.messages[93] == 1.0){
		gravity=true;
	}
	if(gravity){
		 Destroy(gameObject,5);
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



