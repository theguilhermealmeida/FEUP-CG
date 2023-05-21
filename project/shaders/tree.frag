precision highp float;

varying vec2 vTexCoords;

uniform sampler2D uTexture;

void main() {
  vec4 texelColor = texture2D(uTexture, vTexCoords);


  gl_FragColor = texelColor;
}
