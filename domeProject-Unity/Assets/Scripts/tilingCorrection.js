public var xTile : float =1;
public var yTile : float =1;

public var xOffset : float =0;
public var yOffset : float =0;
function Update () {
	
	renderer.material.mainTextureScale = Vector2(xTile,yTile);
	 renderer.material.mainTextureOffset = Vector2 (xOffset, yOffset);
}