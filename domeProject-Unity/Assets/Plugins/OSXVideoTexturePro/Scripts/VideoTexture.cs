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
public class VideoTexture : MonoBehaviour {

	//TOOLS
	[DllImport ("OSXVideoTexturePro")]
		//create a new video texture cache. Should only ever be generated once for each script, in Start()
		public static extern IntPtr createVideoTexture();
	//DESTRUCTOR
	//kills the video instance (only use on quit or object-disable)
	[DllImport ("OSXVideoTexturePro")]
		public static extern void killVideoTexture(IntPtr videoTextureInstance);
		
	//takes the texture ID of the texture you want the video to exist on,
	//texture width,
	//texture height, 
	//scale mode - OneToOne for RT's because it doesn't need to stretch the video to the texture, 
		       //or Stretch for Texture2D which stretches to fit the texture
	//the video instance,
	//the videoTextureInstance
	//this method is called to cache the values to be executed by the GL thread
	[DllImport ("OSXVideoTexturePro")]
		public static extern bool bindTextureValues(int textureId, int width, int height, int scaleMode, IntPtr videoInstance, IntPtr videoTextureInstance);
		
 	#if UNITY_3_4
	[DllImport ("OSXVideoTexturePro")]
		public static extern void UnityRenderEvent(int ptr);
	#endif




	//ENUMS:
	public enum TextureType{
		RenderTexture, Texture2D
	};
	public enum TextureScaleMode{
		OneToOne = 3, Stretch = 2
	};

 
	//FIELDS
	public VideoObject videoObject = new VideoObject();
	public int playingVideoIndex = 0;
	public VideoManager videoManagerScript; //videoManager
	public int queueListIndexSelector;
	public List<string> videos = new List<string>();
	public static string[] textureTypeStrings = {"TextureType.RenderTexture", "TextureType.Texture2D"};
	public Texture2D tex2D; //this is where the video will exist
	public RenderTexture renderTex; //this is where the video will exist
	public IntPtr videoTextureInstance = (IntPtr)0; //returned from createVideoTexture()
	public TextureType textureType = TextureType.RenderTexture;
	public int textureWidth = 0;
	public int textureHeight = 0;
	protected bool hasStarted = false;

	public virtual void OnDestroy(){
		destroyVideoTexture();
	}
	
	public void destroyVideoTexture(){
			videoObject = null;
			videoManagerScript.removeInstance(this);
		killVideoTexture(videoTextureInstance);	
	}
	
	
	public virtual void Start () {
		 videoManagerScript = Camera.main.GetComponent<VideoManager>();
		 if(!videoManagerScript){
		 	videoManagerScript = Camera.main.gameObject.AddComponent<VideoManager>();
			Debug.LogError("Balls! you don't have a video manager script anywhere.");
		 }

		PlaneScaler planeScaler = GetComponent<PlaneScaler>();
		Backdrop backdrop = GetComponent<Backdrop>();
		if(!planeScaler && !backdrop)
			gameObject.AddComponent<PlaneScaler>();

		videoManagerScript.addInstance(this);
		//setup the texture type : RenderTexture vs. Texture2D
		updateTextureType();
		
		//create the videoTextureCache ptr, for when you update things on the GL thread
		videoTextureInstance = createVideoTexture();
			
		if(videoTextureInstance == (IntPtr)0){
			Debug.LogError("You didn't have a VideoManager initialized before "  +
			"creating this video instance on " + gameObject.name +  ". Please create one and try again.");
		}	
		beginPlayback();
		
		//required for script-based initialization
		hasStarted = true;
	}

	//sets up the appropriate texture
	public void updateTextureType(){
		if(textureType == TextureType.RenderTexture){
			setupRenderTex();
		}
		else if(textureType == TextureType.Texture2D){
			setupTex2D();
		}
		
	}
	
	
	public void setupTex2D(){
		if(renderTex){
			renderTex.Release();
			RenderTexture.active = null;
		}
		if(tex2D){
			tex2D = null;
		}
			//print("creating new texture, applying it to mainTex on renderer");
			tex2D = new Texture2D(64, 64, TextureFormat.ARGB32, false);
			tex2D.filterMode = FilterMode.Bilinear;
			tex2D.wrapMode = TextureWrapMode.Repeat;
			Color[] pixels = new Color[tex2D.width*tex2D.height];
			for(int i = 0; i < pixels.Length; i++){
				pixels[i] = new Color(0, 0, 0, 1);
			}
			tex2D.SetPixels(pixels);
			tex2D.Apply();
			renderer.material.mainTexture = tex2D;
	}
	
	public void setupRenderTex(){
		if(tex2D){
			tex2D = null;
		}
		if(renderTex){
			renderTex.Release();
			RenderTexture.active = null;
		}
			//print("creating new texture, applying it to mainTex on renderer");
			renderTex = new RenderTexture(512, 512, 0, RenderTextureFormat.ARGB32);
			renderTex.filterMode = FilterMode.Bilinear;
			renderTex.wrapMode = TextureWrapMode.Clamp;
			renderTex.isPowerOfTwo = false;
			renderTex.isCubemap = false;
			renderer.material.mainTexture = renderTex;
	}


	
	//renders to the texture. renderTextures() must be called from OnWillRenderObject
	void OnWillRenderObject(){		
		renderTextures();
	}


	//this method is called from the VideoManager right before VideoManager.initialized and all the videos are marked as preloaded.
	public void beginPlayback(){
		if(videos.Count > 0 && videoManagerScript.preLoadedInstances.ContainsKey(videos[0])){
			playingVideoIndex = 0;
			if(drawVideoToTexture(playingVideoIndex))
			resizeTexturesFromVideoResolution();
		}
		else
		resizeTexturesFromVideoResolution();
		
	}
	
	
	//this attempts to load a video from the preloaded video cache,
	// stops the last video playing to this texture if nobody else is using it,
	// and calls a method to resize the texture if necessary.
	//returns true if it could find the video that has been attempted to load.
	//returns false if it can't.
	virtual public bool drawVideoToTexture(int index){
		//print(videos[index] + " is ATTEMPTING TO LOAD");
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
				
				playingVideoIndex = index;
				
				if(myObj == videoObject){
					//Debug.Log(gameObject.name + "VideoTexture:drawVideoToTexture:: trying to load an already loaded file");	
					//trying to load a video that already is playing on this object. 
					//there are a number of ways to handle this- i just chose this for myself. you may change this...
					myObj.setVideoPosition(0.0f);
					myObj.setVideoPaused(false);
					return true;
				}

				//cache old video 
				VideoObject cachedObj = videoObject;
				//test if someone else is using the currently loaded video
				bool someoneElseIsUsingTheVideo = isAnyoneElseUsingThisVideo();
				
				//assign the new video
				videoObject = myObj;
				//initialize using the volume, speed, isPaused, and loopType settings from the last video played.
				videoObject.initFrom(cachedObj);
				resizeTexturesFromVideoResolution();
				
				//clean up the old video
				if(!someoneElseIsUsingTheVideo){
					cachedObj.setVideoPosition(0.0f);
					cachedObj.setVideoPaused(true);					
				}

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
	

 	//makes sure no other gameobjects are currently playing the video that you're playing
	protected bool isAnyoneElseUsingThisVideo(){
		//if nobody else is currently using it, pause it
		for(int i = 0; i < videoManagerScript.myVideoTextures.Count; i++){
			if(videoManagerScript.myVideoTextures[i].gameObject != gameObject && videoObject == videoManagerScript.myVideoTextures[i].videoObject)
			{	//someone else is using the video, so we dont want to stop the video
				return true;
			}
		}
		return false;
	}


	public void resetAspectRatio(){
		Vector2 texWidthAndHeight = new Vector2(textureWidth, textureHeight);
		
		//planeScaler.cs and Backdrop.cs are two script examples that show how to handle this call yourself.
		//You will also need to comment line 100 and 101 above where it says gameObject.AddComponent<PlaneScaler>();
		gameObject.SendMessage("updateAspectRatio",texWidthAndHeight);		
	}
	
	//this is called every time you change the video drawing to the current texture.
	//if you want to change something based on the video's texture size, change them from this method.
	public void resizeTexturesFromVideoResolution(){
		if( videoObject.getIsVideoLoaded()&& 
		(textureWidth != videoObject.getVideoWidth() || textureHeight != videoObject.getVideoHeight() )){
			textureWidth = videoObject.getVideoWidth();
			textureHeight = videoObject.getVideoHeight();

			resetAspectRatio();

			if(textureType == TextureType.RenderTexture){
				if(textureWidth != 0 && textureHeight != 0){
					//RenderTexture.active = null;
					renderTex.Release();
					renderTex.width = textureWidth;
					renderTex.height = textureHeight;
					//blit a black texture to the rendertexture so that there isn't garbage sitting there
					//until you render video to it
					Graphics.Blit(videoManagerScript.nullTexture, renderTex);
				}
			}
			else if(textureType == TextureType.Texture2D){
				if(textureWidth != 0 && textureHeight != 0){
					int w = getPOT((int)textureWidth);
					int h = getPOT((int)textureHeight);
					if(tex2D.width != w || tex2D.height != h){
						tex2D.Resize(w,h);
						tex2D.Apply();
					}
				}
			}
		}

		refreshTextureValues();
	}



	void renderTextures() {
		//if this manager script has loaded all movies 
		if(videoManagerScript.initialized && videoObject.getIsVideoLoaded()){
				#if UNITY_3_4
				CreateLineMaterial();
				lineMaterial.SetPass(0);
				#endif

				if(textureType == TextureType.RenderTexture)
					RenderTexture.active = renderTex;
					
					#if UNITY_3_4
					UnityRenderEvent((int)videoTextureInstance);
					#endif
					
					#if UNITY_3_5
					GL.IssuePluginEvent((int)videoTextureInstance);
					#endif			
		}
	}

	// this caches the values for the texture rendering- these values will be acted upon later from the GL thread
	// (yay thread synchronization)
	public void refreshTextureValues(){
		if(textureType == TextureType.RenderTexture){	
			#if UNITY_3_4
			bindTextureValues(renderTex.GetNativeTextureID(), 
			renderTex.width, renderTex.height, (int)TextureScaleMode.OneToOne, videoObject.getVideoInstance(), videoTextureInstance);
			#endif

			#if UNITY_3_5
			bindTextureValues(renderTex.GetNativeTextureID(), 
			renderTex.width, renderTex.height, (int)TextureScaleMode.OneToOne, videoObject.getVideoInstance(), videoTextureInstance); 
			#endif
		}
		else if(textureType == TextureType.Texture2D){
			#if UNITY_3_4
			bindTextureValues(tex2D.GetNativeTextureID(),
			 tex2D.width, tex2D.height, (int)TextureScaleMode.Stretch, videoObject.getVideoInstance(), videoTextureInstance); 
			#endif
			#if UNITY_3_5
			bindTextureValues(tex2D.GetNativeTextureID(),
			 tex2D.width, tex2D.height, (int)TextureScaleMode.Stretch, videoObject.getVideoInstance(), videoTextureInstance); 
			#endif
		}
	}
	
	
	
	//returns the POT(Power of Two) texture size 1 up from whatever value you give it. I.E. give it 640, it gives you 1024.
	private int getPOT(int inputVal){
		if(inputVal <= 0)
			return 0;
		int val = inputVal; // Get input
		val--;
		val = (val >> 1) | val;
		val = (val >> 2) | val;
		val = (val >> 4) | val;
		val = (val >> 8) | val;
		val = (val >> 16) | val;
		val++; // Val is now the next highest power of 2.
		return val;
	}



	//add a video to the queue list on this instance
	public void addAVideo(string name, int i){
		int cachedCount = videos.Count;
		if(i >= videos.Count){
			videos.Add(name);
		}
		else{
			videos.Insert(i, name);
		}
		
		if(cachedCount == 0 && hasStarted){
			drawVideoToTexture(0);
		}
	}


// 	//move a video up in queue
	public void moveUp(int selectAVideoIndex){
		if(selectAVideoIndex != 0){
			if(playingVideoIndex == selectAVideoIndex){
			playingVideoIndex--;			
			}
			else if(playingVideoIndex == selectAVideoIndex-1){
				playingVideoIndex++;			
			}
		videos.Reverse(selectAVideoIndex-1, 2);
		selectAVideoIndex = Mathf.Clamp(selectAVideoIndex-1, 0, videos.Count);
		}	
	}

// 	//move a video down in queue
	public void moveDown(int selectAVideoIndex){
		if(selectAVideoIndex != videos.Count-1){
					
		if(playingVideoIndex == selectAVideoIndex){
		playingVideoIndex++;
		}
		else if(playingVideoIndex == selectAVideoIndex+1){
		playingVideoIndex--;			
		}
					
		videos.Reverse(selectAVideoIndex, 2);
		selectAVideoIndex++;
		}
	}


// 	//remove a video from the queue list on this instance
	public void removeAVideo(string name, int i){
		if(i < videos.Count && i >= 0 && videos[i] == name)
			videos.RemoveAt(i);

		//if you try to delete a movie from the queue that you are currently playing...
		if(playingVideoIndex == i){
			//play movie 0, if it exists
			if(videos.Count > 0){
				playingVideoIndex = 0;
				drawVideoToTexture(0);
			}
		}
		
		//if you are playing movie 10, but remove one at movie 5, playingVideoIndex gets decremented by 1.
		if(i < playingVideoIndex)
		playingVideoIndex--;
	}



	public void drawVideoToTexture(string loadMe){
		for(int i  = 0; i < videos.Count; i++){
			if(videos[i] == loadMe){
				//print(gameObject.name + ": FOUND THE VIDEO! named " + loadMe);
				drawVideoToTexture(i);
				return;
			}
		}
		//Debug.Log(gameObject.name + ": Tried to load, but could not find a video in preload cache named: "+ loadMe );
	}



// 	//this method is called from the plugin when a video ends.
// 	//you can use this method to perform additional game logic when a video in the queue ends.
	public void videoEnded(){
		if(playingVideoIndex < videos.Count && videos.Count > 0)
		//print("VideoInstance.cs: \"" + videos[playingVideoIndex] + "\" video ended on GameObject: \"" + gameObject.name + "\" , videoEnded() callback demo");
		StartCoroutine(nextVideo());
	}

	public IEnumerator nextVideo(){
		//there seems to be a glitch when resizing textures if you don't use wait for the end of the frame
		yield return new WaitForEndOfFrame();
		//if you're set to loop none, simply pause the video.
		if(videoObject.getVideoLoopType() == VideoObject.VideoLoopType.LOOP_NONE){
			videoObject.setVideoPaused(true);
			yield return null;
		}
		
		
		//if there are ANY videos in the queue list
		if(videos.Count > 0){
	
			//increment the playingVideoIndex by 1
			playingVideoIndex = playingVideoIndex +1;
			//if you've hit the end of the last video in the queue
			if(playingVideoIndex == videos.Count){
				//and the looptype is set to loop on the end of the queue, loop it
				if(videoObject.getVideoLoopType() == VideoObject.VideoLoopType.LOOP_QUEUE){
					drawVideoToTexture(0);
			yield return null;
				}	
				//if you've hit the last video in the queue and it's set to loop_none or loop_normal
				//keep the playing video index the same as what it was.
				playingVideoIndex = videos.Count-1;
			yield return null;
			}
			
			//you have reached this point in the method when playingVideoIndex still hasn't reached the queue end
			//if the video in queue is trying to load a valid name, load the video with that name
			if(!System.String.IsNullOrEmpty(videos[playingVideoIndex])){
				drawVideoToTexture(playingVideoIndex);
			}
			else{
				//otherwise, try again until you hit the end of the queue
				nextVideo();
			}
		}
	}

	//makes rendering work properly, clears to a 'safe' texture. only necessary for unity 3.4 and below
	static public Material lineMaterial;
	static public void CreateLineMaterial() {
		if( !lineMaterial ) {
			lineMaterial = new Material( "Shader \"Lines/Colored Blended\" {" +
				"SubShader { Pass { " +
				" Blend SrcAlpha OneMinusSrcAlpha " +
				" ZWrite Off "  +
				"} } }" );
			lineMaterial.hideFlags = HideFlags.HideAndDontSave;
			lineMaterial.shader.hideFlags = HideFlags.HideAndDontSave;
		}
	}


	//called from a runtime GUI method. editor gui method for VideoTexture is in VideoTextureInspector.cs
	public virtual void drawGUI(){
		videoObject.drawCurrentlyPlayingDetails();		
		videoObject.drawGUI();
		//drawTextureOptions();
		drawQueueList();
	}


	public void drawTextureOptions(){
		GUILayout.Label("Texture Options:");
		GUI.changed = false;
		textureType = (TextureType)GUILayout.SelectionGrid((int)textureType, textureTypeStrings, 2);
		if(GUI.changed){
			updateTextureType();
			textureWidth = 16;
			textureHeight = 16;
			resizeTexturesFromVideoResolution();
		}
	}


	public void drawQueueList(){
		if(videos.Count > 0 && playingVideoIndex < videos.Count){
			GUILayout.Label("Queue List: Playing index " + (playingVideoIndex) + " of " + videos.Count );
			for(int i = 0; i < videos.Count; i++){
				GUILayout.BeginHorizontal();

				if(GUILayout.Button(i + ": " + videos[i], GUILayout.MaxWidth(330))){
					drawVideoToTexture(i);
				}

				if(GUILayout.Button("<", GUILayout.ExpandWidth(false))){
					moveUp(i);

				}

				if(GUILayout.Button(">", GUILayout.ExpandWidth(false))){
					moveDown(i);			
				}

				if(GUILayout.Button("delete", GUILayout.ExpandWidth(false))){
					removeAVideo(videos[i], i);
				}
				GUILayout.EndHorizontal();
			}
		}
		
		GUILayout.BeginHorizontal();
		GUILayout.Label("Queue List Video Selector:",GUILayout.ExpandWidth(false));
		if(GUILayout.Button("ADD VIDEO", GUILayout.ExpandWidth(false)) && videoManagerScript.folderDirObjects.Length > 0){
			addAVideo(videoManagerScript.folderDirObjects[queueListIndexSelector], videos.Count);
		}
		GUILayout.EndHorizontal();
		queueListIndexSelector = GUILayout.SelectionGrid(queueListIndexSelector, videoManagerScript.folderDirObjects, 1, GUILayout.MaxWidth(330));
		
	}
	



	//if the derived classes have self-managed VideoObjects, handle destroying/loading them separately
	public virtual void reloadMyVideoObject(){
	}



}
