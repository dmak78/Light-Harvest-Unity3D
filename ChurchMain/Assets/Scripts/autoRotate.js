
public var amount : float = 1;
public var autoRotateOn : boolean = false;

function Update () {
	if(autoRotateOn){
		GetComponent(Transform).Rotate(Vector3.up * (Time.deltaTime*amount));
	}
	
}