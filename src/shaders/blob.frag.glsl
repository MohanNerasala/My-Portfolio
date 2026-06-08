uniform float uTime;
uniform vec3 uColor;
uniform vec3 uAccentColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // Fresnel effect for iridescence
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

  // Iridescent color shift based on view angle and displacement
  vec3 iridescence = mix(uColor, uAccentColor, fresnel * 0.7 + vDisplacement * 0.3);

  // Add subtle rainbow shift
  float hueShift = fresnel * 0.3 + vDisplacement * 0.2;
  vec3 rainbow = vec3(
    sin(hueShift * 6.28 + 0.0) * 0.5 + 0.5,
    sin(hueShift * 6.28 + 2.09) * 0.5 + 0.5,
    sin(hueShift * 6.28 + 4.18) * 0.5 + 0.5
  );

  vec3 finalColor = mix(iridescence, rainbow, fresnel * 0.15);

  // Edge glow
  float edgeGlow = pow(fresnel, 2.0) * 0.8;
  finalColor += uColor * edgeGlow;

  // Glass-like transparency
  float alpha = 0.85 + fresnel * 0.15;

  gl_FragColor = vec4(finalColor, alpha);
}
