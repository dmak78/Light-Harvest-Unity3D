public var rotX : float;
public var rotY : float;
public var rotZ : float;
public var reset : boolean;
public var rotate : boolean;
private var originalRotation : Transform;
private var lightColor : Color;
public var lightR : float;
public var lightG : float;
public var lightB : float;
public var lightA : float;


private var lightIntensity : float;



function Awake () {
	originalRotation = transform;
	lightR=light.color.r;
	lightG=light.color.g;
	lightB=light.color.b;
	lightA=light.color.a;

}

function Update () {
	
	lightIntensity = light.intensity;
	
	if(rotate){
		transform.Rotate(Vector3(rotX,rotY,rotZ));
	}
	else{
		transform.rotation = Quaternion(0,0,0,-1);

	}
	
	if(reset){
		transform.rotation = Quaternion(0,0,0,-1);
		rotX=0;
		rotY=0;
		rotZ=0;
		reset=false;
	}
	
	light.color = Color(lightR,lightG,lightB,lightA);
	

	
	
	
}



function Map(value : float, inputMin : float, inputMax : float, outputMin : float, outputMax : float , clamp : boolean) : float 
{
	if (Mathf.Abs(inputMin - inputMax) < Mathf.Epsilon){
		//Debug.Log("Map: avoiding possible divide by zero, check inputMin and inputMax");
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);	
		if( clamp ){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}

