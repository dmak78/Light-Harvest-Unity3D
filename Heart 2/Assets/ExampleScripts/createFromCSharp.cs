using UnityEngine;
using System.Collections;
using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.IO;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Linq;

public class createFromCSharp : MonoBehaviour {
	//Copyright 2012 Brian Chasalow - brian@chasalow.com - All Rights Reserved.
	
	//this is an example of how to programmatically create a video texture entirely from code. 
	//put this script on any gameobject, or your main camera, or wherever.

	public void Start() {
	// VIDEOTEXTURE DEMO
	// creates a VideoTexture from script- with queuelist and all.
	// uncomment between dashes:------
	GameObject videoTextureGO = GameObject.CreatePrimitive(PrimitiveType.Plane);	
	videoTextureGO.name = "videoTextureGO";
	videoTextureGO.transform.position = new Vector3(0, 1, 2f);
	videoTextureGO.transform.eulerAngles = new Vector3(90, 180, 0);
	videoTextureGO.active = false;	
	videoTextureGO.renderer.material = new Material(Shader.Find("Unlit/Transparent"));
	
	VideoTexture videoTextureScript = videoTextureGO.AddComponent("VideoTexture") as VideoTexture;	
	// adds a video to the queue list. these need to be setup to be preloaded by the video manager for this to work.
	videoTextureScript.addAVideo("demo.mov", 0);
	videoTextureScript.videoObject.setVideoPaused(false);
	videoTextureScript.videoObject.setVideoSpeed(2.0f);
	videoTextureScript.videoObject.setVideoLoopType(VideoObject.VideoLoopType.LOOP_QUEUE);
	videoTextureScript.videoObject.setVideoVolume(.5f);
	////set more movie properties here for initialization...
	videoTextureGO.active = true;
	////or set them later if you like
	//-------------------------------
		
	
	// VIDEOTEXTURESIMPLE DEMO
	// creates a simple VideoTextureSimple from script. VideoTextureSimple handles loading your movie and destroying it. 
	// movies created via VideoTextureSimple are not shared in with VideoTexture queues.
	// be sure to change myVideoPath to the full path of your video, in the form "/Users/me/Desktop/myVideo.mov"
	// or, "http://www.chasalow.com/OSXVTP/demo.mov" (this URL is valid)
	
	//uncomment below:---
	//  string myVideoPath = "http://www.chasalow.com/OSXVTP/demo.mov";	
	// //----------------------------
	// 
	// //// uncomment between dashes:------
	// GameObject videoTextureSimpleGO = GameObject.CreatePrimitive(PrimitiveType.Plane);
	// videoTextureSimpleGO.name = "videoTextureSimple";
	// videoTextureSimpleGO.transform.position = new Vector3(0, 0, 0);
	// videoTextureSimpleGO.transform.eulerAngles = new Vector3(90, 180, 0);
	// videoTextureSimpleGO.active = false;
	// videoTextureSimpleGO.renderer.material = new Material(Shader.Find("Unlit/Transparent"));
	// 
	// VideoTextureSimple videoTextureSimpleScript = videoTextureSimpleGO.AddComponent<VideoTextureSimple>();
	// videoTextureSimpleScript.setFullPathToMovie(myVideoPath);		
	// videoTextureSimpleScript.videoObject.setVideoPaused(false);
	// videoTextureSimpleGO.active = true;
	////--------------------------------
	}
}
