public var prefab : GameObject[];
public var quat : Quaternion ;

function Start(){
	
	for(var i = 0 ; i < 100; i++){
		//transform.Rotate(Vector3(i,0,0));
		var parentObject : GameObject = GameObject.Find("TessRing");
		var newRing : GameObject = Instantiate(prefab[0],transform.position,transform.rotation);
		newRing.transform.parent = parentObject.transform;
		//newRing.transform.Rotate(Vector3(360/i,0,0));
		
		
	}
	
//	for deg in range(0, 360):
//
//    rad = deg * Mathf.Deg2Rad
//
//    x = transform.position + Mathf.cos(rad)*radius
//
//    y = transform.position + Mathf.sin(rad)*radius
//
//    cubeClone = Instantiate(breakCube, Vector3(x, y, 0), Quaternion.Euler(0 0, deg))
//
//    cubeCloneArray.Append(cubeClone)
}
function Update () {
	quat = transform.rotation;
}