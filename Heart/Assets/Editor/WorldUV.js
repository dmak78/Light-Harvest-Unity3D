@MenuItem ("GameObject/World Space UVMap")
static function doMeshes() {
    if(!EditorUtility.DisplayDialog("UV Remap Confirmation", "This tool will recursively alter the UV map(s) of the mesh(es) in your selected object, altering them to all line up with each other in world space.", "Remap UVs of Selected Mesh(es)!", "Cancel")) return;
    var meshes = Selection.activeGameObject.GetComponentsInChildren(MeshFilter);
    for (var mf : MeshFilter in meshes) DoMesh(mf);
}

static function DoMesh (mf : MeshFilter) {
    mesh = mf.sharedMesh;
    var uvs = new Vector2[mesh.vertices.Length];
    var tris = mesh.triangles;
    var go = mf.gameObject;
    for (var i=0;i<tris.Length;i+=3) {
        var a : Vector3 = go.transform.TransformPoint(mesh.vertices[tris[i]]);
        var b : Vector3 = go.transform.TransformPoint(mesh.vertices[tris[i+1]]);
        var c : Vector3 = go.transform.TransformPoint(mesh.vertices[tris[i+2]]);
        var n : Vector3 = Vector3.Cross(a-c, b-c).normalized;
        if(Vector3.Dot(Vector3.up, n) > .5 || Vector3.Dot(-Vector3.up, n) > .5) {
            uvs[tris[i]]    = Vector2(a.x, a.z);
            uvs[tris[i+1]]  = Vector2(b.x, b.z);
            uvs[tris[i+2]]  = Vector2(c.x, c.z);
        }
        else if(Vector3.Dot(Vector3.right, n) > .5 || Vector3.Dot(Vector3.left, n) > .5) {
            uvs[tris[i]]    = Vector2(a.y, a.z);
            uvs[tris[i+1]]  = Vector2(b.y, b.z);
            uvs[tris[i+2]]  = Vector2(c.y, c.z);
        }
        else {
            uvs[tris[i]]    = Vector2(a.y, a.x);
            uvs[tris[i+1]]  = Vector2(b.y, b.x);
            uvs[tris[i+2]]  = Vector2(c.y, c.x);
        }
    }
    mesh.uv = uvs;
}