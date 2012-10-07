private var xPosition : float;
private var zPosition : float;

public var xMode : int = 0;
private var xGo : boolean = false;

function Update () {
	
//	xPosition +=Input.GetAxis("Vertical");
//	
//	xPosition = Mathf.Clamp(xPosition, -5,5);
//	
//	zPosition +=Input.GetAxis("Horizontal");
//	
//	zPosition = Mathf.Clamp(zPosition, -5,5);
//	

	//Input.GetKey(KeyCode.Upa)

	
//	if(Input.GetAxis("Vertical")==1){
//		xMode++;
//		xGo = true;
//	}
//	
//	if(Input.GetAxis("Vertical")==-1){
//		xMode--;
//		xGo = true;
//	}
//	
//	xMode = Mathf.Clamp(xMode, -1, 1);
//	
//	if(xGo){
//		if(xMode == 1){
//			transform.Translate(Vector3(10,0,0) * Time.deltaTime);
//			if(transform.localPosition.x > 5){
//				xGo=false;
//			}
//		}
//		if(xMode == 0){
//			transform.Translate(Vector3(0,0,0) * Time.deltaTime);
//			if(transform.localPosition.x == 0){
//				xGo=false;
//			}
//		}
//		if(xMode == -1){
//			transform.Translate(Vector3(-5,0,0) * Time.deltaTime);
//			if(transform.localPosition.x <= -5){
//				xGo=false;
//			}
//		}
//		
//
//	}

	//xPosition += Input.GetAxis("Horizontal");
	
	if(Input.GetAxis("Horizontal")==1){
		xPosition+=.3;
	}
	if(Input.GetAxis("Horizontal")==-1){
		xPosition-=.3;
	}
	xPosition = Mathf.Clamp(xPosition,-5,5);
	//zPosition += Input.GetAxis("Horizontal");
	
	transform.localPosition = Vector3(xPosition,0,0);
	
//	
//	if(xGo == true){
//		xPosition = Mathf.Lerp(xPosition,5,.1);
//	}
//	
//	if(xPosition == 5){
//		xGo=false;
//	}


	//transform.localPosition = Vector3(xPosition,0,zPosition);
	
	
	
}