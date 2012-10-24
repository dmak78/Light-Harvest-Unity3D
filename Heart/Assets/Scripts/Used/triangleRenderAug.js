private var origialMesh : Mesh;
private var vertices : Vector3[];
private var originalVertices : Vector3[];
private var normals : Vector3[];
private var triangles : int[];
private var uvs : Vector2[];
public var scaleAmount : float;
private var exploded : boolean = false;


function Start() {
	originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = originalMesh.vertices;

}


function Update(){

	var otherScript: triangleRender = GameObject.FindWithTag("triangleModel").GetComponent(triangleRender); 
	var material : Material = otherScript.material;
	renderer.sharedMaterial = material;
	var mesh : Mesh = gameObject.GetComponent(MeshFilter).mesh;
	vertices = mesh.vertices;
	normals = mesh.normals;
	scaleAmount = otherScript.expandAmount;
	
	for(var i = 0; i < vertices.Length; i++){
		vertices[i] = normals[i]*scaleAmount;
		vertices[i] += originalVertices[i];
	}
	
	mesh.vertices = vertices;
	
	if(otherScript.gravity && exploded==false){
		 //gameObject.AddComponent(Rigidbody);
	    var rigidBody : Rigidbody = gameObject.GetComponent(Rigidbody);
		var collider : MeshCollider = gameObject.GetComponent(MeshCollider);
	  	rigidBody.useGravity = false;


	    rigidBody.velocity = Vector3(Random.Range(-10,10),Random.Range(-5,5),Random.Range(50,70));
	   rigidBody.angularVelocity =Vector3(Random.Range(-1,1),0,Random.Range(-1,1));
	    rigidBody.mass = Random.Range(1,2);
	   rigidBody.inertiaTensor = Vector3(1, 3, 5);
	   // var collider : MeshCollider = gameObject.GetComponent(MeshCollider);
		collider.sharedMesh = mesh;
		exploded=true;
		Destroy(gameObject,4);
	}
	if(exploded && !otherScript.gravity){
		mesh.vertices = originalVertices;
		
	}
	
//	mesh.RecalculateNormals();
//	mesh.RecalculateBounds();
}

//function OnBecameInvisible()
//
//{
//		var otherScript: triangleRender = gameObject.Find("Triangles").GetComponent(triangleRender); 
//	otherScript.gravity=false;
//   Destroy(gameObject,10);
//
//}


