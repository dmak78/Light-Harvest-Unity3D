using UnityEngine;
using System.Collections;
using System;
//Copyright 2011 Brian Chasalow - brian@chasalow.com - All Rights Reserved.
public class VideoManagerSimpleGUI : MonoBehaviour {
	public string videoGUIKey = "g";
	private bool showGUI = true;
	private Rect videoMgrWindow = new Rect(20, 20, 640, 400);
	private Vector2 leftScrollPosition = new Vector2(0, 0);
	private Vector2 rightScrollPosition = new Vector2(0, 0);

	private VideoManager videoManagerScript;
	private int videoInstanceIndex = 0;
	// Use this for initialization
	void Start () {
		videoManagerScript = Camera.main.GetComponent<VideoManager>();
		if(!videoManagerScript){
			videoManagerScript = Camera.main.gameObject.AddComponent<VideoManager>();
			Debug.LogError("Balls! you don't have a video manager script on your camera yet, so I've added one now for you!");
		}

	}

	// Update is called once per frame
	void Update () {
		if( Input.GetKeyDown(videoGUIKey) ){
			if(showGUI){
				showGUI = false;
			}
			else{
				showGUI = true;
			}
		}
	}

	void OnGUI(){
		//DEV COMMENT:
		//if you press the Video GUI key that's selected in the inspector, show the window and call the window function.
		if(showGUI){
			Rect tempRect = GUI.Window(0, videoMgrWindow, ShowMyWindow, "Video Textures on GameObjects");
			videoMgrWindow = new Rect( Mathf.Clamp(tempRect.x, 0, Screen.width - tempRect.width),
				Mathf.Clamp(tempRect.y, 0, Screen.height - tempRect.height), tempRect.width, tempRect.height);
		}
		//otherwise, don't show the window.
	}



	void ShowMyWindow(int mywind){
		GUILayout.BeginHorizontal();

		leftScrollPosition = GUILayout.BeginScrollView (leftScrollPosition);
		//you can close and then open again to re-preload your videoDirectory
		if(GUILayout.Button("reload videos from disk")){
			videoManagerScript.closeVideoPlayer();
			videoManagerScript.openVideoPlayer();
			
			videoManagerScript.reloadVideoTextureSimpleVideoObjects();
		}	
		// if(GUILayout.Button("close videos on disk"))
		// 	videoManagerScript.closeVideoPlayer();
		// if(GUILayout.Button("open videos on disk"))
		// 	videoManagerScript.openVideoPlayer();
		
		if( videoInstanceIndex <  videoManagerScript.myVideoTextures.Count){
			GUILayout.Label("Selected: \n" + videoManagerScript.myVideoTextures[videoInstanceIndex].gameObject.name );
		}
		
		for (int i = 0; i < videoManagerScript.myVideoTextures.Count; i++){
			if(GUILayout.Button(videoManagerScript.myVideoTextures[i].gameObject.name)){
				videoInstanceIndex = i;
			}
		}
		GUILayout.EndScrollView();

		rightScrollPosition = GUILayout.BeginScrollView (rightScrollPosition);
		if( videoInstanceIndex <  videoManagerScript.myVideoTextures.Count){
			videoManagerScript.myVideoTextures[videoInstanceIndex].drawGUI();
		}
		GUILayout.EndScrollView();
		
		GUILayout.EndHorizontal();
		GUI.DragWindow();

	}
}
