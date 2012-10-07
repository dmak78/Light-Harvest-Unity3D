using UnityEngine;
using UnityEditor;

public class SetSelectionToMaterial : ScriptableWizard
{
    public Material material;
    public bool includeChildren;
    public bool excludePrefabs;
    private SelectionMode modePrefs; 

    [MenuItem ("Custom/Set Selection to Material %e")]
    static void DoSet()
    {
        ScriptableWizard.DisplayWizard("Set Selection to Material", typeof(SetSelectionToMaterial), "Set");
        
    }
    
    void OnWizardUpdate()
    {
        helpString = "Set the material of the objects in the selection to this. Tick Include Children to also set material on the children of selected objects or tick Exclude Prefabs if you don't want instanced objects (from prefabs) to be changed.";
    }
    
    
    void OnWizardCreate()
    {
    
        if(includeChildren || excludePrefabs)

        modePrefs=(SelectionMode.ExcludePrefab | SelectionMode.Editable | SelectionMode.Deep);
        else
            modePrefs=(SelectionMode.Editable);
    
        Object[] objs = Selection.GetFiltered(typeof(GameObject), modePrefs);
        
        foreach (GameObject go in objs)
        {
            go.renderer.material = material;
        }

/* if you replace the above foreach with my version below, it seems to work well for cases where some children parts don't have a renderer:

        foreach (GameObject go in objs)
        {
            if (go.renderer)
                go.renderer.material = material;
        }

*/
    
    }   
}