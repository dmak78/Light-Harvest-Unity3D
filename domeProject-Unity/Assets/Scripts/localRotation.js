public var x : float;
public var y : float;
public var z : float;
public var w : float;
function Update () {
	
	 transform.localRotation = Quaternion(x,y,z,w);
}