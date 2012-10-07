
//You can set these variables in the scene because they are public 
public var RemoteIP : String = "127.0.0.1";
public var SendToPort : int = 57131;
public var ListenerPort : int = 57130;
public var controller : Transform; 
private var handler : Osc;
static var messages : Array =  [0.0,0.0,0.0];
public var outputTransforms : Transform[];
public var inputs : String[];
public var outputs : float[];


public var lineSineIndex : int;
public var lineWidthIndex : int;
public var lineRotationIndex : int;
public var triExpanseIndex : int;
public var meshDistortAmpIndex : int;
public var meshDistortFreqIndex : int;
public var meshScaleIndex : int;


public var targetLineRenderer : lineRender;
public var targetTriRenderer : triangleRender;
public var targetMeshScaler : oscScale;
public var targetMeshDistort : MeshDistort;

public function Start ()
{
	
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached
	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	//handler.SetAllMessageHandler(ListenEvent);
	
	//Debug.Log("wtf");
	
	
	
//	for(var i = 0 ; i < inputs.Length; i++){
//		handler.SetAddressHandler(inputs[i], ListenEvent);
//	}
//	for(var i = 0 ; i < inputs.Length;i++){
//		handler.SetAddressHandler(inputs[i], ListenEvent);
//	}		
	//handler.SetAddressHandler("/trigger1", ListenEvent);
	handler.SetAddressHandler("/input1", ListenEvent);
	handler.SetAddressHandler("/input2", ListenEvent);
	handler.SetAddressHandler("/input3", ListenEvent);
//	handler.SetAddressHandler("/knob4", ListenEvent);
//	handler.SetAddressHandler("/knob5", ListenEvent);
//	handler.SetAddressHandler("/knob6", ListenEvent);
//	handler.SetAddressHandler("/knob7", ListenEvent);
//	handler.SetAddressHandler("/knob8", ListenEvent);
//	handler.SetAddressHandler("/knob9", ListenEvent);
//	handler.SetAddressHandler("/knob10", ListenEvent);
//	handler.SetAddressHandler("/knob11", ListenEvent);
//	handler.SetAddressHandler("/knob12", ListenEvent);
//	handler.SetAddressHandler("/knob13", ListenEvent);
//	handler.SetAddressHandler("/knob14", ListenEvent);
//	handler.SetAddressHandler("/knob15", ListenEvent);
//	handler.SetAddressHandler("/knob16", ListenEvent);
//	
//	handler.SetAddressHandler("/slider1", ListenEvent);
//	handler.SetAddressHandler("/slider2", ListenEvent);
//	handler.SetAddressHandler("/slider3", ListenEvent);
//	handler.SetAddressHandler("/slider4", ListenEvent);
//	handler.SetAddressHandler("/slider5", ListenEvent);
//	handler.SetAddressHandler("/slider6", ListenEvent);
//	handler.SetAddressHandler("/slider7", ListenEvent);
//	handler.SetAddressHandler("/slider8", ListenEvent);
//	
//	handler.SetAddressHandler("/crossfade", ListenEvent);
//	
//	handler.SetAddressHandler("/button1", ListenEvent);
//	handler.SetAddressHandler("/button2", ListenEvent);
//	handler.SetAddressHandler("/button3", ListenEvent);
//	handler.SetAddressHandler("/button4", ListenEvent);
//	handler.SetAddressHandler("/button5", ListenEvent);
//	handler.SetAddressHandler("/button6", ListenEvent);
//	handler.SetAddressHandler("/button7", ListenEvent);
//	handler.SetAddressHandler("/button8", ListenEvent);
//	
//	handler.SetAddressHandler("/button9", ListenEvent);
//	handler.SetAddressHandler("/button10", ListenEvent);
//	handler.SetAddressHandler("/button11", ListenEvent);
//	handler.SetAddressHandler("/button12", ListenEvent);
//	handler.SetAddressHandler("/button13", ListenEvent);
//	handler.SetAddressHandler("/button14", ListenEvent);
//	handler.SetAddressHandler("/button15", ListenEvent);
//	handler.SetAddressHandler("/button16", ListenEvent);
//	
//	handler.SetAddressHandler("/button17", ListenEvent);
//	handler.SetAddressHandler("/button18", ListenEvent);
//	handler.SetAddressHandler("/button19", ListenEvent);
//	handler.SetAddressHandler("/button20", ListenEvent);
//	handler.SetAddressHandler("/button21", ListenEvent);
//	handler.SetAddressHandler("/button22", ListenEvent);
//	handler.SetAddressHandler("/button23", ListenEvent);
//	handler.SetAddressHandler("/button24", ListenEvent);
//	
//	handler.SetAddressHandler("/button25", ListenEvent);
//	handler.SetAddressHandler("/button26", ListenEvent);
//	handler.SetAddressHandler("/button27", ListenEvent);
//	handler.SetAddressHandler("/button28", ListenEvent);
//	handler.SetAddressHandler("/button29", ListenEvent);
//	handler.SetAddressHandler("/button30", ListenEvent);
//	handler.SetAddressHandler("/button31", ListenEvent);
//	handler.SetAddressHandler("/button32", ListenEvent);
//	
//	handler.SetAddressHandler("/button33", ListenEvent);
//	handler.SetAddressHandler("/button34", ListenEvent);
//	handler.SetAddressHandler("/button35", ListenEvent);
//	handler.SetAddressHandler("/button36", ListenEvent);
//	handler.SetAddressHandler("/button37", ListenEvent);
//	handler.SetAddressHandler("/button38", ListenEvent);
//	handler.SetAddressHandler("/button39", ListenEvent);
//	handler.SetAddressHandler("/button40", ListenEvent);
//	
//	handler.SetAddressHandler("/button41", ListenEvent);
//	handler.SetAddressHandler("/button42", ListenEvent);
//	handler.SetAddressHandler("/button43", ListenEvent);
//	handler.SetAddressHandler("/button44", ListenEvent);
//	handler.SetAddressHandler("/button45", ListenEvent);
//	handler.SetAddressHandler("/button46", ListenEvent);
//	handler.SetAddressHandler("/button47", ListenEvent);
//	handler.SetAddressHandler("/button48", ListenEvent);
//	
//	handler.SetAddressHandler("/button49", ListenEvent);
//	handler.SetAddressHandler("/button50", ListenEvent);
//	handler.SetAddressHandler("/button51", ListenEvent);
//	handler.SetAddressHandler("/button52", ListenEvent);
//	handler.SetAddressHandler("/button53", ListenEvent);
//	handler.SetAddressHandler("/button54", ListenEvent);
//	handler.SetAddressHandler("/button55", ListenEvent);
//	handler.SetAddressHandler("/button56", ListenEvent);
//	
//	handler.SetAddressHandler("/button57", ListenEvent);
//	handler.SetAddressHandler("/button58", ListenEvent);
//	handler.SetAddressHandler("/button59", ListenEvent);
//	handler.SetAddressHandler("/button60", ListenEvent);
//	handler.SetAddressHandler("/button61", ListenEvent);
//	handler.SetAddressHandler("/button62", ListenEvent);
//	handler.SetAddressHandler("/button63", ListenEvent);
//	handler.SetAddressHandler("/button64", ListenEvent);
//	
//	handler.SetAddressHandler("/sliderButton1", ListenEvent);
//	handler.SetAddressHandler("/sliderButton2", ListenEvent);
//	handler.SetAddressHandler("/sliderButton3", ListenEvent);
//	handler.SetAddressHandler("/sliderButton4", ListenEvent);
//	
//	handler.SetAddressHandler("/sliderButton5", ListenEvent);
//	handler.SetAddressHandler("/sliderButton6", ListenEvent);
//	handler.SetAddressHandler("/sliderButton7", ListenEvent);
//	handler.SetAddressHandler("/sliderButton8", ListenEvent);
//	
//	handler.SetAddressHandler("/crossfadeButtonLeft", ListenEvent);
//	handler.SetAddressHandler("/crossfadeButtonRight", ListenEvent);
//	
//	handler.SetAddressHandler("/preset1", ListenEvent);
//	handler.SetAddressHandler("/preset2", ListenEvent);
//	handler.SetAddressHandler("/preset3", ListenEvent);
//	handler.SetAddressHandler("/preset4", ListenEvent);
//	handler.SetAddressHandler("/preset5", ListenEvent);
//	handler.SetAddressHandler("/preset6", ListenEvent);
//	
//	handler.SetAddressHandler("/syncButton", ListenEvent);
//	
//	handler.SetAddressHandler("/crossfadeLF", ListenEvent);
//	handler.SetAddressHandler("/crossfadeR", ListenEvent);
//	handler.SetAddressHandler("/midi/note/1", ListenEvent);
}


public function ListenEvent(oscMessage : OscMessage) : void
{	
	
	Debug.Log(oscMessage.Address);
	
		switch(oscMessage.Address){
//	
		case "/input1" :	i = 0; break;
		case "/input2" :	i = 1; break;
		case "/input3" :	i = 2; break;
//		case "/knob3" :	i = 2; break;
//		case "/knob4" :	i = 3; break;
//		case "/knob5" :	i = 4; break;
//		case "/knob6" :	i = 5; break;
//		case "/knob7" :	i = 6; break;
//		case "/knob8" :	i = 7; break;
//		case "/knob9" :	i = 8; break;
//		case "/knob10" : 	i = 9; break;
//		case "/knob11" :	i = 10; break;
//		case "/knob12" :	i = 11; break;
//		case "/knob13" :	i = 12; break;
//		case "/knob14" :	i = 13; break;
//		case "/knob15" :	i = 14; break;
//		case "/knob16" :	i = 15; break;
//		
//		case "/slider1" :	i = 16; break;
//		case "/slider2" :	i = 17; break;
//		case "/slider3" :	i = 18; break;
//		case "/slider4" :	i = 19; break;
//		case "/slider5" :	i = 20; break;
//		case "/slider6" :	i = 21; break;
//		case "/slider7" :	i = 22; break;
//		case "/slider8" :	i = 23; break;
//		
//		case "/crossfade" :	i = 24; break;
//		
//		//case "/button1" :	i = 25; break;
//		case "/button2" :	i = 25; break;
//		case "/button3" :	i = 26; break;
//		case "/button4" :	i = 27; break;
//		case "/button5" :	i = 28; break;
//		case "/button6" :	i = 29; break;
//		case "/button7" :	i = 30; break;
//		case "/button8" :	i = 31; break;
//		
//		case "/button9" :	i = 32; break;
//		case "/button10" :	i = 33; break;
//		case "/button11" :	i = 34; break;
//		case "/button12" :	i = 35; break;
//		case "/button13" :	i = 36; break;
//		case "/button14" :	i = 37; break;
//		case "/button15" :	i = 38; break;
//		case "/button16" :	i = 39; break;
//		
//		case "/button17" :	i = 40; break;
//		case "/button18" :	i = 41; break;
//		case "/button19" :	i = 42; break;
//		case "/button20" :	i = 43; break;
//		case "/button21" :	i = 44; break;
//		case "/button22" :	i = 45; break;
//		case "/button23" :	i = 46; break;
//		case "/button24" :	i = 47; break;
//		
//		case "/button25" :	i = 48; break;
//		case "/button26" :	i = 49; break;
//		case "/button27" :	i = 50; break;
//		case "/button28" :	i = 51; break;
//		case "/button29" :	i = 52; break;
//		case "/button30" :	i = 53; break;
//		case "/button31" :	i = 54; break;
//		case "/button32" :	i = 55; break;
//		
//		case "/button33" :	i = 56; break;
//		case "/button34" :	i = 57; break;
//		case "/button35" :	i = 58; break;
//		case "/button36" :	i = 59; break;
//		case "/button37" :	i = 60; break;
//		case "/button38" :	i = 61; break;
//		case "/button39" :	i = 62; break;
//		case "/button40" :	i = 63; break;
//		
//		case "/button41" :	i = 64; break;
//		case "/button42" :	i = 65; break;
//		case "/button43" :	i = 66; break;
//		case "/button44" :	i = 67; break;
//		case "/button45" :	i = 68; break;
//		case "/button46" :	i = 69; break;
//		case "/button47" :	i = 70; break;
//		case "/button48" :	i = 71; break;
//		
//		case "/button49" :	i = 72; break;
//		case "/button50" :	i = 73; break;
//		case "/button51" :	i = 74; break;
//		case "/button52" :	i = 75; break;
//		case "/button53" :	i = 76; break;
//		case "/button54" :	i = 77; break;
//		case "/button55" :	i = 78; break;
//		case "/button56" :	i = 79; break;
//		
//		case "/button57" :	i = 80; break;
//		case "/button58" :	i = 81; break;
//		case "/button59" :	i = 82; break;
//		case "/button60" :	i = 83; break;
//		case "/button61" :	i = 84; break;
//		case "/button62" :	i = 85; break;
//		case "/button63" :	i = 86; break;
//		case "/button64" :	i = 87; break;
//		
//		case "/sliderButton1" :	i = 88; break;
//		case "/sliderButton2" :	i = 89; break;
//		case "/sliderButton3" :	i = 90; break;
//		case "/sliderButton4" :	i = 91; break;
//		
//		case "/sliderButton5" :	i = 92; break;
//		case "/sliderButton6" :	i = 93; break;
//		case "/sliderButton7" :	i = 94; break;
//		case "/sliderButton8" :	i = 95; break;
//		
//		case "/crossfadeButtonLeft" :	i = 96; break;
//		case "/crossfadeButtonRight" :	i = 97; break;
//		
//		case "/preset1" :	i = 98; break;
//		case "/preset2" :	i = 99; break;
//		case "/preset3" :	i = 100; break;
//		case "/preset4" :	i = 101; break;
//		case "/preset5" :	i = 102; break;
//		case "/preset6" :	i = 103; break;
//		
//		case "/syncButton" :	i = 104; break;
//		
//		case "/crossfadeLF" :	i = 105; break;
//		
//		case "/crossfadeR" :	i = 106; break;
//		case "/midi/note/1" :	i = 107; break;
//	
	}
//	
	messages[i] = oscMessage.Values[0];
//	publicMessages[i] = oscMessage.Values[0];

	

	
//	for(var o = 0 ; o < inputs.Length;o++){
//		var currentAddress : String = inputs[o];
//		if(currentAddress == oscMessage.Address){
//			outputs[o] = oscMessage.Values[0];
//		}
//	}
	
	
	
//	for(var i = 0; i < inputs.Length;i++){
//		if(inputs[i]==oscMessage.Address){
//			outputs[i]=oscMessage.Values[0];
//		}
//	}
	
	
//	var oscObj : GameObject = new GameObject("hi");
//	var oscTransform : Transform = oscObj.GetComponent(Transform);
//	oscTransform.localScale = Vector3(oscMessage.Values[0],oscMessage.Values[0],oscMessage.Values[0]);
//	oscObj.transform.parent = gameObject.Find("/OnScreen/CurrentLines").transform;
	
//	Debug.Log(oscMessage.Address);
//	if(oscMessage.Address == "/4n"){
//		messages[0]=oscMessage.Values[0];
//	}
//	if(oscMessage.Address == "/2n"){
//		messages[1]=oscMessage.Values[0];
//	}
//	if(oscMessage.Address == "/CurrentLines"){
//		messages[2]=oscMessage.Values[0];
//	}
//		if(oscMessage.Address == "/8t"){
//		messages[3]=oscMessage.Values[0];
//	}
//		if(oscMessage.Address == "/8n"){
//		messages[4]=oscMessage.Values[0];
//	}
//	
//			if(oscMessage.Address == "/env"){
//		messages[5]=oscMessage.Values[0];
//	}

//	for(var m = 0 ; m < oscMessage.Values.Count;m++){
//		Debug.Log("message" + m + " " + oscMessage.Values[m]);
//	}
	
		
		
//	switch(oscMessage.Address){
//	
//		case "/CurrentLines/1n" :	i = 0; break;
//		case "/knob2" :	i = 1; break;
//		case "/knob3" :	i = 2; break;
//		case "/knob4" :	i = 3; break;
//		case "/knob5" :	i = 4; break;
//		case "/knob6" :	i = 5; break;
//		case "/knob7" :	i = 6; break;
//		case "/knob8" :	i = 7; break;
//		case "/knob9" :	i = 8; break;
//		case "/knob10" : 	i = 9; break;
//		case "/knob11" :	i = 10; break;
//		case "/knob12" :	i = 11; break;
//		case "/knob13" :	i = 12; break;
//		case "/knob14" :	i = 13; break;
//		case "/knob15" :	i = 14; break;
//		case "/knob16" :	i = 15; break;
//		
//		case "/slider1" :	i = 16; break;
//		case "/slider2" :	i = 17; break;
//		case "/slider3" :	i = 18; break;
//		case "/slider4" :	i = 19; break;
//		case "/slider5" :	i = 20; break;
//		case "/slider6" :	i = 21; break;
//		case "/slider7" :	i = 22; break;
//		case "/slider8" :	i = 23; break;
//		
//		case "/crossfade" :	i = 24; break;
//		
//		//case "/button1" :	i = 25; break;
//		case "/button2" :	i = 25; break;
//		case "/button3" :	i = 26; break;
//		case "/button4" :	i = 27; break;
//		case "/button5" :	i = 28; break;
//		case "/button6" :	i = 29; break;
//		case "/button7" :	i = 30; break;
//		case "/button8" :	i = 31; break;
//		
//		case "/button9" :	i = 32; break;
//		case "/button10" :	i = 33; break;
//		case "/button11" :	i = 34; break;
//		case "/button12" :	i = 35; break;
//		case "/button13" :	i = 36; break;
//		case "/button14" :	i = 37; break;
//		case "/button15" :	i = 38; break;
//		case "/button16" :	i = 39; break;
//		
//		case "/button17" :	i = 40; break;
//		case "/button18" :	i = 41; break;
//		case "/button19" :	i = 42; break;
//		case "/button20" :	i = 43; break;
//		case "/button21" :	i = 44; break;
//		case "/button22" :	i = 45; break;
//		case "/button23" :	i = 46; break;
//		case "/button24" :	i = 47; break;
//		
//		case "/button25" :	i = 48; break;
//		case "/button26" :	i = 49; break;
//		case "/button27" :	i = 50; break;
//		case "/button28" :	i = 51; break;
//		case "/button29" :	i = 52; break;
//		case "/button30" :	i = 53; break;
//		case "/button31" :	i = 54; break;
//		case "/button32" :	i = 55; break;
//		
//		case "/button33" :	i = 56; break;
//		case "/button34" :	i = 57; break;
//		case "/button35" :	i = 58; break;
//		case "/button36" :	i = 59; break;
//		case "/button37" :	i = 60; break;
//		case "/button38" :	i = 61; break;
//		case "/button39" :	i = 62; break;
//		case "/button40" :	i = 63; break;
//		
//		case "/button41" :	i = 64; break;
//		case "/button42" :	i = 65; break;
//		case "/button43" :	i = 66; break;
//		case "/button44" :	i = 67; break;
//		case "/button45" :	i = 68; break;
//		case "/button46" :	i = 69; break;
//		case "/button47" :	i = 70; break;
//		case "/button48" :	i = 71; break;
//		
//		case "/button49" :	i = 72; break;
//		case "/button50" :	i = 73; break;
//		case "/button51" :	i = 74; break;
//		case "/button52" :	i = 75; break;
//		case "/button53" :	i = 76; break;
//		case "/button54" :	i = 77; break;
//		case "/button55" :	i = 78; break;
//		case "/button56" :	i = 79; break;
//		
//		case "/button57" :	i = 80; break;
//		case "/button58" :	i = 81; break;
//		case "/button59" :	i = 82; break;
//		case "/button60" :	i = 83; break;
//		case "/button61" :	i = 84; break;
//		case "/button62" :	i = 85; break;
//		case "/button63" :	i = 86; break;
//		case "/button64" :	i = 87; break;
//		
//		case "/sliderButton1" :	i = 88; break;
//		case "/sliderButton2" :	i = 89; break;
//		case "/sliderButton3" :	i = 90; break;
//		case "/sliderButton4" :	i = 91; break;
//		
//		case "/sliderButton5" :	i = 92; break;
//		case "/sliderButton6" :	i = 93; break;
//		case "/sliderButton7" :	i = 94; break;
//		case "/sliderButton8" :	i = 95; break;
//		
//		case "/crossfadeButtonLeft" :	i = 96; break;
//		case "/crossfadeButtonRight" :	i = 97; break;
//		
//		case "/preset1" :	i = 98; break;
//		case "/preset2" :	i = 99; break;
//		case "/preset3" :	i = 100; break;
//		case "/preset4" :	i = 101; break;
//		case "/preset5" :	i = 102; break;
//		case "/preset6" :	i = 103; break;
//		
//		case "/syncButton" :	i = 104; break;
//		
//		case "/crossfadeLF" :	i = 105; break;
//		
//		case "/crossfadeR" :	i = 106; break;
//		case "/midi/note/1" :	i = 107; break;
//	
//	}
//	
//	messages[i] = oscMessage.Values[0];
//	publicMessages[i] = oscMessage.Values[0];

} 

//public function Update(){

//	lineWidthIndex = Mathf.Clamp(lineWidthIndex, 0, outputs.Length-1);
//	lineSineIndex = Mathf.Clamp(lineSineIndex, 0, outputs.Length-1);
//	lineWidthIndex = Mathf.Clamp(lineWidthIndex, 0, outputs.Length-1);
//	lineRotationIndex = Mathf.Clamp(lineRotationIndex, 0, outputs.Length-1);
//	triExpanseIndex = Mathf.Clamp(triExpanseIndex, 0, outputs.Length-1);
//	meshDistortAmpIndex = Mathf.Clamp(meshDistortAmpIndex, 0, outputs.Length-1);
//	meshDistortFreqIndex = Mathf.Clamp(meshDistortFreqIndex, 0, outputs.Length-1);
//	meshScaleIndex = Mathf.Clamp(meshScaleIndex, 0, outputs.Length-1);
//	
//	
//	targetLineRenderer.sineWave = outputs[lineSineIndex];
//	targetLineRenderer.widthAmplitude = outputs[lineWidthIndex];
//
//	
//	targetMeshScaler.scaleAmount = outputs[meshScaleIndex];
//	
//	targetTriRenderer.expandAmount = outputs[triExpanseIndex];
//	
//	targetMeshDistort.amplitude = outputs[meshDistortAmpIndex];
//	targetMeshDistort.frequency += outputs[meshDistortFreqIndex];
//	for(var out = 0 ; out < outputs.Length; out++){
//		outputTransforms[out].localScale = Vector3(outputs[out],outputs[out],outputs[out]);
//	}


//}