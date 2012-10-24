public var whiteOn : boolean = false;
private var whiteColor : Color = Color.white;


function Start (){
	camera.clearFlags = CameraClearFlags.SolidColor;
}

function Update () {
	
	if(Input.GetAxis("Vertical") ){
		camera.backgroundColor = whiteColor;
	}
	if(Input.GetAxis("Horizontal") ){
		camera.backgroundColor = Color.black;
	}
	
}