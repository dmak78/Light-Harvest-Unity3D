var materials : Material[]; 
var changeInterval = 0.33; 
public var index : int;
public var rendererOn : boolean = false;
function Start(){
	//renderer.sharedMaterial = gameObject.Find("syphon").GetComponent(Renderer).sharedMaterial;
	
	if(materials.Length != 0){
		materials[0] = gameObject.Find("syphon").GetComponent(Renderer).sharedMaterial;
	}
}
function Update () { 
    if (materials.Length == 0) // do nothing if no materials
        return; 
	
    // we want this material index now 

    // take a modulo with materials count so that animation repeats 
    index = index % materials.Length; 
    // assign it to the renderer
    renderer.sharedMaterial = materials[index]; 
}