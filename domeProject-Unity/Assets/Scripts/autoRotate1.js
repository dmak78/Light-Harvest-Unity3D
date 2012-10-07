
public var amount : float = 1;
public var autoRotateOn : boolean = false;



function Update () {
	if(autoRotateOn){
		GetComponent(Transform).Rotate(Vector3(-1.5,1,-1) * ((Time.deltaTime*amount)));
		//GetComponent(Transform).Rotate(Vector3(0,1,0) * (Time.deltaTime*amount));
	}
	
}