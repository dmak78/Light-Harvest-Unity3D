@MenuItem ("GameObject/World Space UVMap Advanced")
static function doMeshes() {
    if(!EditorUtility.DisplayDialog("UV Remap Confirmation", "This tool will recursively alter the UV map(s) of the mesh(es) in your selected object, altering them to all line up with each other in world space.", "Remap UVs of Selected Mesh(es)!", "Cancel")) return;
    var meshes = Selection.activeGameObject.GetComponentsInChildren(MeshFilter);
    for (var mf : MeshFilter in meshes) DoMesh(mf);
}

static function DoMesh (mf : MeshFilter) {
    var uvs = new Vector2[mf.mesh.vertices.Length];
    var tris = mf.mesh.triangles;
    for (var i=0;i<tris.Length;i+=3) {
        var a : Vector3 = mf.transform.TransformPoint(mf.mesh.vertices[tris[i]]);
        var b : Vector3 = mf.transform.TransformPoint(mf.mesh.vertices[tris[i+1]]);
        var c : Vector3 = mf.transform.TransformPoint(mf.mesh.vertices[tris[i+2]]);
        var center : Vector3 = (a + b + c) / 3;
        var normal : Vector3 = Vector3.Cross(a-c, b-c).normalized;
        
        a = Quaternion.LookRotation(normal) * a;
        b = Quaternion.LookRotation(normal) * b;
        c = Quaternion.LookRotation(normal) * c;
        
        uvs[tris[i]]    = Vector2(a.x, a.y);
        uvs[tris[i+1]]  = Vector2(b.x, b.y);
        uvs[tris[i+2]]  = Vector2(c.x, c.y);
    }
    mf.mesh.uv = uvs;
}