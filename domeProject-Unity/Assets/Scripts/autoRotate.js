
public var amount : float = 1;
public var autoRotateOn : boolean = false;
private var rotateGo : int;
private var going : boolean = false;

function Update () {
	
	//if(Input.GetAxis("Vertical") !=0){
		//rotateGo = Input.GetAxis("Vertical");
		if(Input.GetKey(KeyCode.Space)){
			if(going){
				going=false;
				amount =7;
			}
			else if(!going){
				going=true;
			}
		}
		
		if(going){
			rotateGo=1;
		}
		else{
			rotateGo=0;
		}

	//}
	
	
//	if(Input.GetKey(KeyCode.G)){
//		rotateGo=rotateGo*2;
//	}
//		if(Input.GetKey(KeyCode.H)){
//		rotateGo=rotateGo*4;
//	}

	
	amount+=Input.GetAxis("Vertical");
	
	if(autoRotateOn){
		GetComponent(Transform).Rotate(Vector3(1,0,0) * ((Time.deltaTime*amount)*rotateGo));
		//GetComponent(Transform).Rotate(Vector3(0,1,0) * (Time.deltaTime*amount));
	}
	
}