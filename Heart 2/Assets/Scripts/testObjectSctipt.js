	
var newVertices  = new Vector3[5];
var newUV = new Vector2[5];
var triangles = new int[12];
var material : Material;

function Start(){
	gameObject.AddComponent(MeshFilter);
	

		if (material){
			renderer.material = material;
			
		}
		else{
			renderer.material.color = Color.white;
		}
		
	var mesh = gameObject.GetComponent(MeshFilter).mesh;


	
	
	newVertices[0] = Vector3(-1, 0, -1);
	newVertices[1] = Vector3(-1, 0, 1);
	newVertices[2] = Vector3(1, 0, 1);
	newVertices[3] = Vector3(1, 0, -1);
	newVertices[4] = Vector3(0, 0, 0);
	
	newUV[0] = Vector2(0, 0);
	newUV[1] = Vector2(0, 1);
	newUV[2] = Vector2(1, 1);
	newUV[3] = Vector2(1, 0);
	newUV[4] = Vector2(.5, .5);
	mesh.vertices = newVertices;
	mesh.uv = newUV;
	triangles=[0, 4, 3, 0, 4, 1, 2, 4, 1, 2, 4, 3];
	mesh.triangles = triangles;
	mesh.RecalculateNormals();
	mesh.RecalculateBounds();
}

function Update () {
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	mesh.vertices = newVertices;
	mesh.uv = newUV;
	mesh.triangles = triangles;
	mesh.RecalculateNormals();
	mesh.RecalculateBounds();
	
	
	
}