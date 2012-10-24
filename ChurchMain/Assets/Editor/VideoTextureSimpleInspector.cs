using UnityEngine;
using UnityEditor;
using System.Collections;
using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.IO;
using System.Runtime.InteropServices;
using System.Collections.Generic;
//Copyright 2011 Brian Chasalow - brian@chasalow.com - All Rights Reserved.
[CustomEditor(typeof(VideoTextureSimple) )]
public class VideoTextureSimpleInspector : Editor {
	VideoTextureSimple mytarget;
	int loopType = 0;
	public override void OnInspectorGUI(){
		//DrawDefaultInspector();
		mytarget = target as VideoTextureSimple;
		 if(!mytarget.videoManagerScript){
			mytarget.videoManagerScript = Camera.main.GetComponent<VideoManager>();
			
			if(!mytarget.videoManagerScript){
			Debug.LogError("You don't have a video manager script anywhere yet, adding one to your main cam!"); 	
			mytarget.videoManagerScript = Camera.main.gameObject.AddComponent<VideoManager>();
			}
		 }		
		
		if(mytarget.getFullPathToMovie() == ""){
			GUILayout.Label("No video selected.\nPlease select a video location.");
		}
		else{
		GUILayout.Label("Video:\n" + Path.GetFileName(mytarget.getFullPathToMovie()));
		GUILayout.Label("Loaded from Path:\n" + Path.GetDirectoryName(mytarget.getFullPathToMovie()) + "/");
		}
		
		
		GUILayout.BeginHorizontal();
		if(GUILayout.Button("Select Video Location")){
		string dir = EditorUtility.OpenFilePanel("Choose Video Path", "", "");
		if(dir != ""){
			mytarget.setFullPathToMovie(dir);
			if(EditorApplication.isPlaying){
				mytarget.destroyMyVideoObject();
				mytarget.loadMyVideoObject();
			}
		}
		Undo.RegisterUndo(mytarget, "set video dir: " + dir);
		}
		
		if(mytarget.getFullPathToMovie() != "" && EditorApplication.isPlaying && GUILayout.Button("Reload Video")){
			mytarget.destroyMyVideoObject();
			mytarget.loadMyVideoObject();
			
		}

		GUILayout.EndHorizontal();
		
		
		if(EditorApplication.isPlaying){
			if(!mytarget.videoObject.getErrorVideoLoading())
			GUILayout.Label( "Dim: " + mytarget.videoObject.getVideoWidth() + "x" + mytarget.videoObject.getVideoHeight());
			GUILayout.Label("Video Options:");
			mytarget.videoObject.drawTimeline(false);
			mytarget.videoObject.drawSpeed();
			mytarget.videoObject.drawVolume();
			drawLoopStateEditor();
			mytarget.videoObject.drawIsPaused();
			drawTextureOptionsEditor();		
		}
		else{
			GUILayout.Label("Video Options:");
			mytarget.videoObject.drawSpeed();
			mytarget.videoObject.drawVolume();
			drawLoopStateEditor();
			mytarget.videoObject.drawIsPausedEditor();
			drawTextureOptionsEditor();
		}	
	}
	
	private void drawTextureOptionsEditor(){
		GUILayout.Label("Texture Options:");
		GUI.changed = false;
		mytarget.textureType = (VideoTexture.TextureType)EditorGUILayout.Popup((int)mytarget.textureType, VideoTexture.textureTypeStrings);
		if(GUI.changed && EditorApplication.isPlaying){
			mytarget.updateTextureType();
			mytarget.textureWidth = 16;
			mytarget.textureHeight = 16;
			mytarget.resizeTexturesFromVideoResolution();
		}
	}
	
	private void drawLoopStateEditor(){
		GUI.changed = false;
		loopType = (int)mytarget.videoObject.getVideoLoopType();
		loopType = EditorGUILayout.Popup(loopType, VideoObject.videoLoopTypeStrings);
		if(GUI.changed){
			mytarget.videoObject.setVideoLoopType((VideoObject.VideoLoopType)loopType);
		}
	}
	
}
