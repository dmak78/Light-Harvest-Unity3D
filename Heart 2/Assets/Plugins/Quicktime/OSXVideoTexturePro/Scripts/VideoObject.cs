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
//Copyright 2011 Brian Chasalow - brian@chasalow.com - All Rights Reserved.		

//this is the interface class to each video player instance in C++
[System.Serializable]
public class VideoObject  {
	
	//CONSTRUCTOR
	[DllImport ("OSXVideoTexturePro")]
		//create a new video instance. called once for each movie file.
		private static extern IntPtr createVideoInstance();
	//DESTRUCTOR
	[DllImport ("OSXVideoTexturePro")]
		//kills the video instance (only use on quit or object-disable)
		private static extern void killVideoInstance(IntPtr videoInstance);		
	[DllImport ("OSXVideoTexturePro")]
		//takes in video instance returned from createVideoInstance, the filename, and whether the video isPaused on load or not
		private static extern void loadVideo(IntPtr videoInstance, string videoPath, bool isPaused, bool absolutePath = false);
		
	
	//SETTERS:
	[DllImport ("OSXVideoTexturePro")]
		public static extern void setPaused(IntPtr videoInstance, bool isPaused);
	[DllImport ("OSXVideoTexturePro")]
		private static extern void setVolume(IntPtr videoInstance, float myVol);
	[DllImport ("OSXVideoTexturePro")]
		public static extern void setLoopState(IntPtr videoInstance, int loopState);
	[DllImport ("OSXVideoTexturePro")]
		private static extern void setSpeed(IntPtr videoInstance, float speed);
	[DllImport ("OSXVideoTexturePro")]
		private static extern void setFrame(IntPtr videoInstance, int frame);
	[DllImport ("OSXVideoTexturePro")]
		private static extern void setPosition(IntPtr videoInstance, float videoPosition);

	//GETTERS:
	[DllImport ("OSXVideoTexturePro")]
		private static extern float getSpeed(IntPtr videoInstance);
	//returns position in seconds, of duration in seconds
	[DllImport ("OSXVideoTexturePro")]
		private static extern float getPosition(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern float getDuration(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern int getCurrentFrame(IntPtr videoInstance);		
	[DllImport ("OSXVideoTexturePro")]
		private static extern int getTotalNumFrames(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern int getLoopState(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern bool getIsMovieDone(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern int getWidth(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern int getHeight(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern bool isLoaded(IntPtr videoInstance);
	[DllImport ("OSXVideoTexturePro")]
		private static extern bool isLoading(IntPtr videoInstance);

	public enum VideoLoopType{
		LOOP_NONE, LOOP_NORMAL, LOOP_QUEUE
		};
		
		public static string[] videoLoopTypeStrings = {"VideoLoopType.LOOP_NONE", "VideoLoopType.LOOP_NORMAL", "VideoLoopType.LOOP_QUEUE" };
		[SerializeField]	
		private string videoName;
		private IntPtr videoInstance = (IntPtr)0;
		[SerializeField]
		private bool isVideoLoaded = false;
		[SerializeField]
		private bool errorVideoLoading = true; //assume by default there was an error loading. when successfully loaded, this will be marked as no error.
		[SerializeField]
		private float videoSpeed = 1.0f;
		[SerializeField]
		private float videoVolume = 0.0f;
		[SerializeField]
		private int videoWidth = 0;
		[SerializeField]
		private int videoHeight = 0;
		[SerializeField]
		private bool isPaused = true;
		[SerializeField]
		private VideoLoopType videoLoopType = VideoLoopType.LOOP_QUEUE;
		[SerializeField]
		private bool useAbsolutePath = false;
		[SerializeField]
		private int videoFrameCount = 1;
		[SerializeField]
		private float videoDuration = 0.0f;
		
		private float videoPos, videoSeconds, videoMs, videoMinutes;
		private int videoHours;

		//constructors
		public VideoObject(string n){
			setVideoName(n);
			createVideoObject();
		}


		public void setVideoProperties(){
			setVideoWidthAndHeight();
			setVideoTotalFrames();
			setVideoDuration();
			
		}
		
		public void setUseAbsolutePath(bool trueOrFalse){
			useAbsolutePath = trueOrFalse;
		}

		public int getVideoTotalFrames(){
			return videoFrameCount;
		}

		public void setVideoTotalFrames(){
			if(videoInstance != (IntPtr)0)
			videoFrameCount = getTotalNumFrames(videoInstance);
		}
		
		public float getVideoDuration(){
			return videoDuration;
		}

		public void setVideoDuration(){
			if(videoInstance != (IntPtr)0){
			videoDuration = getDuration(videoInstance);
			}

		}
		
		

		public bool getUseAbsolutePath(){
			return useAbsolutePath;
		}

		
		
		//name
		public void setVideoName(string myName){
			videoName = myName;
		}
		public string getVideoName(){
			return videoName;
		}


		//createVideoInstance
		private void createVideoObject(){
			videoInstance = createVideoInstance();
		}
		public IntPtr getVideoInstance(){
			return videoInstance;
		}
		//destroyVideoInstance
		public void destroyVideoObject(){
			IntPtr cachedInstance = videoInstance;
			videoInstance = (IntPtr)0;
			videoName = "";
			isVideoLoaded = false;
			errorVideoLoading = true;
			killVideoInstance(cachedInstance);
		}
		
		//preloadvideo
		public void preLoadVideo(){
			if(videoInstance != (IntPtr)0){
				loadVideo(videoInstance, videoName, true, useAbsolutePath);
				//always start a video paused initially. you can set it to go whenever, later on
			}	
		}
		
		//videoLoaded
		public void setVideoLoaded(bool myLoaded){
			isVideoLoaded = myLoaded;
		}
		public bool getIsVideoLoaded(){
			return isVideoLoaded && videoInstance != (IntPtr)0;
		}
		
		//videoLoopType
		public void setVideoLoopType(VideoObject.VideoLoopType loopType){
			videoLoopType = loopType;
			if(videoInstance != (IntPtr)0)
			setLoopState(videoInstance, (int)videoLoopType);
			
		}
		public VideoLoopType getVideoLoopType(){
			return videoLoopType;
		}
		
		
		//set/get errorVideoLoading
		public void setVideoErrorLoading(bool myError){
			errorVideoLoading = myError;
		}
		public bool getErrorVideoLoading(){
			return errorVideoLoading;
		}
		
			
		//speed
		public void setVideoSpeed(float myspeed){
			videoSpeed = myspeed;
			if(videoInstance != (IntPtr)0){
				setSpeed(videoInstance, videoSpeed);
			}
		}
		public float getVideoSpeed(){
			return videoSpeed;
		}


		//volume
		public void setVideoVolume(float myVolume){
			videoVolume = myVolume;
			if(videoInstance != (IntPtr)0){
				setVolume(videoInstance, videoVolume);
			}
		}
		public float getVideoVolume(){
			return videoVolume;
		}
		
		

		//videoWidthAndHeight
		public void setVideoWidthAndHeight(){
			if(videoInstance != (IntPtr)0){
				videoWidth = getWidth(videoInstance);
				videoHeight = getHeight(videoInstance);
			}	
		}
		public int getVideoWidth(){
			return videoWidth;
		}
		public int getVideoHeight(){
			return videoHeight;
		}

		//paused
		public void setVideoPaused(bool myIsPaused){
			isPaused = myIsPaused;
			if(videoInstance != (IntPtr)0){
				setPaused(videoInstance, isPaused);
			}
		}
		public bool getVideoPaused(){
			return isPaused;
		}

		//video position
		public void setVideoPosition(float myPos){
			if(videoInstance != (IntPtr)0)
			setPosition(videoInstance, myPos);
		}
		public float getVideoPosition(){
			if(videoInstance != (IntPtr)0)
				return getPosition(videoInstance);
			else
				return 0;
		}
		
		
		public void setVideoFrame(int myPos){
			if(videoInstance != (IntPtr)0)
			setFrame(videoInstance, myPos);
		}
		public int getVideoFrame(){
			if(videoInstance != (IntPtr)0)
				return getCurrentFrame(videoInstance);
			else
				return 0;
		}
		
		

//gui drawing methods
	//this is a simple GUI to control the video. see VideoManagerSimpleGUI.cs for its use
	public void drawGUI(){		
		GUILayout.Label("Video Options:");
		drawTimeline(false);
		drawSpeed();
		drawVolume();
		drawLoopState();
		drawIsPaused();
	}
		
	
	public void drawLoopState(){
		GUI.changed = false;
		videoLoopType = (VideoLoopType)GUILayout.SelectionGrid((int)videoLoopType, videoLoopTypeStrings, 2);
		if(GUI.changed){
			if(videoInstance != (IntPtr)0)
				setLoopState(videoInstance, (int)videoLoopType);
		}
	}
	
	//gui method
	public void drawTimeline(bool drawTime){
		if(videoInstance != (IntPtr)0){
			videoPos = getPosition(videoInstance);
						
			//TIME setting
			GUILayout.BeginHorizontal();			
			if(drawTime){ //this is here if you want to display the timeline...
				videoSeconds = videoPos;
				videoMs = (videoSeconds%60.0f) % 1.0f;
				videoMinutes = Mathf.Floor(videoSeconds/60.0f);
				videoHours = (int)(Mathf.Floor((videoSeconds/60.0f) / 60.0f));
			
			
			GUILayout.Label(String.Format("Time::{0:00}::{1:00}::{2:00}::{3:00}", videoHours, videoMinutes%60, videoSeconds%60, videoMs*100), GUILayout.ExpandHeight(false), GUILayout.Height(25), GUILayout.Width(120));
			
			}
			else{
				GUILayout.Label("Timeline: ", GUILayout.Width(80));
			}
			GUI.changed = false;
			videoPos = GUILayout.HorizontalSlider(videoPos, 0, videoDuration, GUILayout.ExpandWidth(false), GUILayout.Width(100));
			if(GUI.changed){
				if(videoInstance != (IntPtr)0){
				setPosition(videoInstance, videoPos);
				setPaused(videoInstance, isPaused);
				}

			}
			if(GUILayout.Button("0")){
				setPosition(videoInstance, 0);
			}
			GUILayout.EndHorizontal();
		}		
	}
	
	//gui method
	public void drawCurrentlyPlayingDetails(){
			GUILayout.Label( videoName  + ", " + videoWidth + "x" + videoHeight);
	}
	
	//gui method
	public void drawIsPaused(){
		if(isPaused){
			if(GUILayout.Button("PAUSED. press to play", GUILayout.ExpandWidth(false))){
				isPaused = false;
				if(videoInstance != (IntPtr)0)
				setPaused(videoInstance, isPaused);
			}
		}
		else{
			if(GUILayout.Button("PLAYING. press to pause", GUILayout.ExpandWidth(false))){
				isPaused = true;
				if(videoInstance != (IntPtr)0)
				setPaused(videoInstance, isPaused);
				
			}
		}
	}

	//gui method
	public void drawIsPausedEditor(){
		if(isPaused){
			if(GUILayout.Button("Will be paused on Start", GUILayout.ExpandWidth(false))){
				isPaused = false;
				if(videoInstance != (IntPtr)0)
				setPaused(videoInstance, isPaused);
			}
		}
		else{
			if(GUILayout.Button("Will autoPlay on Start", GUILayout.ExpandWidth(false))){
				isPaused = true;
				if(videoInstance != (IntPtr)0)
				setPaused(videoInstance, isPaused);
				
			}
		}
	}
	
	
	//gui method
	public void drawSpeed(){
	
			//SPEED setting
			GUILayout.BeginHorizontal();
			GUILayout.Label(String.Format("Speed::{0:N}", videoSpeed), GUILayout.Width(80));		
			GUI.changed = false;
			videoSpeed = GUILayout.HorizontalSlider(videoSpeed, 0, 4.0f, GUILayout.ExpandWidth(false), GUILayout.Width(100));	
			if(GUI.changed){
				if(videoInstance != (IntPtr)0){
				setSpeed(videoInstance, videoSpeed);
				//isPaused = isPaused; // call getter and setter to apply to plugin
				isPaused = false;
				}
			}
		
			if(GUILayout.Button("reset")){
				videoSpeed = 1;
				if(videoInstance != (IntPtr)0)
				setSpeed(videoInstance, videoSpeed);
			}
			GUILayout.EndHorizontal();
			//END SPEED
			
	}
	//gui method
	public void drawVolume(){
		
			//VOLUME setting
			GUILayout.BeginHorizontal();
			GUILayout.Label(String.Format("Volume::{0:N}", videoVolume), GUILayout.Width(80));		
			GUI.changed = false;
			videoVolume = GUILayout.HorizontalSlider(videoVolume, 0.0f, 1.0f, GUILayout.ExpandWidth(false), GUILayout.Width(100));	
			if(GUI.changed){
				if(videoInstance != (IntPtr)0)
				setVolume(videoInstance, videoVolume);
			}
			GUILayout.EndHorizontal();
			//END VOLUME
	
	}
	
	//this lets you init a null VideoObject (used on the VideoTexture object as a way to store properties before videos are loaded)
	public VideoObject(){
		
	}

	public void initFrom(VideoObject copy){
		if(videoInstance != (IntPtr)0){
			
			setVideoVolume(copy.videoVolume);
			setVideoSpeed(copy.videoSpeed);
			setVideoPaused(copy.isPaused);
			setVideoLoopType(copy.videoLoopType);
			
			if(copy.isPaused)
			setVideoFrame(0);
		}
	}


	}
