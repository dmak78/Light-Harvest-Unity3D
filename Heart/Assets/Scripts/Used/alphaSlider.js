public var alphaAmount : float = 1;
private var currentColor : Color ;

public var oscControl_alpha: int;

private var oscValue_alpha : float;

private var prevOsc_alpha : float;

function Awake(){
	
	oscValue_alpha= OSCReceiver.messages[oscControl_alpha];
	prevOsc_alpha = oscValue_alpha;
}	


function Update () {
	
	oscValue_alpha= OSCReceiver.messages[oscControl_alpha];
	if(prevOsc_alpha != oscValue_alpha ){
		alphaAmount = oscValue_alpha;
	}
	
	prevOsc_alpha = oscValue_alpha;
	
	alphaAmount = Mathf.Clamp(alphaAmount, 0 , 1);
	currentColor = renderer.material.GetColor("_Color");
	renderer.material.color = Color(currentColor.r,currentColor.g,currentColor.b,alphaAmount);
}