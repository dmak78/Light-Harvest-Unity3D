// Fade the color from red to green

// back and forth over the defined duration

public var colorStart = Color.red;

public var colorEnd = Color.green;

var duration = 1.0;

public var oscAddDuration : int;
 public var lerp : float ;
 public var autoLerp : boolean = false;
 
 function Start(){
 	colorStart = renderer.material.color;
 }
 

function Update () {
	
var oscin : oscIn = gameObject.GetComponent(oscIn);
	if(oscAddDuration!=0){
		duration = oscin.oscValuesOut[oscAddDuration];
	}

lerp = Mathf.Clamp(lerp,0,1);

if(autoLerp){
	lerp = Mathf.PingPong (Time.time, duration) / duration;
}

renderer.material.color = Color.Lerp (colorStart, colorEnd, lerp);

}