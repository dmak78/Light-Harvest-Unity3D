
private var horizontalKey : int;
private var verticalKey : int;
private var scaleVector : Vector3;
private var originalScale : Vector3;
private var originalPosition : Vector3;
public var scaleScale : float = .5;
public var positionScale : float = .1;


function Start(){
	scaleVector = transform.localScale;
	
	originalScale = transform.localScale;
	originalPosition = transform.localPosition;
	
	PlayerPrefsX.SetVector3("orgCylinderScale", originalScale);
	PlayerPrefsX.SetVector3("orgCylinderPosition", originalPosition);
	
}

function Update () {
	
		if(Input.GetKey(KeyCode.Escape)){
		transform.localScale = PlayerPrefsX.GetVector3("orgCylinderScale");
		transform.localPosition = PlayerPrefsX.GetVector3("orgCylinderPosition");
	}
	
	if(Input.GetKey(KeyCode.R)){
		transform.localScale = PlayerPrefsX.GetVector3("cylinderScale");
		transform.localPosition = PlayerPrefsX.GetVector3("cylinderPosition");
	}
	
	if(Input.GetKey(KeyCode.S)){
		PlayerPrefsX.SetVector3("cylinderPosition", transform.localPosition);
		PlayerPrefsX.SetVector3("cylinderScale", transform.localScale);
	}
	
	
	

	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.Z)){
		transform.localScale+=Vector3(0,0,-scaleScale);
	}
	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.Z)){
		transform.localScale+=Vector3(0,0,scaleScale);
	}
	
	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.X)){
		transform.localScale+=Vector3(-scaleScale,0,0);
	}
	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.X)){
		transform.localScale+=Vector3(scaleScale,0,0);
	}
	
	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.Y)){
		transform.localScale+=Vector3(0,-scaleScale,0);
	}
	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.Y)){
		transform.localScale+=Vector3(0,scaleScale,0);
	}
	
	if(Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.X)){
		transform.localPosition+=Vector3(-positionScale,0,0);
	}
	if(Input.GetKey(KeyCode.UpArrow)  && Input.GetKey(KeyCode.X)){
		transform.localPosition+=Vector3(positionScale,0,0);
	}
	
	if(Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.Y)){
		transform.localPosition+=Vector3(0,-positionScale,0);
	}
	if(Input.GetKey(KeyCode.UpArrow)  && Input.GetKey(KeyCode.Y)){
		transform.localPosition+=Vector3(0,positionScale,0);
	}
	if(Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.Z)){
		transform.localPosition+=Vector3(0,0,-positionScale);
	}
	if(Input.GetKey(KeyCode.UpArrow)  && Input.GetKey(KeyCode.Z)){
		transform.localPosition+=Vector3(0,0,positionScale);
	}
	
	
	
}