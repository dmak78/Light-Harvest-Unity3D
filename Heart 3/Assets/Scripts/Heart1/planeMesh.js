var uvs : Vector2[];
var verts : Vector3[];

function Start(){
	var mesh = gameObject.GetComponent(MeshFilter).mesh;
	uvs = mesh.uv;
	verts = mesh.vertices;
	for(var j = 0 ; j <  uvs.Length; j++){
		Debug.Log(uvs[j]);
	}
	for(var v = 0 ; v <  verts.Length; v++){
		Debug.Log(verts[v]);
	}
}
function Update () {
}