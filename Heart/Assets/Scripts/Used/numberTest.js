public var theObjects : GameObject[];
public var theFrontMaterials : Material[];
public var theBackMaterials : Material[];
public var theMeshes : Mesh[];
public var theTriangles : GameObject[];
public var theLines : GameObject[];
public var thePrefabs : GameObject[];
public var theLights : GameObject[];
public var theChoice : int;
private var currentChoice : int;
private var currentObject : GameObject;
public var create : boolean = false;
public var whichFrontMaterial : int; 
private var currentFrontMaterial : int; 
public var whichBackMaterial : int; 
private var currentBackMaterial : int; 
public var whichFrontMesh : int;
private var currentFrontMesh : int;

public var whichLines : int;
private var currentLines : int;
public var whichTris: int;
private var currentTris : int;

//need to build up
public var oscIndex_frontMaterials : int;
public var oscIndex_backMaterials : int;
public var oscIndex_lines : int;
public var oscIndex_tris : int;
public var oscIndex_scenes : int;
public var oscIndex_meshes : int;

private var oscValue_frontMaterials : float;
private var oscValue_backMaterials : float;
private var oscValue_lines : float;
private var oscValue_tris : float;
public var oscValue_scenes : float;
private var oscValue_meshes : float;

private var prevOsc_frontMaterials : float;
private var prevOsc_backMaterials : float;
private var prevOsc_lines : float;
private var prevOsc_tris : float;
private var prevOsc_scenes : float;
private var prevOsc_meshes : float;




function Start(){
	
	oscValue_frontMaterials = OSCReceiver.messages[oscIndex_frontMaterials];
	oscValue_backMaterials = OSCReceiver.messages[oscIndex_backMaterials];
	oscValue_lines = OSCReceiver.messages[oscIndex_lines];
	oscValue_tris = OSCReceiver.messages[oscIndex_tris];
	oscValue_scenes = OSCReceiver.messages[oscIndex_scenes];
	oscValue_meshes = OSCReceiver.messages[oscIndex_meshes];
	
	prevOsc_frontMaterials = oscValue_frontMaterials;
	prevOsc_backMaterials = oscValue_backMaterials;
	prevOsc_lines = oscValue_lines;
	prevOsc_tris = oscValue_tris;
	prevOsc_scenes = oscValue_scenes;
	prevOsc_meshes = oscValue_meshes;
	
	if(create){
	Instantiate(thePrefabs[1], transform.position,transform.rotation);
	currentChoice = 0;
	}
	
	

}


function Update () {
	
	oscValue_frontMaterials = OSCReceiver.messages[oscIndex_frontMaterials];
	oscValue_backMaterials = OSCReceiver.messages[oscIndex_backMaterials];
	oscValue_lines = OSCReceiver.messages[oscIndex_lines];
	oscValue_tris = OSCReceiver.messages[oscIndex_tris];
	oscValue_scenes = OSCReceiver.messages[oscIndex_scenes];
	oscValue_meshes = OSCReceiver.messages[oscIndex_meshes];
	
	if(prevOsc_frontMaterials != oscValue_frontMaterials){
		whichFrontMaterial = Map(oscValue_frontMaterials, 0 , 1 , 0, theFrontMaterials.Length-1, true );
	}
	prevOsc_frontMaterials = oscValue_frontMaterials;
	
	if(prevOsc_backMaterials != oscValue_backMaterials){
		whichBackMaterial = Map(oscValue_backMaterials, 0 , 1 , 0, theBackMaterials.Length-1, true );
	}
	prevOsc_backMaterials = oscValue_backMaterials;
	
	if(prevOsc_lines != oscValue_lines){
		whichLines = Map(oscValue_lines, 0 , 1 , 0, theLines.Length-1, true );
	}
	prevOsc_lines = oscValue_lines;
	
	if(prevOsc_tris != oscValue_tris){
		whichTris = Map(oscValue_tris, 0 , 1 , 0, theTriangles.Length-1, true );
	}
	prevOsc_tris = oscValue_tris;
		
	if(prevOsc_scenes != oscValue_scenes){
		theChoice = Map(oscValue_scenes, 0 , 1 , 0, thePrefabs.Length-1, true );
		
	}
	prevOsc_scenes= oscValue_scenes;
	
	if(prevOsc_meshes != oscValue_meshes){
		whichFrontMesh = Map(oscValue_meshes, 0 , 1 , 0, theMeshes.Length-1, true );
	}
	prevOsc_meshes = oscValue_meshes;
	

	
	theChoice = Mathf.Clamp(theChoice,0,thePrefabs.Length-1);
	whichFrontMaterial = Mathf.Clamp(whichFrontMaterial,0,theFrontMaterials.Length-1);
	whichFrontMesh = Mathf.Clamp(whichFrontMesh,0,theMeshes.Length-1);
	whichBackMaterial = Mathf.Clamp(whichBackMaterial,0,theBackMaterials.Length-1);
	whichLines = Mathf.Clamp(whichLines,0,theLines.Length-1);
	whichTris = Mathf.Clamp(whichTris,0,theTriangles.Length-1);
	
	
	if(theChoice != currentChoice){
			changeTheScene();
			}
	if(currentFrontMaterial != whichFrontMaterial){
		changeTheFrontMaterial();
	}
	if(currentFrontMesh != whichFrontMesh){
		changeTheFrontMesh();
	}
	if(currentBackMaterial != whichBackMaterial){
		changeTheBackMaterial();
	}
	if(currentLines != whichLines){
		changeTheLines();
	}
	if(currentTris != whichTris){
		changeTheTris();
	}
	

//	
		if(OSCReceiver.messages[26]){
			theChoice = 1;
			changeTheScene();

	}
//	
		if(OSCReceiver.messages[27]){
		theChoice = 2;
			changeTheScene();
	}
//	
		if(OSCReceiver.messages[28]){
		theChoice = 3;
			changeTheScene();
	}
	
		if(OSCReceiver.messages[29]){
	theChoice = 4;
			changeTheScene();
	}
	
		if(OSCReceiver.messages[30]){
	theChoice = 5;
			changeTheScene();
	}
	
		if(OSCReceiver.messages[31]){
		theChoice = 6;
			changeTheScene();
	}
	
		if(OSCReceiver.messages[32]){
		theChoice = 7;
			changeTheScene();
	}
	
			if(OSCReceiver.messages[33]){
	theChoice = 8;
			changeTheScene();
	}
	
			if(OSCReceiver.messages[34]){
		theChoice = 9;
			changeTheScene();
	}
	
			if(OSCReceiver.messages[35]){
	theChoice = 10;
			changeTheScene();
	}
	
}

function changeTheScene(){
	var killAll = GameObject.FindGameObjectsWithTag("heartModel");
	for (var killThis in killAll)
   Destroy(killThis);
	var kill : GameObject= GameObject.FindWithTag("heartModel");
	Destroy(kill);
	Instantiate(thePrefabs[theChoice], transform.position,transform.rotation);
	currentChoice = theChoice;
	

}

function changeTheLines(){
	
	var killAll = GameObject.FindGameObjectsWithTag ("lineModel");
	for (var killThis in killAll)
   Destroy(killThis);
	var kill : GameObject= GameObject.FindWithTag("lineModel");
	Destroy(kill);
	Instantiate(theLines[whichLines], transform.position,transform.rotation);
	currentLines = whichLines;
}

function changeTheTris(){
		var killAll = GameObject.FindGameObjectsWithTag ("triangleModel");
	for (var killThis in killAll)
   Destroy(killThis);
	var kill : GameObject= GameObject.FindWithTag("triangleModel");
	Destroy(kill);
	Instantiate(theTriangles[whichTris], transform.position,transform.rotation);
	currentTris = whichTris;
}


function changeTheFrontMaterial(){
	var changeTarget : GameObject= GameObject.Find("HeartFront");

	changeTarget.renderer.sharedMaterial = theFrontMaterials[whichFrontMaterial];
	currentFrontMaterial = whichFrontMaterial;
}
function changeTheBackMaterial(){
	var changeTarget : GameObject= GameObject.Find("HeartBack");

	changeTarget.renderer.sharedMaterial = theBackMaterials[whichBackMaterial];
	currentBackMaterial = whichBackMaterial;
}


function changeTheFrontMesh(){
	var changeTarget : GameObject= GameObject.Find("HeartFront");
	//var targetMesh : Mesh = changeTarget.GetComponent(MeshFilter).mesh;
	changeTarget.GetComponent(MeshFilter).mesh = theMeshes[whichFrontMesh];
	currentFrontMesh = whichFrontMesh;
}

//function bangScene(choice : int){
////		var killLines = GameObject.FindGameObjectsWithTag ("lineModel");
////	for (var killLine in killLines)
////   Destroy(killLine);
////   
////   		var killTris = GameObject.FindGameObjectsWithTag ("triangleModel");
////	for (var killTri in killTris)
////   Destroy(killTri);
////   
////      		var killScenes = GameObject.FindGameObjectsWithTag ("HeartModel");
////	for (var killScene in killScenes)
////   Destroy(killScene);
//   
//	Instantiate(thePrefabs[choice], transform.position,transform.rotation);
//}




function Map(value : float, inputMin : float, inputMax : float, outputMin : float, outputMax : float , clamp : boolean) : float 
{
	if (Mathf.Abs(inputMin - inputMax) < Mathf.Epsilon){
		//Debug.Log("Map: avoiding possible divide by zero, check inputMin and inputMax");
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);	
		if( clamp ){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}

