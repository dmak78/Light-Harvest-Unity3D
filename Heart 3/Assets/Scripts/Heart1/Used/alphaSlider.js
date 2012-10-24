public var alphaAmount : float = 1;
private var currentColor : Color ;

public var osc_address_alpha : String;

function Awake(){
	
}

function Update () {
	
	alphaAmount = Mathf.Clamp(alphaAmount, 0 , 1);
	currentColor = renderer.material.GetColor("_Color");
	renderer.material.color = Color(currentColor.r,currentColor.g,currentColor.b,alphaAmount);
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){

		if(message.Address == osc_address_alpha){
			alphaAmount = message.Values[0];
		}	



}