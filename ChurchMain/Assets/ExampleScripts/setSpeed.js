var myTextureObject : VideoTexture;
var speed : float = 0.0f;
//Copyright 2012 Brian Chasalow - brian@chasalow.com - All Rights Reserved.

//this is an example of how to change the video speed (or other video parameter) from a javascript.
//put this script in a non-special folder like the root of your project, (not in Editor or Plugins) - 
//the C# scripts need to get compiled first before you can call them from Javascript.
//then place this script on the same gameObject as your VideoTexture script.
function Start(){
	myTextureObject = GetComponent(VideoTexture);
	if(!myTextureObject){
		Debug.Log("didnt find a videoTexture script");
	}
	else{
		Debug.Log("found a videoTexture script");
	}
}

function OnGUI(){

	speed = GUI.HorizontalSlider (Rect (25, 25, 100, 30), speed, 0.0f, 4.0f);
	if(GUI.changed){
		myTextureObject.videoObject.setVideoSpeed(speed);
	}
}