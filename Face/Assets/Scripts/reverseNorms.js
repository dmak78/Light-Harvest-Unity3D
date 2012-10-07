
public var reverse : boolean;
private var originalNormals : Vector3[];
private var normals : Vector3[];
private var mesh : Mesh;
private var needChange : boolean;

function Start(){
	
	mesh = gameObject.GetComponent(MeshFilter).mesh;
	normals = mesh.normals;
	originalNormals = mesh.normals;
	
	for (var i=0;i<normals.Length;i++){
         normals[i] = -normals[i];
     }
	mesh.normals = normals;
	
	reverse = false;
	needChange = true;
}

function Update () {
	
	if(reverse && needChange){
	
		mesh = gameObject.GetComponent(MeshFilter).mesh;
		normals = mesh.normals;
	
		for (var i=0;i<normals.Length;i++){
   	      normals[i] = -normals[i];
   	  
   	  	}

		mesh.normals = normals;
		reverse = false;	
		needChange=true;
			
	}
	
}

