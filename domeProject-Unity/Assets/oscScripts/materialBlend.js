// Blends between two materials

var material1 : Material;

var material2 : Material;

var duration = 2.0;

 

function Start () {

    // At start, use the first material

    renderer.material = material1;

}

 

function Update () {

    // Ping-pong between the materials over the duration

    var lerp = Mathf.PingPong (Time.time, duration) / duration;

    renderer.material.Lerp (material1, material2, lerp);

}