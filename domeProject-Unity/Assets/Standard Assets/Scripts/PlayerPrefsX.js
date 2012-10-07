// Site of this script: http://www.unifycommunity.com/wiki/index.php?title=ArrayPrefs
// Created by: Eric Haines (Eric5h5)
// Contribution (Set/Get Vector3) 03/2010: Mario Madureira Fontes (fontmaster)

static function SetVector3 (key : String, vector : Vector3) : boolean {
    return SetFloatArray(key, [vector.x, vector.y, vector.z]);
}

static function GetVector3 (key : String) : Vector3 {
    var floatArray = GetFloatArray(key);
    if (floatArray.Length < 3) {
        return Vector3.zero;
    }
    return Vector3(floatArray[0], floatArray[1], floatArray[2]);
}

static function SetIntArray (key : String, intArray : int[]) : boolean {
    if (intArray.Length == 0) return false;
    
    var sb = new System.Text.StringBuilder();
    for (i = 0; i < intArray.Length-1; i++) {
        sb.Append(intArray[i]).Append("|");
    }
    sb.Append(intArray[i]);
    
    try {
        PlayerPrefs.SetString(key, sb.ToString());
    }
    catch (err) {
        return false;
    }
    return true;
}

static function GetIntArray (key : String) : int[] {
    if (PlayerPrefs.HasKey(key)) {
        var stringArray = PlayerPrefs.GetString(key).Split("|"[0]);
        var intArray = new int[stringArray.Length];
        for (i = 0; i < stringArray.Length; i++) {
            intArray[i] = parseInt(stringArray[i]);
        }
        return intArray;
    }
    return new int[0];
}

static function GetIntArray (key : String, defaultValue : int, defaultSize : int) : int[] {
    if (PlayerPrefs.HasKey(key)) {
        return GetIntArray(key);
    }
    var intArray = new int[defaultSize];
    for (i = 0; i < defaultSize; i++) {
        intArray[i] = defaultValue;
    }
    return intArray;
}

static function SetFloatArray (key : String, floatArray : float[]) : boolean {
    if (floatArray.Length == 0) return false;

    var sb = new System.Text.StringBuilder();
    for (i = 0; i < floatArray.Length-1; i++) {
        sb.Append(floatArray[i]).Append("|");
    }
    sb.Append(floatArray[i]);
    
    try {
        PlayerPrefs.SetString(key, sb.ToString());
    }
    catch (err) {
        return false;
    }
    return true;
}

static function GetFloatArray (key : String) : float[] {
    if (PlayerPrefs.HasKey(key)) {
        var stringArray = PlayerPrefs.GetString(key).Split("|"[0]);
        var floatArray = new float[stringArray.Length];
        for (i = 0; i < stringArray.Length; i++) {
            floatArray[i] = parseFloat(stringArray[i]);
        }
        return floatArray;
    }
    return new float[0];
}

static function GetFloatArray (key : String, defaultValue : float, defaultSize : int) : float[] {
    if (PlayerPrefs.HasKey(key)) {
        return GetFloatArray(key);
    }
    var floatArray = new float[defaultSize];
    for (i = 0; i < defaultSize; i++) {
        floatArray[i] = defaultValue;
    }
    return floatArray;
}

static function SetStringArray (key : String, stringArray : String[], separator : char) : boolean {
    if (stringArray.Length == 0) return false;

    try {
        PlayerPrefs.SetString(key, String.Join(separator.ToString(), stringArray));
    }
    catch (err) {
        return false;
    }
    return true;
}

static function SetStringArray (key : String, stringArray : String[]) : boolean {
    if (!SetStringArray(key, stringArray, "\n"[0])) {
        return false;
    }
    return true;
}

static function GetStringArray (key : String, separator : char) : String[] {
    if (PlayerPrefs.HasKey(key)) {
        return PlayerPrefs.GetString(key).Split(separator);
    }
    return new String[0];
}

static function GetStringArray (key : String) : String[] {
    if (PlayerPrefs.HasKey(key)) {
        return PlayerPrefs.GetString(key).Split("\n"[0]);
    }
    return new String[0];
}

static function GetStringArray (key : String, separator : char, defaultValue : String, defaultSize : int) : String[] {
    if (PlayerPrefs.HasKey(key)) {
        return PlayerPrefs.GetString(key).Split(separator);
    }
    var stringArray = new String[defaultSize];
    for (i = 0; i < defaultSize; i++) {
        stringArray[i] = defaultValue;
    }
    return stringArray;
}

static function GetStringArray (key : String, defaultValue : String, defaultSize : int) : String[] {
    return GetStringArray(key, "\n"[0], defaultValue, defaultSize);
}