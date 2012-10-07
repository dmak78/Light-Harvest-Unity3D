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
[CustomEditor(typeof(VideoManager) )]
public class VideoManagerInspector : Editor {
	int directoryStatus = 0;
	
	public override void OnInspectorGUI(){
		//DrawDefaultInspector();
		VideoManager mytarget = target as VideoManager;
		
		if(mytarget.useMovieResourcesBundle){
			
			if(GUILayout.Button("using MovieResources bundle. click to change", GUILayout.ExpandWidth(false))){
				mytarget.useMovieResourcesBundle = !mytarget.useMovieResourcesBundle;	
			}
			GUILayout.Label("videos Directory: \n" + Application.dataPath + "/Plugins/MovieResources.bundle/");
			directoryStatus = mytarget.listDirectory(Application.dataPath + "/Plugins/MovieResources.bundle/");
			//find all video instances.
			mytarget.refreshVideoTextureLinks();
			//find any invalid movie names and remove 'em from any video instances' queues
			mytarget.checkForInvalidMoviesInQueue();
		}
		else{
			if(GUILayout.Button("click to use MovieResources bundle", GUILayout.ExpandWidth(false))){
				mytarget.useMovieResourcesBundle = !mytarget.useMovieResourcesBundle;	
			}
			GUILayout.Label("videos Directory: \n" + mytarget.videoDirectory);
			directoryStatus = mytarget.listDirectory(mytarget.videoDirectory);
			//find all video instances.
			mytarget.refreshVideoTextureLinks();
			//find any invalid movie names and remove 'em from any video instances' queues
			mytarget.checkForInvalidMoviesInQueue();

		}
		
		if(!mytarget.useMovieResourcesBundle && GUILayout.Button("Set New Video Directory Path", GUILayout.ExpandWidth(false))){
			
			string dir = EditorUtility.OpenFolderPanel("Load Videos Directory", "", "");
			Undo.RegisterUndo(mytarget, "set video dir: " + dir);
			
			if(dir != ""){
				mytarget.videoDirectory = dir + "/";
			}
			directoryStatus = mytarget.listDirectory(mytarget.videoDirectory);
			
			//find all video instances.
			mytarget.refreshVideoTextureLinks();
			//find any invalid movie names and remove 'em from any video instances' queues
			mytarget.checkForInvalidMoviesInQueue();

			
		}
		if(directoryStatus == -1){
			GUILayout.Label("Directory Invalid!");
			GUILayout.Label("Please select a new location.");
		}
		if(mytarget.folderDirObjects.Length == 0){
			GUILayout.Label("No Files Found!");
			GUILayout.Label("Please select a new location.");
		}
		
		EditorGUILayout.BeginHorizontal();
		GUILayout.Label("Files to be loaded : " + mytarget.folderDirObjects.Length);
		EditorGUILayout.Popup(0, mytarget.folderDirObjects);
		EditorGUILayout.EndHorizontal();
		
		
		if(EditorApplication.isPlaying){
			//check all entries and display any errors with loading
			
			if(!mytarget.initialized){
//				Debug.Log("videos not initialized...");
				//display status as it loads	
				if(mytarget.videosAreLoading){
					GUILayout.Label("Videos loading... " + "Currently: " + mytarget.loadingVideo);
					GUILayout.Label(mytarget.preLoadedInstances.Count - mytarget.videosToLoad.Count + " /" + mytarget.preLoadedInstances.Count);
					GUILayout.Label("--PLEASE DO NOT UNPAUSE WHILE LOADING--");
				}
				
				//display error messages if they should be shown as it loads
				foreach(KeyValuePair<string,VideoObject> entry in mytarget.preLoadedInstances){
					if(entry.Value.getVideoWidth() != 0 && entry.Value.getErrorVideoLoading())
					GUILayout.Label(entry.Value.getVideoName() + " had a problem loading! ", GUILayout.ExpandHeight(false) );
				}
				
				
			}
			//videos done loading
			else{
				//display a note to say that videos are done loading
				if (!mytarget.videosAreLoading){
					GUILayout.Label("Videos completed loading.");
				}
				
				//list problem videos after yer done loading them all
				foreach(KeyValuePair<string,VideoObject> entry in mytarget.preLoadedInstances){
					if(entry.Value.getErrorVideoLoading())
					GUILayout.Label(entry.Value.getVideoName() + " had a problem loading! ", GUILayout.ExpandHeight(false) );
				}				
				
			}
			
			//if there were no videos...uhh...say so.
			if( mytarget.folderDirObjects.Length == 0){
				GUILayout.Label("No videos in directory, so none loaded.");				
			}
		}
	} //end OnInspectorGUI
}
