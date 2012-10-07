
public var theTriangles : GameObject[];
public var theLines : GameObject[];
public var thePrefabs : GameObject[];
public var theLights : GameObject[];
public var theChoice : int;
private var currentChoice : int;
private var currentObject : GameObject;
public var create : boolean = false;


public var whichLines : int;
private var currentLines : int;
public var whichTris: int;
private var currentTris : int;

//need to build up

public var oscIndex_lines : int;
public var oscIndex_tris : int;
public var oscIndex_scenes : int;


private var oscValue_lines : float;
private var oscValue_tris : float;
public var oscValue_scenes : float;



private var prevOsc_lines : float;
private var prevOsc_tris : float;
private var prevOsc_scenes : float;




function Start(){
	

	oscValue_lines = OSCReceiver.messages[oscIndex_lines];
	oscValue_tris = OSCReceiver.messages[oscIndex_tris];
	oscValue_scenes = OSCReceiver.messages[oscIndex_scenes];

	

	prevOsc_lines = oscValue_lines;
	prevOsc_tris = oscValue_tris;

	var parentObject : GameObject = GameObject.Find("Scene");
	
	
	if(create){
	Instantiate(thePrefabs[1], parentObject.transform.position,parentObject.transform.rotation);
	currentChoice = 0;
	}
	
	

}


function Update () {
	
	if(OSCReceiver.messages[oscIndex_lines]){
		oscValue_lines = OSCReceiver.messages[oscIndex_lines];
	}
	
	if(OSCReceiver.messages[oscIndex_tris]){
		oscValue_tris = OSCReceiver.messages[oscIndex_tris];
	}
	
	if(OSCReceiver.messages[oscIndex_scenes]){
		oscValue_scenes = OSCReceiver.messages[oscIndex_scenes];
	}
	
	
	

	
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

	

	
	theChoice = Mathf.Clamp(theChoice,0,thePrefabs.Length-1);


	whichLines = Mathf.Clamp(whichLines,0,theLines.Length-1);
	whichTris = Mathf.Clamp(whichTris,0,theTriangles.Length-1);
	
	
	if(theChoice != currentChoice){
			changeTheScene();
			}

		if(currentLines != whichLines){
		changeTheLines();
	}
	if(currentTris != whichTris){
		changeTheTris();
	}
	

//	
//		if(OSCReceiver.messages[26]){
//			theChoice = 1;
//			changeTheScene();
//
//	}
////	
//		if(OSCReceiver.messages[27]){
//		theChoice = 2;
//			changeTheScene();
//	}
////	
//		if(OSCReceiver.messages[28]){
//		theChoice = 3;
//			changeTheScene();
//	}
//	
//		if(OSCReceiver.messages[29]){
//	theChoice = 4;
//			changeTheScene();
//	}
//	
//		if(OSCReceiver.messages[30]){
//	theChoice = 5;
//			changeTheScene();
//	}
//	
//		if(OSCReceiver.messages[31]){
//		theChoice = 6;
//			changeTheScene();
//	}
//	
//		if(OSCReceiver.messages[32]){
//		theChoice = 7;
//			changeTheScene();
//	}
//	
//			if(OSCReceiver.messages[33]){
//	theChoice = 8;
//			changeTheScene();
//	}
//	
//			if(OSCReceiver.messages[34]){
//		theChoice = 9;
//			changeTheScene();
//	}
//	
//			if(OSCReceiver.messages[35]){
//	theChoice = 10;
//			changeTheScene();
//	}
	
}

function changeTheScene(){
	var parentObject : GameObject = GameObject.Find("Scene");
	var killAll = GameObject.FindGameObjectsWithTag("sceneModel");
	for (var killThis in killAll)
   Destroy(killThis);
	var kill : GameObject= GameObject.FindWithTag("sceneModel");
	Destroy(kill);
	Instantiate(thePrefabs[theChoice], parentObject.transform.position,parentObject.transform.rotation);
	currentChoice = theChoice;
	

}

function changeTheLines(){
	var parentObject : GameObject = GameObject.Find("Scene");
	var killAll = GameObject.FindGameObjectsWithTag ("lineModel");
	for (var killThis in killAll)
   Destroy(killThis);
	var kill : GameObject= GameObject.FindWithTag("lineModel");
	Destroy(kill);
	Instantiate(theLines[whichLines], transform.position,transform.rotation);
	currentLines = whichLines;
}

function changeTheTris(){
	var parentObject : GameObject = GameObject.Find("Scene");
		var killAll = GameObject.FindGameObjectsWithTag ("triangleModel");
	for (var killThis in killAll)
   Destroy(killThis);
	var kill : GameObject= GameObject.FindWithTag("triangleModel");
	Destroy(kill);
	Instantiate(theTriangles[whichTris], parentObject.transform.position,parentObject.transform.rotation);
	currentTris = whichTris;
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

