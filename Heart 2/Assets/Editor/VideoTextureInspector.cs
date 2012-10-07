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
[CustomEditor(typeof(VideoTexture) )]
public class VideoTextureInspector : Editor {
	int videoTextureIndex = 0;
	VideoTexture mytarget;
	int loopType = 0;
	public override void OnInspectorGUI(){
		//DrawDefaultInspector();
		mytarget = target as VideoTexture;
		 if(!mytarget.videoManagerScript){
			mytarget.videoManagerScript = Camera.main.GetComponent<VideoManager>();
			
			if(!mytarget.videoManagerScript){
			Debug.LogError("You don't have a video manager script anywhere yet, adding one to your main cam!"); 	
			mytarget.videoManagerScript = Camera.main.gameObject.AddComponent<VideoManager>();
			}
		 }		
			
		if(EditorApplication.isPlaying){
			mytarget.videoObject.drawCurrentlyPlayingDetails();
			GUILayout.Label("Video Options:");
			mytarget.videoObject.drawTimeline(false);
			mytarget.videoObject.drawSpeed();
			mytarget.videoObject.drawVolume();
			drawLoopStateEditor();
			mytarget.videoObject.drawIsPaused();
			drawTextureOptionsEditor();
			drawQueueListEditor();
		
		}
		else{
			GUILayout.Label("Video Options:");
			mytarget.videoObject.drawSpeed();
			mytarget.videoObject.drawVolume();
			drawLoopStateEditor();
			mytarget.videoObject.drawIsPausedEditor();
			drawTextureOptionsEditor();
			drawQueueListEditor();
		}	
	}
	
	private void drawQueueListEditor(){
		GUILayout.Label("Queue List Video Selector:");
		
		GUILayout.BeginHorizontal();
		videoTextureIndex = EditorGUILayout.Popup(videoTextureIndex, mytarget.videoManagerScript.folderDirObjects);
		if(GUILayout.Button("Add Video", GUILayout.ExpandWidth(false)) && mytarget.videoManagerScript.folderDirObjects.Length > 0){
			Undo.RegisterUndo(mytarget, "Add video instance " + mytarget.videoManagerScript.folderDirObjects[videoTextureIndex]);
			mytarget.addAVideo(mytarget.videoManagerScript.folderDirObjects[videoTextureIndex], mytarget.videos.Count);
		}
		GUILayout.EndHorizontal();
		
			
		
		if(mytarget.videos.Count > 0 && mytarget.playingVideoIndex < mytarget.videos.Count){
			if(EditorApplication.isPlaying)
				GUILayout.Label("Queue List: Playing index " + (mytarget.playingVideoIndex) + " of " + mytarget.videos.Count );
			else
			GUILayout.Label("Queue List:");
			
			for(int i = 0; i < mytarget.videos.Count; i++){
				GUILayout.BeginHorizontal();
				
				if(GUILayout.Button(i + ": " + mytarget.videos[i])){
					mytarget.drawVideoToTexture(i);
				}
				
				//mytarget.drawGUI
				if(GUILayout.Button("<", GUILayout.ExpandWidth(false))){
					Undo.RegisterUndo(mytarget, "Move video instance Up" + mytarget.videos[i]);
					mytarget.moveUp(i);
		
				}
		
				if(GUILayout.Button(">", GUILayout.ExpandWidth(false))){
					Undo.RegisterUndo(mytarget, "Move video instance Down" + mytarget.videos[i]);
					mytarget.moveDown(i);			
				}
				
				if(GUILayout.Button("delete", GUILayout.ExpandWidth(false))){
					Undo.RegisterUndo(mytarget, "Delete video instance " + mytarget.videos[i]);
					mytarget.removeAVideo(mytarget.videos[i], i);
				}
				
			
				GUILayout.EndHorizontal();
				
			}
			
			
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
