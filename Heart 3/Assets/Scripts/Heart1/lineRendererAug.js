private var newWidth : float;
private var newColor1 : Color;
private var newColor2 : Color;


function Update () {
	var otherScript: lineRender = gameObject.Find("Lines").GetComponent(lineRender); 
	var originalMesh: Mesh = gameObject.Find("Lines").GetComponent(MeshFilter).mesh;
	var vertices : Vector3 ;
    newWidth =  otherScript.lineWidth;
    newColor1 = otherScript.c1;
    newColor2 = otherScript.c2;
    var lineRenderer = gameObject.GetComponent(LineRenderer);
    lineRenderer.SetWidth(newWidth,newWidth);
   
    lineRenderer.material = gameObject.Find("Lines").GetComponent(Renderer).sharedMaterial;
     renderer.material.color = newColor1;
}