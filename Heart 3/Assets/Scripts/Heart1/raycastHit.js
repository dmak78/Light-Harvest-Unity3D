// Attach this script to a camera and it will
// draw a debug line triangle triangle
// at the triangle where you place the mouse.

//public var thePoint : Vector3;
//
//function Update () {
//    // Only if we hit something, do we continue
//    var hit : RaycastHit;
//    if (!Physics.Raycast (camera.ScreenPointToRay(Input.mousePosition), hit))
//        return;
//
//    // Just in case, also make sure the collider also has a renderer
//    // material and texture
//    var meshCollider = hit.collider as MeshCollider;
//    if (meshCollider == null || meshCollider.sharedMesh == null)
//        return;
//
//    var mesh : Mesh = meshCollider.sharedMesh;
//    var vertices = mesh.vertices;
//    var triangles = mesh.triangles;
//    var triVertices : Array;
//    triVertices = [];
//    
//
//    // Extract local space vertices that were hit
//    var p0 = vertices[triangles[hit.triangleIndex * 3 + 0]];
//    var p1 = vertices[triangles[hit.triangleIndex * 3 + 1]];    
//    var p2 = vertices[triangles[hit.triangleIndex * 3 + 2]];   
//
//    // Transform local space vertices to world space
//    var hitTransform : Transform = hit.collider.transform;
//    p0 = hitTransform.TransformPoint(p0);
//    p1 = hitTransform.TransformPoint(p1);
//    p2 = hitTransform.TransformPoint(p2);
//    
//    
//    
//    
//
//    // Display with Debug.DrawLine
//    Debug.DrawLine(p0, p1);
//    Debug.DrawLine(p1, p2);
//    Debug.DrawLine(p2, p0);
//    
//   thePoint = Input.GetPosition;
//    
//  }
//  
 var heart : Transform;
function Update () {
    if (Input.GetButtonDown ("Fire1")) {
        // Construct a ray from the current mouse coordinates
        var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
        if (Physics.Raycast (ray)) {
            // Create a particle if hit
            Instantiate (heart, transform.position, transform.rotation);
        }
    }
}


//function NearestVertexTo(oint : Vector3) : Vector3
//{
//    // convert point to local space
//   	var point : float  = transform.InverseTransformPoint(oint);
//
//    //var mesh : Mesh = GetComponent(MeshFilter).mesh;
//    var minDistanceSqr : float = Mathf.Infinity;
//    var nearestVertex : Vector3 = Vector3.zero;
//
//    // scan all vertices to find nearest
//    
//    
//  
//
//for (var vertex : Vector3 in mesh.vertices) {
//    
//        var diff : Vector3 = point-vertex;
//        var distSqr : float = diff.sqrMagnitude;
//
//        if (distSqr < minDistanceSqr)
//        {
//            minDistanceSqr = distSqr;
//            nearestVertex = vertex;
//        }
//    }
//
//    // convert nearest vertex back to world space
//    return transform.TransformPoint(nearestVertex);
//
//}