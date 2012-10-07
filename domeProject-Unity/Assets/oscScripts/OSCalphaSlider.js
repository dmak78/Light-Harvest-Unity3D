public var alphaAmount : float = 1;
public var oscAddAlphaAmount : int ;
private var currentColor : Color ;



function Awake(){
	

}	


function Update () {
	
	var oscin : oscIn = gameObject.GetComponent(oscIn);
	if(oscAddAlphaAmount!=0){
		alphaAmount = oscin.oscValuesOut[oscAddAlphaAmount];
	}
	
	alphaAmount = Mathf.Clamp(alphaAmount, 0 , 1);
	currentColor = renderer.material.GetColor("_Color");
	renderer.material.color = Color(currentColor.r,currentColor.g,currentColor.b,alphaAmount);
}