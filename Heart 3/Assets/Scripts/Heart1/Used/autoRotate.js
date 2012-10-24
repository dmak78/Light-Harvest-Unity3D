
public var amount : float = 1;
public var autoRotateOn : boolean = false;
public var direction : boolean ;

function Update () {

	var parent : GameObject;
	parent = GameObject.Find("LightRotate");
	var controller : oscLightScene;
	controller = parent.GetComponent("oscLightScene");
	if(direction){
		amount = controller.amount ;
	}
	else{
		amount = -controller.amount ;
	}
	
	
	autoRotateOn = controller.rotateOn;
	if(autoRotateOn){
		GetComponent(Transform).Rotate(Vector3.up * (Time.deltaTime*amount));
	}
	
}