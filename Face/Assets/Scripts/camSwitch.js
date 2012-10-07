public var scale : Vector3;
public var scaleAmount : float = 1;
private var memoryScale : Vector3[];
private var meshObjects : GameObject[];
public var currentSelection : int = 0;
private var counter : int;
public var frequency : float;
private var originalScale : Vector3[];
public var amplitude : float = 0;

function Start () {
	meshObjects = GameObject.FindGameObjectsWithTag("mesh");
	
 	for (var meshes : GameObject in meshObjects){
 	 meshes.GetComponent(MeshRenderer).enabled = false;
 	}
 	
 	memoryScale = new Vector3[meshObjects.length];
 	originalScale = new Vector3[meshObjects.length];
 	
	for(var s=0; s < meshObjects.length;s++){
		memoryScale[s]=Vector3(1,1,1);
		originalScale[s]=meshObjects[s].transform.localScale;
	}
	
	var firstToUse : String = "mesh"+(currentSelection);
 	gameObject.Find(firstToUse).GetComponent(MeshRenderer).enabled = true;
}
function Update () {
	counter++;
	meshObjects = GameObject.FindGameObjectsWithTag("mesh");
	
	if(Input.GetKey("1")){
    meshSwap(0);
 	}
 	if(Input.GetKey("2")){

 	 meshSwap(1);
	 }
	 if(Input.GetKey("3")){

	  meshSwap(2);
	  
	 }
	 
	//scale = (Mathf.Sin(counter*frequency)+1)/2;
	var waveAmount = Mathf.Sin(counter/frequency)*amplitude;	
	meshObjects[currentSelection].transform.localScale = originalScale[currentSelection] + (scale*waveAmount);
	memoryScale[currentSelection]=scale;
	
 }
 
function meshSwap(selectedMesh : int){
	
	meshObjects = GameObject.FindGameObjectsWithTag("mesh");
 
 	for (var meshes : GameObject in meshObjects){
 	 meshes.GetComponent(MeshRenderer).enabled = false;
 	}  
 
 	var oneToUse : String = "mesh"+selectedMesh;
 	gameObject.Find(oneToUse).GetComponent(MeshRenderer).enabled = true;
 	gameObject.Find(oneToUse).transform.localScale = memoryScale[selectedMesh];
 	scale = memoryScale[selectedMesh];
 	currentSelection = selectedMesh;
}

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
