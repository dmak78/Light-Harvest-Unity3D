var gray = true;
var width = 128;
var height = 128;
public var frequency : float;

private var texture : Texture2D;

function Start ()
{

}

function Update()
{
    Calculate();
}

function Calculate()
{
	    texture = new Texture2D(width, height, TextureFormat.RGB24, false);
    renderer.material.mainTexture = texture;
    
    for (var y = 0;y<height;y++)
    {
        for (var x = 0;x<width;x++)
        {
            if (gray)
            {
            var red = Mathf.Sin(x*.3+Time.time+Mathf.Sin(x*.43)*.4)/5+.5;
            var green = Mathf.Sin(x*.5+Time.time+Mathf.Sin(y*.23)*.8)/5+.5;
            var blue = Mathf.Sin(x*.3+Time.time+Mathf.Sin(x*.43)*.4)/5+.5;

                texture.SetPixel(x, y, Color (red, green, blue, 1));
            }
            else
            {


                texture.SetPixel(x, y, Color (1, 0, 0, 1));
            }
        }   
    }
    
    texture.Apply();
}