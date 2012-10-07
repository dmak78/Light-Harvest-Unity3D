
		
private var vertices = new Vector3[66];
public var uv = new Vector2[66];
private var triangles = new int[297];
private var normals = new Vector3[297];
var material : Material;
var heightMap : Texture2D;
public var scale : float = 1.0;
var numVertices : int ;

var numTexVertices : int ;
var rotationMatrix : Vector3;




function Start () {
		gameObject.AddComponent(MeshFilter);

		if (material){
			renderer.material = material;
			
		}
		else{
			renderer.material.color = Color.white;
		}
		
		var mesh = gameObject.GetComponent(MeshFilter).mesh;
		
		mesh.vertices = vertices;
		mesh.uv = uv;
		triangles=[23, 21, 20, 
						23 ,22 ,21 ,
						36 ,1, 0 ,
						45, 16, 15, 
						0 ,17, 36 ,
						45, 26 ,16 ,
						17, 18, 37 ,
						25, 26, 44 ,
						37 ,36, 17 ,
						45, 44,26,
						18 ,19,38,
						24,25,43,
						38,37,18,
						44,43,25,
						19,20,38,
						23,24,43,
						20,21,39,
						22,23,42,
						39,38,20,
						43,42,23,
						21,22,27,
						21,27,39,
						42,27,22,
						42,28,27,
						27,28,39,
						28,42,47,
						40,39,28,
						1,36,41,
						46,45,15,
						41,2, 1,
						46,15,14 ,
						28, 29,40,
						47,29,28,
						41,40,2,
						47,46,14,
						40,29,2,
						14,29,47,
						29,3,2,
						29,14,13,
						29,30,31 ,
						35,30,29,
						3,29,31,
						35,29,13,
						33,32,30,
						34,33,30,
						32,31,30,
						35,34,30,
						31,4,3,
						35,13,12,
						48,5 ,4, 
						54,12,11,
						48,6,5,
						54,11,10,
						6,48,59,
						55,54,10,
						59,7,6,
						55,10,9,
						59,58,7,
						56,55,9,
						58,57,8,
						57,56,8 ,
						58,8,7,
						56,9,8,
						4,31,48,
						54,35,12,
						49,48,31,
						54,53,35,
						50,49,31,
						53,52,35,
						31,32,50,
						34,35,52, 
						32,33,50,
						33,34,52,
						51,50,33,
						52,51,33,
						48,49,60,
						50,60,49,
						61,60,50,
						50,51,61,
						51,52,61, 
						52,62,61,
						52,53,62,
						53,54,62,
						54,55,63,
						55,56,63,
						64,63,56,
						56,57,64,
						57,65,64,
						57,58,65 ,
						58,59,65,
						65,59, 48,
						36, 37, 41,
						41, 37, 40,
						37, 38, 40,
						38, 39, 40,
						46, 44, 45,
						47, 44, 46,
						43 ,44, 47,
						43, 47 ,42
						];
		//mesh.normals=normals;

//		var newTriangles = new int[triangles.length];
//		
//		for(var t = 0 ; t < triangles.length;t+=3){
//			newTriangles[t] = triangles[t+2];
//			newTriangles[t+1] = triangles[t+1];
//			newTriangles[t+2] = triangles[t];
//		}
		
		mesh.triangles = triangles;
		mesh.RecalculateNormals();
		mesh.RecalculateBounds();
}

function Update () {

//		transform.localRotation.eulerAngles.x = Mathf.Rad2Deg * rotationMatrix.x;
//		transform.localRotation.eulerAngles.y = Mathf.Rad2Deg * rotationMatrix.y;
//		transform.localRotation.eulerAngles.z = Mathf.Rad2Deg * rotationMatrix.z;
}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	//Debug.Log("I got a message! " + message.Values[0]);
	
	mesh = gameObject.GetComponent(MeshFilter).mesh;

	if(message.Address == "/objectVectors"){
		numVertices = 0;
		for(var j = 0 ; j < message.Values.Count; j+=3){
	
			vertices[numVertices].x = -message.Values[j];
			vertices[numVertices].y = -message.Values[j+1];
			vertices[numVertices].z = -message.Values[j+2];
			
			numVertices++;	
		}
	}	
	
	if(message.Address == "/imageVectors"){
		numTexVertices = 0;
		for(var u = 0 ; u < message.Values.Count; u+=2){
		//	uv[numTexVertices].x = Map(message.Values[u], 0, 640 , 1 , 0,true);
		//	uv[numTexVertices].y = Map(message.Values[u+1], 0, 480 , 0 , 1,true);
			uv[numTexVertices].x = message.Values[u];
			uv[numTexVertices].y = message.Values[u+1];
			numTexVertices++;	
		}
	}
		
		mesh.vertices = vertices;
		mesh.uv = uv;
		//mesh.triangles = triangles;
		//mesh.normals=normals;
		//mesh.RecalculateBounds();
		mesh.RecalculateNormals();
		
		//mesh.Optimize();
			
	
	
//	if(message.Address == "/pose/orientation"){
//		rotationMatrix.x = message.Values[0];
//		rotationMatrix.y = message.Values[1];
//		rotationMatrix.z = message.Values[2];
//	}
	Debug.Log(rotationMatrix);
}					



function Map(value : float, inputMin : float, inputMax : float, outputMin : float, outputMax : float , clamp : boolean) : float 
{
	if (Mathf.Abs(inputMin - inputMax) < Mathf.Epsilon){
		//Debug.Log("Map: avoiding possible divide by zero, check inputMin and inputMax");
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);	
		if( clamp ){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}
