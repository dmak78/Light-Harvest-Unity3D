// Copyright (c) 2010 Bob Berkebile
// Modifications 2012 Brian Chasalow for OSX VideoTexture Pro - brian@chasalow.com
// Please direct any bugs/comments/suggestions to http://www.pixelplacement.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

using UnityEngine;
using System.Collections;


public class Backdrop : MonoBehaviour
{
public enum AspectRatio{
	AspectFit, AspectFill
}

	public float distance = 500;
	public AspectRatio aspectRatio = AspectRatio.AspectFit;
	private AspectRatio prevAspectRatio;
	private Mesh mesh;
	private MeshFilter meshFilter;
	private MeshRenderer meshRenderer;
	private float prevDistance;
	private Vector3 prevRotation, prevPosition;
	private Camera mainCamera;
	private float textureWidth = 1.0f;
	private float textureHeight = 1.0f;
	private float screenWidth = 0;
	private float screenHeight = 0;
	private Vector2 offset;
	void Start ()
	{
		
		mainCamera = Camera.main;
		
		meshFilter = gameObject.GetComponent<MeshFilter>();
		if(!meshFilter)
		gameObject.AddComponent<MeshFilter>();
		

		meshRenderer = gameObject.GetComponent<MeshRenderer>();
		if(!meshRenderer)
		gameObject.AddComponent<MeshRenderer>();
		
		
		mesh = gameObject.GetComponent<MeshFilter>().mesh;
		mesh.Clear();
		mesh.vertices = CalcVerts();
		mesh.uv = new Vector2[] {new Vector2(0,0), new Vector2(1,0), new Vector2(0,1), new Vector2(1,1)};
		mesh.triangles = new int[] {1,0,3,3,0,2};
		
	}
		
	public void updateAspectRatio(Vector2 texWidthHeight){	
		textureWidth = texWidthHeight.x;
		textureHeight = texWidthHeight.y;
		RecalculateMesh();
	}
	
	void Update(){
		
		if(screenHeight != Screen.height || screenWidth != Screen.width){
			RecalculateMesh();
		}
		
		if(prevAspectRatio != aspectRatio)
			RecalculateMesh();
			
		//nothing needs to be recalculated if distance hasn't changed or a move/rotate was attempted on billboard moved without our permission:
		if(distance == prevDistance &&
		   mainCamera.transform.position == prevPosition &&
		   mainCamera.transform.localEulerAngles == prevRotation
		   ) return;
		
		//error for attempting a backdrop placement beyond mainCamera's far clip plane:
		if(distance > mainCamera.farClipPlane){
			Debug.LogError("Backdrop's distance is further than the mainCamera's far clip plane. Extend the mainCamera's far clip plane or reduce the billboard's distance.");
			return;
		}
		
		//error for attempting a backdrop placement before mainCamera's near clip plane:
		if(distance < mainCamera.nearClipPlane){
			Debug.LogError("Backdrop's distance is closer than the mainCamera's near clip plane. Extend the distance or reduce the mainCamera's near clip plane.");
			return;
		}
		
		
		RecalculateMesh();
	}
	
	
	public void RecalculateMesh(){
		//set backdrop's placement:
		gameObject.transform.position = mainCamera.transform.forward * distance;
		
		//calculate mesh:
		if(textureWidth == 0 || textureHeight == 0)
			return;
		mesh.vertices = CalcVerts();
		mesh.RecalculateNormals();
		
		//readjust comparison values:
		prevDistance = distance;
		prevPosition = mainCamera.transform.position;
		prevRotation = mainCamera.transform.localEulerAngles;
		screenWidth = Screen.width;
		screenHeight = Screen.height;
		prevAspectRatio = aspectRatio;
	}
	
	
	
	Vector3[] CalcVerts()
	{


		Vector2 mysize = new Vector2(textureWidth, textureHeight); // just to get the size of the original image
		float rw = mysize.x / (float)Screen.width; // width and height are maximum thumbnail's bounds
		float rh = mysize.y / (float)Screen.height;
		Vector2 newRect = Vector3.zero;
		bool aspectMethod = false;
		
		
		if(aspectRatio == AspectRatio.AspectFit)
			aspectMethod = rw > rh;
		else if(aspectRatio == AspectRatio.AspectFill)
			aspectMethod = rw < rh;

		if (aspectMethod)
		{
		    newRect.y = (float)Mathf.Ceil(mysize.y / (float)rw);
		    newRect.x = Screen.width;
		    offset.y = (Screen.height - newRect.y) *.5f;
		    offset.x = 0;
		}
		else
		{
		    newRect.x = (float)Mathf.Ceil(mysize.x / (float)rh);
		    newRect.y = Screen.height;
		    offset.x = (Screen.width - newRect.x) *.5f;
		    offset.y = 0;

		}
		
		return new Vector3[] {
			gameObject.transform.InverseTransformPoint(mainCamera.ScreenToWorldPoint(new Vector3(offset.x,offset.y,distance))),
			gameObject.transform.InverseTransformPoint(mainCamera.ScreenToWorldPoint(new Vector3(newRect.x + offset.x,offset.y,distance))),
			gameObject.transform.InverseTransformPoint(mainCamera.ScreenToWorldPoint(new Vector3(offset.x,newRect.y + offset.y,distance))),
			gameObject.transform.InverseTransformPoint(mainCamera.ScreenToWorldPoint(new Vector3(newRect.x + offset.x,newRect.y + offset.y,distance)))
		};
	}
}