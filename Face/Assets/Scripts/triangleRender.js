
public var targetMesh : Mesh;
public var material : Material;
private var vertices : Vector3[];
private var normals : Vector3[];
private var triangles : int[];
private var uvs : Vector2[];
public var expandAmount : float;

public var gravity : boolean;




function Awake() {
	
	triangles = targetMesh.GetTriangles(0);
	normals = targetMesh.normals;
	vertices = targetMesh.vertices;

	indvNormals = new Vector3[22];
	uvs = targetMesh.uv;
	var triangleCount : int = 0;
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
		newTriLine = new GameObject("triangleLine" + triangleCount);
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
		newTriLine.transform.parent=gameObject.transform;
		
		//GeometryHelper.CreatePoly(vertices[triangles[i]],vertices[triangles[i+1]],vertices[triangles[i+2]]);
		//newObjects[i].Push(newObject);
		
		triangleCount++;
	}

	
}

function Update() {
	
	var objTransforms : Component[];

	var objMeshFilters : Component[];
	//var source : GameObject = GameObject.Find("OnScreen/CurrentTriangles");
	objTransforms = gameObject.GetComponentsInChildren(Transform);

	objMeshFilters = gameObject.GetComponentsInChildren(MeshFilter);

	var curNorm = new Vector3[objMeshFilters.Length];
	
	var objRenderers : Component[];
	objRenderers = gameObject.GetComponentsInChildren(MeshRenderer);
	for(var render : MeshRenderer in objRenderers){
		render.material = material;
		//render.material.color = Vector4(Random.value,Random.value,Random.value,Random.value);
	}
	
	var meshCounter : int = 0;
	for(var triMeshFilter : MeshFilter in objMeshFilters){
		var tempMesh : Mesh = triMeshFilter.mesh;
		var tempNorms : Vector3[] = tempMesh.normals;
		curNorm[meshCounter] = tempNorms[0];
		meshCounter++;
	}
	
	var transCounter : int = 0 ;
	for(var trans : Transform in objTransforms){
		trans.position=curNorm[transCounter] * expandAmount;
		transCounter++;
	}

	
//	for(var n = 0; n < indvNormals.Length; n++){
//		objTransforms[n].position = indvNormals[n]*expandAmount;
//	}
	
//	for(var triMeshFilter : MeshFilter in objMeshFilters){
//		var mesh : Mesh = triMeshFilter.mesh;
//		var tempVertices : Vector3[] = mesh.vertices;
//		var tempNormals : Vector3[] = mesh.normals;
//		for(var i = 0; i < tempVertices.Length; i++){
//			tempVertices[i] = tempNormals[i]*expandAmount;
//			//vertices[i] += originalVertices[i];
//		}
//		mesh.vertices = tempVertices;	
//	}

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



