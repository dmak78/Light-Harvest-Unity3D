function Update () {
 if(Input.GetKey("1")){
  Debug.Log("Using Camera One");
  camSwap(1);
 }
 if(Input.GetKey("2")){
  Debug.Log("Using Camera Two");
  camSwap(2);
 }
 if(Input.GetKey("3")){
  Debug.Log("Using Camera Three");
  camSwap(3);
 }
}
 
function camSwap(currentCam : int){
 var cameras = GameObject.FindGameObjectsWithTag("cam");
 
 for (var cams : GameObject in cameras){
  cams.GetComponent(Camera).enabled = false;
 }  
 
 var oneToUse : String = "cam"+currentCam;
 gameObject.Find(oneToUse).GetComponent(Camera).enabled = true;
}