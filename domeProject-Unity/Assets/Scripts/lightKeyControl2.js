private var lightInt : float ;
private var lightIntOrg : float ;
function Start(){
	lightIntOrg = light.intensity;
	lightInt = lightIntOrg;
	//PlayerPrefsX.SetInt("lightIntensity", lightInt);
	PlayerPrefs.SetFloat("lightIntensityOrg", lightIntOrg);

}

function Update () {
	
	if(Input.GetKey(KeyCode.Escape)){
		lightInt = PlayerPrefs.GetFloat("lightIntensityOrg");
		light.intensity=lightInt;
	}
	
	if(Input.GetKey(KeyCode.R)){
		lightInt =  PlayerPrefs.GetFloat("lightIntensity");
		light.intensity=lightInt;
	}
	
	if(Input.GetKey(KeyCode.S)){
		PlayerPrefs.SetFloat("lightIntensity",lightInt);
	}

	
	if(Input.GetKey(KeyCode.L) && Input.GetKey(KeyCode.DownArrow)){
		light.intensity-=.01;
		lightInt = light.intensity;
	}
	
		if(Input.GetKey(KeyCode.L) && Input.GetKey(KeyCode.UpArrow)){
		light.intensity+=.01;
		lightInt = light.intensity;
	}


	
}