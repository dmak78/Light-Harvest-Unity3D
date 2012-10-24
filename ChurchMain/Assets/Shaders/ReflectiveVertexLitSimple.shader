// Upgrade NOTE: replaced 'PositionFog()' with multiply of UNITY_MATRIX_MVP by position
// Upgrade NOTE: replaced 'V2F_POS_FOG' with 'float4 pos : SV_POSITION'

Shader "Reflective/VertexLit Simple" {
Properties {
    _Color ("Main Color", Color) = (1,1,1,1)
    _SpecColor ("Spec Color", Color) = (1,1,1,1)
    _Shininess ("Shininess", Range (0.03, 1)) = 0.7
    _ReflectColor ("Reflection Color", Color) = (1,1,1,0.5)
    _MainTex ("Base (RGB)", 2D) = "white" {}
    _Cube ("Reflection Cubemap", Cube) = "_Skybox" { TexGen CubeReflect }
    _RefStrength ("Reflection Strength", Range (0.01, 1)) = 0.7
}

Category {
    Tags { "RenderType"="Opaque" }
    /* Upgrade NOTE: commented out, possibly part of old style per-pixel lighting: Blend AppSrcAdd AppDstAdd */
    Fog { Color [_AddFog] }

    // ------------------------------------------------------------------
    // ARB fragment program
    
    SubShader {
    	CULL OFF
        // First pass does reflection cubemap
        Pass { 
            Name "BASE"
            Tags {"LightMode" = "Always"}
CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#pragma fragmentoption ARB_fog_exp2
#pragma fragmentoption ARB_precision_hint_fastest
#include "UnityCG.cginc"

struct v2f {
    float4 pos : SV_POSITION;
    float2 uv : TEXCOORD0;
    float3 I : TEXCOORD1;
};

uniform float4 _MainTex_ST;

v2f vert(appdata_tan v)
{
    v2f o;
    o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
    o.uv = TRANSFORM_TEX(v.texcoord,_MainTex);

    // calculate object space reflection vector 
    float3 viewDir = ObjSpaceViewDir( v.vertex );
    float3 I = reflect( -viewDir, v.normal );
    
    // transform to world space reflection vector
    o.I = mul( (float3x3)_Object2World, I );
    
    return o; 
}

uniform sampler2D _MainTex;
uniform samplerCUBE _Cube;
uniform float4 _ReflectColor;
uniform float _RefStrength;

half4 frag (v2f i) : COLOR
{
    half4 texcol = tex2D (_MainTex, i.uv);
    half4 reflcol = texCUBE( _Cube, i.I );
    reflcol *= _RefStrength;
    return reflcol * _ReflectColor;
} 
ENDCG
        }
        
        // Second pass adds vertex lighting
        Pass {
            Lighting On
            Material {
                Diffuse [_Color]
                Emission [_PPLAmbient]
                Specular [_SpecColor]
                Shininess [_Shininess]
            }
            SeparateSpecular On
CGPROGRAM
// Upgrade NOTE: excluded shader from OpenGL ES 2.0 because it does not contain a surface program or both vertex and fragment programs.
#pragma exclude_renderers gles
#pragma fragment frag
#pragma fragmentoption ARB_fog_exp2
#pragma fragmentoption ARB_precision_hint_fastest

#include "UnityCG.cginc"

struct v2f {
    float2 uv : TEXCOORD0;
    float4 diff : COLOR0;
    float4 spec : COLOR1;
};

uniform sampler2D _MainTex : register(s0);
uniform float4 _ReflectColor;
uniform float4 _SpecColor;

half4 frag (v2f i) : COLOR
{
    half4 temp = tex2D (_MainTex, i.uv);    
    half4 c;
    c.xyz = (temp.xyz * i.diff.xyz + temp.w * i.spec.xyz ) * 2;
    c.w = temp.w * (i.diff.w + Luminance(i.spec.xyz) * _SpecColor.a);
    return c;
} 
ENDCG
            SetTexture[_MainTex] {}
        }       
    }
}

// Fallback for cards that don't do cubemapping
FallBack "VertexLit", 1

}