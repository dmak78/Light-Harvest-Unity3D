using UnityEngine;
using UnityEditor;
using System.Collections;

public class CreateTorus : ScriptableWizard
{
    public float radius = 1f;
    public float thickness = 0.5f;
    
    [MenuItem ("GameObject/Create Other/Torus")]
    static void CreateWizard()
    {
        ScriptableWizard.DisplayWizard("Create Torus", typeof(CreateTorus));
    }
    
    void OnWizardCreate()
    {
        float diameter = radius * 2f;
        float circumference = Mathf.PI * diameter;
        float interval = 360f / (circumference / (thickness * 2f));
        
        GameObject torus = new GameObject("Torus");
        
        for (float i = 0f; i < 360f; i += interval)
        {
            AddSphereCollider(torus.transform, Quaternion.Euler(0f, i, 0f) * new Vector3(radius, 0f, 0f), Quaternion.identity, thickness);
        }
        
        Selection.activeObject = torus;
    }
    
    void AddSphereCollider(Transform parent, Vector3 position, Quaternion rotation, float radius)
    {
        GameObject go = new GameObject("Sphere Collider");
        SphereCollider sphereCollider = go.AddComponent(typeof(SphereCollider)) as SphereCollider;
        sphereCollider.radius = radius;
        go.transform.position = position;
        go.transform.rotation = rotation;
        go.transform.parent = parent;
    }
}