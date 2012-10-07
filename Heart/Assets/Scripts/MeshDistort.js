public var inflateSpeed : float;
public var frequency : float;
public var amplitude : float;
public var speed : float;
var originalVertices : Vector3[];

function Start () {
	var mesh : Mesh = GetComponent(MeshFilter).mesh;
	originalVertices = mesh.vertices;
}
function Update () {
	var mesh : Mesh = GetComponent(MeshFilter).mesh;
	var vertices : Vector3[] = mesh.vertices;
	var normals : Vector3[] = mesh.normals;
	var center : Vector3 = transform.position;
	
	 


	for(var i = 0; i < vertices.Length; i++){
		//debug draw ray params start point, direction, color
		Debug.DrawRay(center+vertices[i], normals[i]*10, Color.blue);
		inflateSpeed = Mathf.Sin(frequency + speed*Time.time ) * amplitude;
		inflateSpeed += Mathf.Sin(i + frequency + speed * Time.time)* amplitude;
		vertices[i].y = normals[i].y*inflateSpeed;
		vertices[i].y += originalVertices[i].y;
		
	}
	mesh.vertices = vertices;

}