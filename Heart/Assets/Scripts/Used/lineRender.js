
var c1 : Color = Color.yellow;
var c2 : Color = Color.red;
private var targetMesh : Mesh;
private var vertices : Vector3[];
public var triangles : int[];
public var lineWidth : float = 3;
public var scale : float = 1;
public var numSubMesh : int;


function Start() {
	targetMesh = gameObject.GetComponent(MeshFilter).mesh;

	triangles = targetMesh.GetTriangles(0);
	vertices = targetMesh.vertices;
	
	
	
	for(var i  = 0; i < triangles.length; i+=3){
		var newObject : GameObject;
		newObject = new GameObject("triangleLine");
		//newObject.transform = gameObject.Find("Lines").transform;
		newObject.AddComponent(LineRenderer);
		newObject.AddComponent(lineRendererAug);
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
			newObject.transform.parent=gameObject.Find("Lines").transform;
		//newObjects[i].Push(newObject);
	}


}

function Update() {

  

	
}