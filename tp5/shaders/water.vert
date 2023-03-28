attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;
uniform float timeFactor;


uniform float normScale;

void main() {
	float offset = 0.0;
	vTextureCoord = aTextureCoord + timeFactor*normScale*0.1;
	vec4 color = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);
	offset=0.1*sin(timeFactor)*normScale;
	gl_Position =  uPMatrix * uMVMatrix * vec4(aVertexPosition.xy,aVertexPosition.z+normScale*color.b*0.005, 1.0);	

}

