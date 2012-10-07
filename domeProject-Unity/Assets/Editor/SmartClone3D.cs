using UnityEngine;
using UnityEditor;
using System.Collections;

public class SmartClone3D : ScriptableWizard 
{
    private enum axisToUse
    {
        USEX,
        USEY,
        USEZ    
    }
    
    public int numberOfCopiesX = 2;
    public int numberOfCopiesY = 2;
    public int numberOfCopiesZ = 2;
    
    public Vector3 cloneTranslationX = new Vector3(1,0,0);
    public Vector3 cloneTranslationY = new Vector3(0,1,0);
    public Vector3 cloneTranslationZ = new Vector3(0,0,1);
    
    public Vector3 cloneRotationX;
    public Vector3 cloneRotationY;
    public Vector3 cloneRotationZ;
    
    public bool incrementalRotation = false;
    
    public Vector3 cloneScaleX = new Vector3(1,1,1);
    public Vector3 cloneScaleY = new Vector3(1,1,1);
    public Vector3 cloneScaleZ = new Vector3(1,1,1);
    
    public bool incrementalScale = false;
    
    public bool uniqueCloneNames = true;
    public bool AddToParent = true;
    public bool addOriginalToParent = false;
    public string parentName = "New Parent";
    
    
    [MenuItem ("GameObject/Cloning/Smart clone 3D")]
    static void CreateWizard () 
    {
        ScriptableWizard.DisplayWizard("Smart Clone", typeof (SmartClone3D),
            "Clone", "Reset");

        //If you don't want to use the secondary button simply leave it out:
        //ScriptableWizard.DisplayWizard("Create Light", typeof(WizardCreateLight));
    }
    // Use this for initialization
    void Start () 
    {
    
    }
    
    // Update is called once per frame
    void Update () 
    {
    
    }
    
    void OnDrawGizmos()
    {
        if(!Selection.activeGameObject || (numberOfCopiesX == 0 && numberOfCopiesY == 0 && numberOfCopiesZ == 0) )
            isValid = false;
        else
            isValid = true; 
    }
    
    void OnWizardCreate () 
    {
        //pick the correct cloning method to use
        
        if(numberOfCopiesX != 0 && numberOfCopiesY != 0 && numberOfCopiesZ != 0)
        {   
            Clone3D();
            return;
        }   
        
        if(numberOfCopiesX != 0 && numberOfCopiesY != 0 && numberOfCopiesZ == 0)
        {
            Clone2D(axisToUse.USEX, axisToUse.USEY);
            return;
        }
        
        if(numberOfCopiesX != 0 && numberOfCopiesY == 0 && numberOfCopiesZ != 0)
        {
            Clone2D(axisToUse.USEX, axisToUse.USEZ);
            return;
        }
        
        if(numberOfCopiesX == 0 && numberOfCopiesY !=0 && numberOfCopiesZ != 0)
        {
            Clone2D(axisToUse.USEY, axisToUse.USEZ);
            return;
        }
        
        if(numberOfCopiesX != 0 && numberOfCopiesY == 0 && numberOfCopiesZ == 0)
        {
            Clone1D(axisToUse.USEX);
            return;
        }
        
        if(numberOfCopiesX == 0 && numberOfCopiesY != 0 && numberOfCopiesZ == 0)
        {
            Clone1D(axisToUse.USEY);
            return;
        }
        
        if(numberOfCopiesX == 0 && numberOfCopiesY == 0 && numberOfCopiesZ != 0)
        {
            Clone1D(axisToUse.USEZ);
            return;
        }


    }
    
    void OnWizardOtherButton ()
    {
        numberOfCopiesX = 2;
        numberOfCopiesY = 2;
        numberOfCopiesZ = 2;
    
        cloneTranslationX = new Vector3(1,0,0);
        cloneTranslationY = new Vector3(0,1,0);
        cloneTranslationZ = new Vector3(0,0,1);
    
        cloneRotationX = new Vector3(0,0,0);
        cloneRotationY = new Vector3(0,0,0);
        cloneRotationZ = new Vector3(0,0,0);
    
        cloneScaleX = new Vector3(1,1,1);
        cloneScaleY = new Vector3(1,1,1);
        cloneScaleZ = new Vector3(1,1,1);
        
        incrementalRotation = false;
        incrementalScale = false;
        
        uniqueCloneNames = true;
        AddToParent = true;
        addOriginalToParent = false;
        parentName = "New Parent";
        
    }
    
    void Clone1D(axisToUse axis)
    {
        
        Vector3 translationToUse = new Vector3(0,0,0);
        Vector3 rotationToUse = new Vector3(0,0,0);
        Vector3 scaleToUse = new Vector3(1,1,1);
        int numCopies = 0;
        
        bool newParent = false;
        
        GameObject parentObject = GameObject.Find(parentName);
        
        if(!parentObject)
        {
            parentObject = new GameObject(parentName);
            newParent = true;
        }
        
        if(addOriginalToParent)
        {
            Selection.activeGameObject.transform.parent = parentObject.transform;
        }


        GameObject currentSelection = Selection.activeGameObject;
        
        switch(axis)
        {
            case axisToUse.USEX:
                translationToUse = cloneTranslationX;
                rotationToUse = cloneRotationX;
                scaleToUse = cloneScaleX;
                numCopies = numberOfCopiesX;
            break;
                
            case axisToUse.USEY:
                translationToUse = cloneTranslationY;
                rotationToUse = cloneRotationY;
                scaleToUse = cloneScaleY;
                numCopies = numberOfCopiesY;
            break;
                
            case axisToUse.USEZ:
                translationToUse = cloneTranslationZ;
                rotationToUse = cloneRotationZ;
                scaleToUse = cloneScaleZ;
                numCopies = numberOfCopiesZ;
            break;
        }
     
        Vector3 selectionScale = currentSelection.transform.localScale;
                
        for(int i = 0; i < numCopies; i++)
        {
            GameObject clone = Instantiate(currentSelection) as GameObject;
            
            if(uniqueCloneNames)
                clone.name = currentSelection.name + i;
            else
                clone.name = currentSelection.name;
                
            
            if(newParent && !addOriginalToParent)
            {
                clone.transform.Translate( translationToUse  * i);
                        
                if(incrementalRotation)
                    clone.transform.Rotate( rotationToUse * i );
                else
                    clone.transform.Rotate( rotationToUse );
                        
                        
                if(scaleToUse != Vector3.one && scaleToUse != Vector3.zero)
                {
                    if(incrementalScale)
                        clone.transform.localScale = ( scaleToUse * i);
                    else
                        clone.transform.localScale = ( scaleToUse );
                }
                                                    
            }
            else
            {
                clone.transform.Translate( translationToUse * (i + 1) );
                        
                if(incrementalRotation)
                    clone.transform.Rotate( rotationToUse * (i + 1) );
                else
                    clone.transform.Rotate( rotationToUse );
                        
                if(scaleToUse != Vector3.one && scaleToUse != Vector3.zero)
                {
                    if(incrementalScale)
                        clone.transform.localScale += ( scaleToUse * (i + 1) );
                    else
                        clone.transform.localScale += ( scaleToUse );
                } 
                                            
                        
            }
            
                        
            if(AddToParent)
                clone.transform.parent = parentObject.transform;
        }
        
       
    }
    
    void Clone2D(axisToUse axis1, axisToUse axis2)
    {
        Vector3 translationToUse1 = new Vector3(0,0,0);
        Vector3 rotationToUse1 = new Vector3(0,0,0);
        Vector3 scaleToUse1 = new Vector3(1,1,1);
        
        Vector3 translationToUse2 = new Vector3(0,0,0);
        Vector3 rotationToUse2 = new Vector3(0,0,0);
        Vector3 scaleToUse2 = new Vector3(1,1,1);
        
        int numCopies1 = 0;
        int numCopies2 = 0;
        
        bool newParent = false;
        
        GameObject parentObject = GameObject.Find(parentName);
        
        if(!parentObject)
        {
            parentObject = new GameObject(parentName);
            newParent = true;
        }
        
        if(addOriginalToParent)
        {
            Selection.activeGameObject.transform.parent = parentObject.transform;
        }


        GameObject currentSelection = Selection.activeGameObject;
        
        switch(axis1)
        {
            case axisToUse.USEX:
                translationToUse1 = cloneTranslationX;
                rotationToUse1 = cloneRotationX;
                scaleToUse1 = cloneScaleX;
                numCopies1 = numberOfCopiesX;
            break;
                
            case axisToUse.USEY:
                translationToUse1 = cloneTranslationY;
                rotationToUse1 = cloneRotationY;
                scaleToUse1 = cloneScaleY;
                numCopies1 = numberOfCopiesY;
            break;
                
            case axisToUse.USEZ:
                translationToUse1 = cloneTranslationZ;
                rotationToUse1 = cloneRotationZ;
                scaleToUse1 = cloneScaleZ;
                numCopies1 = numberOfCopiesZ;
            break;
        }
        
        switch(axis2)
        {
            case axisToUse.USEX:
                translationToUse2 = cloneTranslationX;
                rotationToUse2 = cloneRotationX;
                scaleToUse2 = cloneScaleX;
                numCopies2 = numberOfCopiesX;
            break;
                
            case axisToUse.USEY:
                translationToUse2 = cloneTranslationY;
                rotationToUse2 = cloneRotationY;
                scaleToUse2 = cloneScaleY;
                numCopies2 = numberOfCopiesY;
            break;
                
            case axisToUse.USEZ:
                translationToUse2 = cloneTranslationZ;
                rotationToUse2 = cloneRotationZ;
                scaleToUse2 = cloneScaleZ;
                numCopies2 = numberOfCopiesZ;
            break;
        }

        Vector3 selectionScale = currentSelection.transform.localScale;
                
        for(int i = 0; i < numCopies1; i++)
        {
            for(int j = 0; j < numCopies2; j++)
            {
                GameObject clone = Instantiate(currentSelection) as GameObject;
            
                if(uniqueCloneNames)
                    clone.name = currentSelection.name + "_" + i + "_" + j;
                else
                    clone.name = currentSelection.name;
                
                if(newParent && !addOriginalToParent)
                {
                    clone.transform.Translate( (translationToUse1 * i) + (translationToUse2 * j) );
                        
                    if(incrementalRotation)
                        clone.transform.Rotate( (rotationToUse1 * i) + (rotationToUse2 * j) );
                    else
                        clone.transform.Rotate( rotationToUse1 + rotationToUse2 );
                        
                    if(scaleToUse1 != Vector3.one && scaleToUse1 != Vector3.zero)
                    {
                        if(incrementalScale)
                            clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse1.x, selectionScale.y * scaleToUse1.y, selectionScale.z * scaleToUse1.z) ) * i);
                        else
                            clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleX.x, selectionScale.y * cloneScaleX.y, selectionScale.z * cloneScaleX.z) ) );
                    }
                                                
                    if(scaleToUse2 != Vector3.one && scaleToUse2 != Vector3.zero)
                    {
                        if(incrementalScale)
                            clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse2.x, selectionScale.y * scaleToUse2.y, selectionScale.z * scaleToUse2.z) ) * j);
                        else
                             clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse2.x, selectionScale.y * scaleToUse2.y, selectionScale.z * scaleToUse2.z) ) );
                    }


                }
                else
                {
                    clone.transform.Translate( (translationToUse1 * (i + 1)) + (translationToUse2 * (j + 1)) );
                        
                        if(incrementalRotation)
                            clone.transform.Rotate( (rotationToUse1 * (i + 1)) + (rotationToUse2 * (j + 1)) );
                        else
                            clone.transform.Rotate( rotationToUse1 + rotationToUse2 );
                        
                        if(scaleToUse1 != Vector3.one && scaleToUse1 != Vector3.zero)
                        {
                            if(incrementalScale)
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse1.x, selectionScale.y * scaleToUse1.y, selectionScale.z * scaleToUse1.z) ) * (i + 1) );
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse1.x, selectionScale.y * scaleToUse1.y, selectionScale.z * scaleToUse1.z) ) );
                        } 
                                            
                        
                        if(scaleToUse2 != Vector3.one && scaleToUse2 != Vector3.zero)
                        {
                            if(incrementalScale)                            
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse2.x, selectionScale.y * scaleToUse2.y, selectionScale.z * scaleToUse2.z) ) * (j + 1) );
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * scaleToUse2.x, selectionScale.y * scaleToUse2.y, selectionScale.z * scaleToUse2.z) ) );
                        }
        
                }
                
                if(AddToParent)
                        clone.transform.parent = parentObject.transform;
                
            }//j for
            
        }//i for

        
    }
    
    
    void Clone3D()
    {
        bool newParent = false;
        
        GameObject parentObject = GameObject.Find(parentName);
        
        if(!parentObject)
        {
            parentObject = new GameObject(parentName);
            newParent = true;
        }
        
        if(addOriginalToParent)
        {
            Selection.activeGameObject.transform.parent = parentObject.transform;
        }
        
        GameObject currentSelection = Selection.activeGameObject;
        
       for(int x = 0; x < numberOfCopiesX; x++)
       {
            for(int y = 0; y < numberOfCopiesY; y++)
            {
                for(int z = 0; z < numberOfCopiesZ; z++)
                {   
            
                    GameObject clone = Instantiate(currentSelection) as GameObject;
            
                    if(uniqueCloneNames)
                        clone.name = currentSelection.name + "_" + x + "_" + y + "_" + z;
                    else
                        clone.name = currentSelection.name;
                
                    Vector3 selectionScale = currentSelection.transform.localScale;
                
                    if(newParent && !addOriginalToParent)
                    {
                        clone.transform.Translate( (cloneTranslationX * x) + (cloneTranslationY * y) + (cloneTranslationZ * z) );
                        
                        if(incrementalRotation)
                            clone.transform.Rotate( (cloneRotationX * x) + (cloneRotationY * y) + (cloneRotationZ * z) );
                        else
                            clone.transform.Rotate( cloneRotationX + cloneRotationY + cloneRotationZ );
                        
                        
                        if(cloneScaleX != Vector3.one && cloneScaleX != Vector3.zero)
                        {
                            if(incrementalScale)
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleX.x, selectionScale.y * cloneScaleX.y, selectionScale.z * cloneScaleX.z) ) * x);
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleX.x, selectionScale.y * cloneScaleX.y, selectionScale.z * cloneScaleX.z) ) );
                        }
                        //else
                        //  clone.transform.localScale += currentSelection.transform.localScale;
                        
                        if(cloneScaleY != Vector3.one && cloneScaleY != Vector3.zero)
                        {
                            if(incrementalScale)
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleY.x, selectionScale.y * cloneScaleY.y, selectionScale.z * cloneScaleY.z) ) * y);
                            else
                                 clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleY.x, selectionScale.y * cloneScaleY.y, selectionScale.z * cloneScaleY.z) ) );
                        }
                            
                        if(cloneScaleZ != Vector3.one && cloneScaleZ != Vector3.zero)
                        {
                            if(incrementalScale)
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleZ.x, selectionScale.y * cloneScaleZ.y, selectionScale.z * cloneScaleZ.z) ) * z); 
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleZ.x, selectionScale.y * cloneScaleZ.y, selectionScale.z * cloneScaleZ.z) ) ); 
                        }
                            
                    }
                    else
                    {
                        clone.transform.Translate( (cloneTranslationX * (x + 1)) + (cloneTranslationY * (y + 1)) + (cloneTranslationZ * (z + 1)) );
                        
                        if(incrementalRotation)
                            clone.transform.Rotate( (cloneRotationX * (x + 1)) + (cloneRotationY * (y + 1)) + (cloneRotationZ * (z + 1)) );
                        else
                            clone.transform.Rotate( cloneRotationX + cloneRotationY + cloneRotationZ );
                        
                        if(cloneScaleX != Vector3.one && cloneScaleX != Vector3.zero)
                        {
                            if(incrementalScale)
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleX.x, selectionScale.y * cloneScaleX.y, selectionScale.z * cloneScaleX.z) ) * (x + 1) );
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleX.x, selectionScale.y * cloneScaleX.y, selectionScale.z * cloneScaleX.z) ) );
                        } 
                                            
                        
                        if(cloneScaleY != Vector3.one && cloneScaleY != Vector3.zero)
                        {
                            if(incrementalScale)                            
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleY.x, selectionScale.y * cloneScaleY.y, selectionScale.z * cloneScaleY.z) ) * (y + 1) );
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleY.x, selectionScale.y * cloneScaleY.y, selectionScale.z * cloneScaleY.z) ) );
                            //clone.transform.localScale += ( (currentSelection.transform.localScale + cloneScaleY) * (y + 1) );   
                        }
                        
                        if(cloneScaleZ != Vector3.one && cloneScaleZ != Vector3.zero)
                        {
                            if(incrementalScale) 
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleZ.x, selectionScale.y * cloneScaleZ.y, selectionScale.z * cloneScaleZ.z) ) * (z + 1) ); 
                            else
                                clone.transform.localScale += ( ( new Vector3(selectionScale.x * cloneScaleZ.x, selectionScale.y * cloneScaleZ.y, selectionScale.z * cloneScaleZ.z) ) );
                            //clone.transform.localScale += ( (currentSelection.transform.localScale + cloneScaleZ) * (z + 1) );   
                        }
                    }
            
                    if(AddToParent)
                        clone.transform.parent = parentObject.transform;
            
                }
            }   
       }

    }
      
}