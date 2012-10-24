using UnityEngine;
using UnityEditor;

public class SelectAllLights : ScriptableObject
{
    [MenuItem ("Custom/Select All Lights")]
    static void SelectLights()
    {
        Light[] lights = FindObjectsOfType(typeof(Light)) as Light[];
        GameObject[] gos = new GameObject[lights.Length];
        
        for (int i=0; i < lights.Length; i++)
        {
            gos[i] = (lights[i]).gameObject;
        }
        
        Selection.objects = gos;
    }
}