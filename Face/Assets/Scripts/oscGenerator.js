public var preFabs : GameObject[];

private var parentObject : GameObject;




function Start(){

}
function Update () {
	var parentObject =GameObject.Find("/OnScreen/Prefabs");
	if(OSCReceiver.messages[1]){
		Instantiate(preFabs[0],transform.position,transform.rotation);
	}

	

	
}

