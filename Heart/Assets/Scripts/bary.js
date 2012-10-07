// Attach this script to a camera and it will 
// draw a debug line pointing outward from the normal 
function Update () { 
   // Only if we hit something, do we continue 
   var hit : RaycastHit; 
   if (!Physics.Raycast (Camera.main.ScreenPointToRay(Input.mousePosition), hit)) 
      return; 

   // Just in case, also make sure the collider also has a renderer 
   // material and texture 
   var meshCollider = hit.collider as MeshCollider; 
   if (meshCollider == null || meshCollider.sharedMesh == null) 
      return; 

   var mesh : Mesh = meshCollider.sharedMesh; 
   var normals = mesh.normals; 
   var triangles = mesh.triangles; 

   // Extract local space normals of the triangle we hit 
   var n0 = normals[triangles[hit.triangleIndex * 3 + 0]]; 
   var n1 = normals[triangles[hit.triangleIndex * 3 + 1]];    
   var n2 = normals[triangles[hit.triangleIndex * 3 + 2]];    
    
   // interpolate using the barycentric coordinate of the hitpoint 
   var baryCenter = hit.barycentricCoordinate; 

   // Use barycentric coordinate to interpolate normal 
   var interpolatedNormal = n0 * baryCenter.x + n1 * baryCenter.y + n2 * baryCenter.z; 
   // normalize the interpolated normal 
   interpolatedNormal =  interpolatedNormal.normalized*100; 
    
   // Transform local space normals to world space 
   var hitTransform : Transform = hit.collider.transform; 
   interpolatedNormal = hitTransform.TransformDirection(interpolatedNormal); 

   // Display with Debug.DrawLine 
   Debug.DrawRay(hit.point, interpolatedNormal); 
}