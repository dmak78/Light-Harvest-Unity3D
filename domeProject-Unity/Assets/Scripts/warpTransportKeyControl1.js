
private var horizontalKey : int;
private var verticalKey : int;
private var scaleVector : Vector3;
private var originalScale : Vector3;
private var originalPosition : Vector3;

function Start(){
	scaleVector = transform.localScale;
	//if(PlayerPrefsX.GetVector3("warpPosition")){
	//	transform.localPosition = PlayerPrefsX.GetVector3("warpPosition");
	//}
	
	//if(PlayerPrefsX.GetVector3("warpScale")){
	//	transform.localScale = PlayerPrefsX.GetVector3("warpScale");
	//}
	
	originalScale = transform.localScale;
	originalPosition = transform.localPosition;
	
	PlayerPrefsX.SetVector3("orgWarpScale", originalScale);
	PlayerPrefsX.SetVector3("orgWarpPosition", originalPosition);
	//transform.localScale = PlayerPrefsX.GetVector3("warpScale");
	
	//transform.localPosition = PlayerPrefsX.GetVector3("warpPosition");
}

function Update () {
	
	if(Input.GetKey(KeyCode.Escape)){
		transform.localScale = PlayerPrefsX.GetVector3("orgWarpScale");
		transform.localPosition = PlayerPrefsX.GetVector3("orgWarpPosition");
	}
	
	if(Input.GetKey(KeyCode.R)){
		transform.localScale = PlayerPrefsX.GetVector3("warpScale");
		transform.localPosition = PlayerPrefsX.GetVector3("warpPosition");
	}
	
	if(Input.GetKey(KeyCode.S)){
		PlayerPrefsX.SetVector3("warpPosition", transform.localPosition);
		PlayerPrefsX.SetVector3("warpScale", transform.localScale);
	}

//	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.Z)){
//		transform.localScale+=Vector3(0,0,-.1);
//	}
//	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.Z)){
//		transform.localScale+=Vector3(0,0,.1);
//	}
//	
//	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.X)){
//		transform.localScale+=Vector3(-.1,0,0);
//	}
//	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.X)){
//		transform.localScale+=Vector3(.1,0,0);
//	}
//	
//	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.Y)){
//		transform.localScale+=Vector3(0,-.1,0);
//	}
//	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.Y)){
//		transform.localScale+=Vector3(0,.1,0);
//		}
	
	if(Input.GetKey(KeyCode.LeftArrow) && Input.GetKey(KeyCode.C)){
		transform.localPosition+=Vector3(-.02,0,0);
		//PlayerPrefsX.SetVector3("warpPosition", transform.localPosition);
	}
	if(Input.GetKey(KeyCode.RightArrow)  && Input.GetKey(KeyCode.C)){
		transform.localPosition+=Vector3(.02,0,0);
		//PlayerPrefsX.SetVector3("warpPosition", transform.localPosition);
	}
	
	if(Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.C)){
		transform.localPosition+=Vector3(0,-.02,0);
		//PlayerPrefsX.SetVector3("warpPosition", transform.localPosition);
	}
	if(Input.GetKey(KeyCode.UpArrow)  && Input.GetKey(KeyCode.C)){
		transform.localPosition+=Vector3(0,.02,0);
		//PlayerPrefsX.SetVector3("warpPosition", transform.localPosition);
	}
	if(Input.GetKey(KeyCode.Minus) && Input.GetKey(KeyCode.C)){
		transform.localScale+=Vector3(.02,-.02,-.02);
		//PlayerPrefsX.SetVector3("warpScale", transform.localScale);
	}
	if(Input.GetKey(KeyCode.Equals)  && Input.GetKey(KeyCode.C)){
		transform.localScale+=Vector3(-.02,.02,.02);
	//	PlayerPrefsX.SetVector3("warpScale", transform.localScale);
	}
	

	
}