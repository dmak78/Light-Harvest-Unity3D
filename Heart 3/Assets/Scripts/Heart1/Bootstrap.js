public var amplitude : float;
public var frequency : float;
function Start(){
	var wave : SinWave = gameObject.AddComponent("SinWave");
		wave.amplitude = 50;
		wave.frequency = 2;	
}

function Update(){
	if(Time.time > 5){
		var wave : SinWave = gameObject.GetComponent("SinWave");
		wave.amplitude = amplitude;
		wave.frequency = frequency;	
	}
}