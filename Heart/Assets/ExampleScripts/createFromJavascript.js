//Copyright 2012 Brian Chasalow - brian@chasalow.com - All Rights Reserved.

//this is an example of how to create videos from javascript.
//put this script in a non-special folder like the root of your project, (not in Editor or Plugins) - 
//the C# scripts need to get compiled first before you can call them from Javascript.
function Start(){
	
	var videoTextureGO : GameObject = GameObject.CreatePrimitive(PrimitiveType.Plane);	
	videoTextureGO.name = "videoTextureGO";
	videoTextureGO.transform.position = new Vector3(0, 1, 2f);
	videoTextureGO.transform.eulerAngles = new Vector3(90, 180, 0);
	videoTextureGO.active = false;	
	videoTextureGO.renderer.material = new Material(Shader.Find("Unlit/Transparent"));
	var videoTextureScript : VideoTexture = videoTextureGO.AddComponent("VideoTexture");	
	// adds a video to the queue list. these need to be setup to be preloaded by the video manager for this to work.
	videoTextureScript.addAVideo("demo.mov", 0);
	videoTextureScript.videoObject.setVideoPaused(false);
	videoTextureScript.videoObject.setVideoSpeed(2.0f);
	videoTextureScript.videoObject.setVideoLoopType(VideoObject.VideoLoopType.LOOP_QUEUE);
	videoTextureScript.videoObject.setVideoVolume(.5f);
	////set more movie properties here for initialization...
	videoTextureGO.active = true;
	//or set them later if you like
}

