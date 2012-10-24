using UnityEngine;
using UnityEditor;
using System.Collections;

public class MeshInfo : ScriptableObject
{   
    [MenuItem ("Custom/Show Mesh Info %#i")]
    public static void ShowCount()
    {
        int triangles = 0;
        int vertices = 0;
        int meshCount = 0;
        
        foreach (GameObject go in Selection.GetFiltered(typeof(GameObject), SelectionMode.TopLevel))
        {
            Component[] skinnedMeshes = go.GetComponentsInChildren(typeof(SkinnedMeshRenderer)) ;
            Component[] meshFilters = go.GetComponentsInChildren(typeof(MeshFilter));

            ArrayList totalMeshes = new ArrayList(meshFilters.Length + skinnedMeshes.Length);

            for (int meshFiltersIndex = 0; meshFiltersIndex < meshFilters.Length; meshFiltersIndex++)
            {
                MeshFilter meshFilter = (MeshFilter)meshFilters[meshFiltersIndex];
                totalMeshes.Add(meshFilter.sharedMesh);
            }

            for (int skinnedMeshIndex = 0; skinnedMeshIndex < skinnedMeshes.Length; skinnedMeshIndex++)
            {
                SkinnedMeshRenderer skinnedMeshRenderer = (SkinnedMeshRenderer)skinnedMeshes[skinnedMeshIndex];
                totalMeshes.Add(skinnedMeshRenderer.sharedMesh);
            }

            for (int i = 0; i < totalMeshes.Count; i++)
            {
                Mesh mesh = totalMeshes[i] as Mesh;
                if (mesh == null)
                {
                    Debug.LogWarning("You have a missing mesh in your scene.");
                    continue;
                }
                vertices += mesh.vertexCount;
                triangles += mesh.triangles.Length / 3;
                meshCount++;
            }
        }

        EditorUtility.DisplayDialog("Vertex and Triangle Count", vertices
            + " vertices in selection.  " + triangles + " triangles in selection.  "
            + meshCount + " meshes in selection." + (meshCount > 0 ? ("  Average of " + vertices / meshCount
            + " vertices and " + triangles / meshCount + " triangles per mesh.") : ""), "OK", "");
    }
    
    [MenuItem ("Custom/Show Mesh Info %i", true)]
    public static bool ValidateShowCount()
    {
        return Selection.activeGameObject;
    }
    
}