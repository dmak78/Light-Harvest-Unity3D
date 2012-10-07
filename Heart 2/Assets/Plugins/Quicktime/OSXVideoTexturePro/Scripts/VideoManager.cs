using UnityEngine;
using System.Collections;
using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.IO;
using System.Runtime.InteropServices;
using System.Collections.Generic;
// This class manages the video players for all objects in a scene.
// This script goes on your main camera.
// Copyright 2011 Brian Chasalow - brian@chasalow.com - All Rights Reserved.
public class VideoManager : MonoBehaviour {

	//SHUTDOWN
	[DllImport ("OSXVideoTexturePro")]
		private static extern void killOSXVideoTexturePro();
	//TOOLS	
	//SETUP OPENGL
	[DllImport ("OSXVideoTexturePro")]
		private static extern void initVideoPathEditor(string whatevs);
	[DllImport ("OSXVideoTexturePro")]
		private static extern void initVideoPath();
	//SETUP CALLBACKS FROM PLUGIN
	[DllImport ("OSXVideoTexturePro")]
		private static extern void initCallbacksEditor(string myPath);
	[DllImport ("OSXVideoTexturePro")]
		private static extern void initCallbacks();		
	//UPDATE
	#if UNITY_3_4
	[DllImport ("OSXVideoTexturePro")]
		private static extern void updateOSXVideoTexturePro();

	[DllImport ("OSXVideoTexturePro")]
		private static extern void initVideo();
	#endif
		
	[DllImport ("OSXVideoTexturePro")]
		private static extern void pluginUpdate();
	//PRIVATE
	private bool isEditor = false;
	private string movieBundleFolder;
	private static int updateContext = 1;
	//you may change these and add additional movie file types if desired
	private string[] validFileTypes = new string[] { "*.avi", "*.mov", "*.m4v", "*.mp4" };

	//PUBLIC
	public int currentlyLoadingIndex = 0;
	public bool initialized = false;
	public bool videosAreLoading = false;
	public List<VideoTexture> myVideoTextures = new List<VideoTexture>();
	public string videoDirectory = "/Users/bc/Plugins/please/select/a/folder/";
	public string[] folderDirObjects = new string[0];
	public bool useMovieResourcesBundle = true;
	public Texture2D nullTexture;
	//this keeps a list of keys, to keep track of which preLoadedInstances are left to preload.
	public List<string>videosToLoad = new List<string>();
	public string loadingVideo = "";
	public Dictionary<string, VideoObject> preLoadedInstances = new Dictionary<string, VideoObject>();



	void Awake() {		
		//------------always necessary, for callbacks to work--------------------

		//this must be true so that quicktime doesn't crash your app when you alt-tab due to QuickTime's thread tasking.
		//in later versions i may try to figure out a way to pause the plugin when alt tab-ing.
		Application.runInBackground = true;
		
		movieBundleFolder = Application.dataPath + "/Plugins/MovieResources.bundle/";	
		#if UNITY_EDITOR
		string mystring = System.IO.Directory.GetParent(Application.dataPath) + "/Library/ScriptAssemblies/Assembly-CSharp-firstpass.dll";
		//gets the path of the plugin assembly in the editor
		initCallbacksEditor(mystring);
		isEditor = true;
		#endif
		
		#if UNITY_STANDALONE_OSX
		if(!isEditor){
		//calls an alternate callback init fn that gets the internal path of the application bundle
		initCallbacks();
		}
		#endif

		#if UNITY_3_4
		initVideo();
		#endif
		//----------------------------------------------------------------------

		
		createNullTexture();
		//you don't need to run this in start if you don't need to. you can initialize it later... 
		openVideoPlayer();
	}
	
	
	//a black texture is used to make sure you're not rendering garbage to textures. you only ever need one, so create it here.
	public void createNullTexture(){
		nullTexture = new Texture2D(64, 64, TextureFormat.ARGB32, false);
		Color[] pixels = new Color[nullTexture.width*nullTexture.height];
		for(int i = 0; i < pixels.Length; i++){
			pixels[i] = new Color(0, 0, 0, 1);
		}
		nullTexture.SetPixels(pixels);
		nullTexture.Apply();
	}
	
	public void openVideoPlayer(){
		if(!initialized && !videosAreLoading){

		#if UNITY_EDITOR
			if(useMovieResourcesBundle)
			initVideoPathEditor(movieBundleFolder);
			else
			initVideoPathEditor(videoDirectory);
		#endif
		
		#if UNITY_STANDALONE_OSX
		if(!isEditor){
			if(useMovieResourcesBundle)
			initVideoPath(); //this finds the MovieResources.bundle relative to the .app when it runs it	
			else
			initVideoPathEditor(videoDirectory);
		}
		#endif

		
		//make sure all the video instances in the game are up to date
		refreshVideoTextureLinks();

		//list all the files in the directory that you're about to load
		if(useMovieResourcesBundle)
			listDirectory(movieBundleFolder);
		else
			listDirectory(videoDirectory);
		
		//begin to load all those files, one by one.
		preLoadAllFiles();
		checkForInvalidMoviesInQueue();
		videosAreLoading = true;
		}
		
	}



	public void reloadVideoTextureSimpleVideoObjects(){
		//if the video player has a self-managed video object, reload it
		foreach(VideoTexture myTexture in myVideoTextures)
			myTexture.reloadMyVideoObject();
	}

	void OnDisable(){
		closeVideoPlayer();
	}
		
	public void closeVideoPlayer(){
		initialized = false;
		foreach(KeyValuePair<string,VideoObject> entry in preLoadedInstances)
		{
			entry.Value.destroyVideoObject();
		}
							
		 preLoadedInstances = new Dictionary<string, VideoObject>();
   		 videosToLoad = new List<string>();
		 killOSXVideoTexturePro();
	}
	
	
	
	//this will be called remotely from the plugin using assembly search, caching and call with mono_runtime_invoke
	//'myptr' refers to the video instance of the movie it found. if myptr is null when it returns from this method,
	// the plugin is saying the movie didn't load successfully. 
	//thus, it attempts to load the next movie, if there is one in the queue to load.	
	public static void videoLoaded(IntPtr myptr, bool loadSuccess){
		VideoManager self = Camera.main.gameObject.GetComponent<VideoManager>();
		VideoObject myObject = new VideoObject();
		foreach(KeyValuePair<string,VideoObject> entry in self.preLoadedInstances)
		{
			if(myptr == entry.Value.getVideoInstance())
				myObject = entry.Value;
		}
		
		if(self.videosToLoad.Count == 0){
			self.loadingVideo = "";
		}
		if(!loadSuccess){
			Debug.LogError(myObject.getVideoName() + " did not load successfully, returned false from plugin.");
					//this is tagged as such so that the video manager inspector can display an error message.
					myObject.setVideoErrorLoading(true);
			
				//move on to the next video to load, and if you're not at the end of the loading list, load that.
				if(self.videosToLoad.Count > 0){
				self.loadingVideo = self.videosToLoad[0];
				self.preLoadedInstances[self.videosToLoad[0]].preLoadVideo();
				self.videosToLoad.RemoveAt(0);
				}
		}
		else{		
			//Debug.LogError(myObject.getVideoName() + " DID load successfully, returned true from plugin.");
			//otherwise, the movie loaded successfully, 
			//so mark the video object itself as loaded.
					myObject.setVideoLoaded(true);
					myObject.setVideoProperties();
					myObject.setVideoErrorLoading(false);
					foreach(VideoTexture myTexture in self.myVideoTextures){
						if(myTexture.videos.Count > 0 && myTexture.videos[myTexture.playingVideoIndex] == myObject.getVideoName())
						myTexture.beginPlayback();
					}
					//move on to the next, and load that.
					if(self.videosToLoad.Count > 0){
					self.loadingVideo = self.videosToLoad[0];
					self.preLoadedInstances[self.videosToLoad[0]].preLoadVideo();
					self.videosToLoad.RemoveAt(0);
					}
		}

	}
	

	//this will be called remotely from the plugin
	public static void videoEnded(IntPtr myptr){

	VideoManager self = Camera.main.gameObject.GetComponent<VideoManager>();
		for(int i = 0; i < self.myVideoTextures.Count; i++){
			if(myptr == self.myVideoTextures[i].videoObject.getVideoInstance()){
				//THIS VIDEO (at myptr) HAS ENDED.
				self.myVideoTextures[i].videoEnded();
				//does not return immediately, so that all callbacks on all instances are loaded-
				// in case the sample video is attached to multiple instances
			}
		}
	}

	public void addInstance(VideoTexture addMe){
		if(!myVideoTextures.Contains(addMe)){
			myVideoTextures.Add(addMe);
		}
	}
	public void removeInstance(VideoTexture removeMe){
		if(myVideoTextures.Contains(removeMe)){
			myVideoTextures.Remove(removeMe);
		}
	}


	//find all video instance scripts in the game and make sure they are up to date
	public void refreshVideoTextureLinks(){
		myVideoTextures = new List<VideoTexture>();
		VideoTexture[] videoTextures = GameObject.FindObjectsOfType( typeof(VideoTexture))as VideoTexture[];
		for(int i = 0; i < videoTextures.Length; i++){
			addInstance(videoTextures[i]);
		}	
	}
	
	
	//this method compares the folderDirObjects with each video instance's queuelist (myInstance.videos),
	// and removes any objects from the queuelist that do not exist in the folderDirObjects array. 
	//this has been disabled in the provided example,
	// but can be re-enabled by uncommenting in VideoManager.openVideoPlayer() and VideoManagerInspector.OnInspectorGUI()
	public void checkForInvalidMoviesInQueue(){
		foreach(VideoTexture myInstance in myVideoTextures){
			List<string> killObjects = new List<string>();
			for(int j = 0; j < myInstance.videos.Count; j++){
				bool found = false;
				for(int i = 0; i < folderDirObjects.Length; i++){
					if(folderDirObjects[i] == myInstance.videos[j])
						found = true;
				}
				//if you didn't find the video in the queue list, add it to a list of objects to remove
				if(!found)
					killObjects.Add(myInstance.videos[j]);
			}
			//finally, remove any invalid objects from the queue
			foreach(string objToKill in killObjects){
				myInstance.videos.Remove(objToKill);
			}
		}
	}
	

	

	public int listDirectory(string myDirectory){
		DirectoryInfo dir = new DirectoryInfo(myDirectory);
		if(!dir.Exists){
			return -1;//dir.Create();
		}
		List<System.IO.FileInfo> info = new List<System.IO.FileInfo>();
		//list of valid fileTypes
		foreach (string pattern in validFileTypes)
		{
			info.AddRange(dir.GetFiles(pattern, System.IO.SearchOption.TopDirectoryOnly));
		}			
		if(info != null){
			folderDirObjects = new string[info.Count];
			for(int i = 0 ; i < info.Count; i++){
				folderDirObjects[i] = info[i].Name + "";
			}		
		}
		
		return 0;
	}//end listDirectory

	public  void preLoadAllFiles(){
		for(int i = 0; i < folderDirObjects.Length; i++){
			//if the preloaded movie list doesn't contain the movie, add it.
			if(!preLoadedInstances.ContainsKey(folderDirObjects[i])){
				
				//this will create a new VideoInstance pointer for each VideoObject to be loaded.
				preLoadedInstances.Add(folderDirObjects[i], new VideoObject(folderDirObjects[i]));
				
				//if setUseAbsolutePath(true) is not called here, it will load that movie
				// in a location that is relative to the videoDirectory or movieBundleFolder
				//basically,
				//new VideoObject(folderDirObjects[i]) in the .Add call above, would have to become
				//new VideoObject(videoDirectory + folderDirObjects[i])
				//if you call:
				//preLoadedInstances[folderDirObjects[i]].setUseAbsolutePath(true);

				//if it's the first index, start the loading of movies.
				if(i == 0){
				preLoadedInstances[folderDirObjects[i]].preLoadVideo();
				loadingVideo = folderDirObjects[i];
				}
				else{
					videosToLoad.Add(folderDirObjects[i]);
				}
			}
		}
	}
	


	public void drawVideo(){		
		#if UNITY_3_4
		updateOSXVideoTexturePro();
		#endif
		
		#if UNITY_3_5
		//update
		pluginUpdate();
		//cache context and update video renderers for all movies
		GL.IssuePluginEvent(updateContext);
		#endif
		
//		GL.InvalidateState();
	}

	

	void OnPreRender() {
		drawVideo();	
		//initialized means you're done preloading the movies and can play them.
		//videosAreLoading is only true while movies still need to be loaded.
		//loadingVideo == "" implies that the loading queue has loaded all the movies in the folder
		if(!initialized && videosAreLoading && loadingVideo == ""){
			videosAreLoading = false;
			initialized = true;
		}
	}

 }
