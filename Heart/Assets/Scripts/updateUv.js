public var uvs : Vector2[];
public var vertices : Vector3[];
private var mesh : Mesh;


function Start(){
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	uvs = mesh.uv;
	vertices = mesh.vertices;
}


function Update () {
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	mesh.uv = uvs;
	mesh.vertices = vertices;
	mesh.RecalculateNormals();
}