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

//this version is different in three ways:
//1) loads a single, custom movie from the disk
//2) stores only that movie in its queue list at index 0
//3) when this object is destroyed, it will unload the movie from the manager/from disk
//this object might be useful if you don't want to deal with a queue, only need to store a single movie, or
//have several file locations all over your computer you want to load movies from.
//you can also use this version to stream web movies: see createFromCSharp.cs for example
public class VideoTextureSimple : VideoTexture {

	private string fullPathToMovie = "";	
	
	public void setFullPathToMovie(string fullPath){
		fullPathToMovie = fullPath;
	}
	
	public string getFullPathToMovie(){
		return fullPathToMovie;
	}
	
	override public void drawGUI(){	
		if(fullPathToMovie == ""){
			GUILayout.Label("No video selected.\nPlease select a video location.");
		}
		else{
		GUILayout.Label("Video:\n" + Path.GetFileName(fullPathToMovie));
		GUILayout.Label("Loaded from Path:\n" + Path.GetDirectoryName(fullPathToMovie) + "/");
		}	
		
		if(GUILayout.Button("Reload video")){
			reloadMyVideoObject();
		}
		
		GUILayout.Label( "Dim: " + videoObject.getVideoWidth() + "x" + videoObject.getVideoHeight());
		videoObject.drawGUI();
		//drawTextureOptions();
	}
		
	override public void Start() {
		
		PlaneScaler planeScaler = GetComponent<PlaneScaler>();
		Backdrop backdrop = GetComponent<Backdrop>();
		if(!planeScaler && !backdrop)
			gameObject.AddComponent<PlaneScaler>();
			
		 videoManagerScript = Camera.main.GetComponent<VideoManager>();
		 if(!videoManagerScript){
		 	videoManagerScript = Camera.main.gameObject.AddComponent<VideoManager>();
			Debug.LogError("Balls! you don't have a video manager script anywhere.");
		 }

		videoManagerScript.addInstance(this);
		
		//setup the texture type : RenderTexture vs. Texture2D
		updateTextureType();
		
		//create the videoTextureCache ptr, for when you update things on the GL thread
		videoTextureInstance = createVideoTexture();
			
		if(videoTextureInstance == (IntPtr)0){
			Debug.LogError("You didn't have a VideoManager initialized before "  +
			"creating this video instance on " + gameObject.name +  ". Please create one and try again.");
		}
		
		//load the video
		loadMyVideoObject();
		hasStarted = true;
	}
	
	//this attempts to load the video that has been initialized on this object,
	// and calls a method to resize the texture if necessary.
	//returns true if it could find the video that has been attempted to load.
	override public bool drawVideoToTexture(int index){
		// print(videos[index] + " is ATTEMPTING TO LOAD");
		//if the movie you're trying to load does not have a null name and is less than the video count
		if(index < videos.Count && !System.String.IsNullOrEmpty(videos[index])){
			//if the list of videos actually contains that video
			if(videoManagerScript.preLoadedInstances.ContainsKey(videos[index])){
									
				//get the object we want to load, selected from the name we chose
				VideoObject myObj = videoManagerScript.preLoadedInstances[videos[index]];
				if(myObj.getErrorVideoLoading()){
					//Debug.Log(gameObject.name + "VideoTexture:drawVideoToTexture:: ERROR LOADING");
					return false;
				}
				
				playingVideoIndex = 0;
				videoObject.initFrom(videoObject);
				resizeTexturesFromVideoResolution();
				
			}//contains the video requested
			else{
				return false;
			}
		}
		//array index > the videos in the queue or video requested is null string
		else{
			print("VideoInstance::drawVideoToTexture: tried to pass a null string as video name!");
			return false;
		}
		return true;
	}
	
	
	override public void OnDestroy(){		
		destroyMyVideoObject();
		//remove the reference to the script
		base.OnDestroy();
	}


	public void createVideoObject(){
		VideoObject cachedObj = videoObject;
		//create a new movie object reference with the path
		videoObject = new VideoObject(fullPathToMovie);
		//set it to use the full path, instead of one relative to your video manager's pre-set path
		videoObject.setUseAbsolutePath(true);
		//store the settings that you setup in the inspector.
		videoObject.initFrom(cachedObj);
	}
	
	public void loadMyVideoObject(){
		//add the only movie to the queue that should be there...	
		videos.Add(fullPathToMovie);

		//create a video object
		createVideoObject();
		
		if(!System.String.IsNullOrEmpty(fullPathToMovie)){
			videoManagerScript.preLoadedInstances.Add(fullPathToMovie, videoObject);
			videoManagerScript.loadingVideo = fullPathToMovie;
			videoObject.preLoadVideo();
		}
	}
	
	public override void reloadMyVideoObject(){
		destroyMyVideoObject();
		loadMyVideoObject();
	}
	
	public void destroyMyVideoObject(){
		if(videos.Count > 0)
		videos.RemoveAt(0);
		//destroy the movie object that relates to the movie loaded.
		videoObject.destroyVideoObject();
		//remove the reference to the VideoObject instance
		videoManagerScript.preLoadedInstances.Remove(fullPathToMovie);	
	}


}
