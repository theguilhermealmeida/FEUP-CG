attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;


uniform float normScale;
varying float coords;


void main() {
    float offset = 0.0;
    //offset = normScale*0.1*sin(timeFactor);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x+offset,aVertexPosition.yz, 1.0);
    coords = gl_Position.y;
}

