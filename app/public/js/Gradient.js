"use strict";function _(u){return[(u>>16&255)/255,(u>>8&255)/255,(255&u)/255]}["SCREEN","LINEAR_LIGHT"].reduce((u,o,l)=>Object.assign(u,{[o]:l}),{});var y=class{constructor(o,l,m,g=!1){let a=this,C=document.location.search.toLowerCase().indexOf("debug=webgl")!==-1;a.canvas=o,a.gl=a.canvas.getContext("webgl",{antialias:!0}),a.meshes=[];let s=a.gl;l&&m&&this.setSize(l,m),a.lastDebugMsg,a.debug=g&&C?function(i){let r=new Date;r-a.lastDebugMsg>1e3&&console.log("---"),console.log(r.toLocaleTimeString()+Array(Math.max(0,32-i.length)).join(" ")+i+": ",...Array.from(arguments).slice(1)),a.lastDebugMsg=r}:()=>{},Object.defineProperties(a,{Material:{enumerable:!1,value:class{constructor(i,r,e={}){let n=this;function d(p,b){let v=s.createShader(p);return s.shaderSource(v,b),s.compileShader(v),s.getShaderParameter(v,s.COMPILE_STATUS)||console.error(s.getShaderInfoLog(v)),a.debug("Material.compileShaderSource",{source:b}),v}function c(p,b){return Object.entries(p).map(([v,f])=>f.getDeclaration(v,b)).join(`
`)}n.uniforms=e,n.uniformInstances=[];let h=`
              precision highp float;
            `;n.vertexSource=`
              ${h}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${c(a.commonUniforms,"vertex")}
              ${c(e,"vertex")}
              ${i}
            `,n.Source=`
              ${h}
              ${c(a.commonUniforms,"fragment")}
              ${c(e,"fragment")}
              ${r}
            `,n.vertexShader=d(s.VERTEX_SHADER,n.vertexSource),n.fragmentShader=d(s.FRAGMENT_SHADER,n.Source),n.program=s.createProgram(),s.attachShader(n.program,n.vertexShader),s.attachShader(n.program,n.fragmentShader),s.linkProgram(n.program),s.getProgramParameter(n.program,s.LINK_STATUS)||console.error(s.getProgramInfoLog(n.program)),s.useProgram(n.program),n.attachUniforms(void 0,a.commonUniforms),n.attachUniforms(void 0,n.uniforms)}attachUniforms(i,r){let e=this;i===void 0?Object.entries(r).forEach(([n,d])=>{e.attachUniforms(n,d)}):r.type=="array"?r.value.forEach((n,d)=>e.attachUniforms(`${i}[${d}]`,n)):r.type=="struct"?Object.entries(r.value).forEach(([n,d])=>e.attachUniforms(`${i}.${n}`,d)):(a.debug("Material.attachUniforms",{name:i,uniform:r}),e.uniformInstances.push({uniform:r,location:s.getUniformLocation(e.program,i)}))}}},Uniform:{enumerable:!1,value:class{constructor(i){this.type="float",Object.assign(this,i),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(i){this.value!==void 0&&s[`uniform${this.typeFn}`](i,this.typeFn.indexOf("Matrix")===0?this.transpose:this.value,this.typeFn.indexOf("Matrix")===0?this.value:null)}getDeclaration(i,r,e){let n=this;if(n.excludeFrom!==r){if(n.type==="array")return n.value[0].getDeclaration(i,r,n.value.length)+`
const int ${i}_length = ${n.value.length};`;if(n.type==="struct"){let d=i.replace("u_","");return d=d.charAt(0).toUpperCase()+d.slice(1),`uniform struct ${d} 
                                  {
`+Object.entries(n.value).map(([c,h])=>h.getDeclaration(c,r).replace(/^uniform/,"")).join("")+`
} ${i}${e>0?`[${e}]`:""};`}return`uniform ${n.type} ${i}${e>0?`[${e}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(i,r,e,n,d){s.createBuffer(),this.attributes={position:new a.Attribute({target:s.ARRAY_BUFFER,size:3}),uv:new a.Attribute({target:s.ARRAY_BUFFER,size:2}),uvNorm:new a.Attribute({target:s.ARRAY_BUFFER,size:2}),index:new a.Attribute({target:s.ELEMENT_ARRAY_BUFFER,size:3,type:s.UNSIGNED_SHORT})},this.setTopology(e,n),this.setSize(i,r,d)}setTopology(i=1,r=1){let e=this;e.xSegCount=i,e.ySegCount=r,e.vertexCount=(e.xSegCount+1)*(e.ySegCount+1),e.quadCount=e.xSegCount*e.ySegCount*2,e.attributes.uv.values=new Float32Array(2*e.vertexCount),e.attributes.uvNorm.values=new Float32Array(2*e.vertexCount),e.attributes.index.values=new Uint16Array(3*e.quadCount);for(let n=0;n<=e.ySegCount;n++)for(let d=0;d<=e.xSegCount;d++){let c=n*(e.xSegCount+1)+d;if(e.attributes.uv.values[2*c]=d/e.xSegCount,e.attributes.uv.values[2*c+1]=1-n/e.ySegCount,e.attributes.uvNorm.values[2*c]=d/e.xSegCount*2-1,e.attributes.uvNorm.values[2*c+1]=1-n/e.ySegCount*2,d<e.xSegCount&&n<e.ySegCount){let h=n*e.xSegCount+d;e.attributes.index.values[6*h]=c,e.attributes.index.values[6*h+1]=c+1+e.xSegCount,e.attributes.index.values[6*h+2]=c+1,e.attributes.index.values[6*h+3]=c+1,e.attributes.index.values[6*h+4]=c+1+e.xSegCount,e.attributes.index.values[6*h+5]=c+2+e.xSegCount}}e.attributes.uv.update(),e.attributes.uvNorm.update(),e.attributes.index.update(),a.debug("Geometry.setTopology",{uv:e.attributes.uv,uvNorm:e.attributes.uvNorm,index:e.attributes.index})}setSize(i=1,r=1,e="xz"){let n=this;n.width=i,n.height=r,n.orientation=e,n.attributes.position.values&&n.attributes.position.values.length===3*n.vertexCount||(n.attributes.position.values=new Float32Array(3*n.vertexCount));let d=i/-2,c=r/-2,h=i/n.xSegCount,p=r/n.ySegCount;for(let b=0;b<=n.ySegCount;b++){let v=c+b*p;for(let f=0;f<=n.xSegCount;f++){let L=d+f*h,S=b*(n.xSegCount+1)+f;n.attributes.position.values[3*S+"xyz".indexOf(e[0])]=L,n.attributes.position.values[3*S+"xyz".indexOf(e[1])]=-v}}n.attributes.position.update(),a.debug("Geometry.setSize",{position:n.attributes.position})}}},Mesh:{enumerable:!1,value:class{constructor(i,r){let e=this;e.geometry=i,e.material=r,e.wireframe=!1,e.attributeInstances=[],Object.entries(e.geometry.attributes).forEach(([n,d])=>{e.attributeInstances.push({attribute:d,location:d.attach(n,e.material.program)})}),a.meshes.push(e),a.debug("Mesh.constructor",{mesh:e})}draw(){s.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:i,location:r})=>i.update(r)),this.attributeInstances.forEach(({attribute:i,location:r})=>i.use(r)),s.drawElements(this.wireframe?s.LINES:s.TRIANGLES,this.geometry.attributes.index.values.length,s.UNSIGNED_SHORT,0)}remove(){a.meshes=a.meshes.filter(i=>i!=this)}}},Attribute:{enumerable:!1,value:class{constructor(i){this.type=s.FLOAT,this.normalized=!1,this.buffer=s.createBuffer(),Object.assign(this,i),this.update()}update(){this.values!==void 0&&(s.bindBuffer(this.target,this.buffer),s.bufferData(this.target,this.values,s.STATIC_DRAW))}attach(i,r){let e=s.getAttribLocation(r,i);return this.target===s.ARRAY_BUFFER&&(s.enableVertexAttribArray(e),s.vertexAttribPointer(e,this.size,this.type,this.normalized,0,0)),e}use(i){s.bindBuffer(this.target,this.buffer),this.target===s.ARRAY_BUFFER&&(s.enableVertexAttribArray(i),s.vertexAttribPointer(i,this.size,this.type,this.normalized,0,0))}}}});let w=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];a.commonUniforms={projectionMatrix:new a.Uniform({type:"mat4",value:w}),modelViewMatrix:new a.Uniform({type:"mat4",value:w}),resolution:new a.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new a.Uniform({type:"float",value:1})}}setSize(o=640,l=480){this.width=o,this.height=l,this.canvas.width=o,this.canvas.height=l,this.gl.viewport(0,0,o,l),this.commonUniforms.resolution.value=[o,l],this.commonUniforms.aspectRatio.value=o/l,this.debug("MiniGL.setSize",{width:o,height:l})}setOrthographicCamera(o=0,l=0,m=0,g=-2e3,a=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(g-a),0,o,l,m,1],this.debug("setOrthographicCamera",this.commonUniforms.projectionMatrix.value)}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(o=>o.draw())}};function t(u,o,l){return o in u?Object.defineProperty(u,o,{value:l,enumerable:!0,configurable:!0,writable:!0}):u[o]=l,u}var x=class{constructor(...o){t(this,"el",void 0),t(this,"cssVarRetries",0),t(this,"maxCssVarRetries",200),t(this,"angle",0),t(this,"isLoadedClass",!1),t(this,"isScrolling",!1),t(this,"scrollingTimeout",void 0),t(this,"scrollingRefreshDelay",200),t(this,"isIntersecting",!1),t(this,"shaderFiles",void 0),t(this,"vertexShader",void 0),t(this,"sectionColors",void 0),t(this,"computedCanvasStyle",void 0),t(this,"conf",void 0),t(this,"uniforms",void 0),t(this,"t",1253106),t(this,"last",0),t(this,"width",void 0),t(this,"minWidth",1111),t(this,"height",600),t(this,"xSegCount",void 0),t(this,"ySegCount",void 0),t(this,"mesh",void 0),t(this,"material",void 0),t(this,"geometry",void 0),t(this,"minigl",void 0),t(this,"scrollObserver",void 0),t(this,"amp",320),t(this,"seed",5),t(this,"freqX",14e-5),t(this,"freqY",29e-5),t(this,"freqDelta",1e-5),t(this,"activeColors",[1,1,1,1]),t(this,"isMetaKey",!1),t(this,"isGradientLegendVisible",!1),t(this,"isMouseDown",!1),t(this,"handleScroll",()=>{clearTimeout(this.scrollingTimeout),this.scrollingTimeout=setTimeout(this.handleScrollEnd,this.scrollingRefreshDelay),this.isGradientLegendVisible&&this.hideGradientLegend(),this.conf.playing&&(this.isScrolling=!0,this.pause())}),t(this,"handleScrollEnd",()=>{this.isScrolling=!1,this.isIntersecting&&this.play()}),t(this,"resize",()=>{this.width=window.innerWidth,this.minigl.setSize(this.width,this.height),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}),t(this,"handleMouseDown",l=>{this.isGradientLegendVisible&&(this.isMetaKey=l.metaKey,this.isMouseDown=!0,this.conf.playing===!1&&requestAnimationFrame(this.animate))}),t(this,"handleMouseUp",()=>{this.isMouseDown=!1}),t(this,"animate",l=>{if(!this.shouldSkipFrame(l)||this.isMouseDown){if(this.t+=Math.min(l-this.last,1e3/15),this.last=l,this.isMouseDown){let m=160;this.isMetaKey&&(m=-160),this.t+=m}this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render()}if(this.last!==0&&this.isStatic)return this.minigl.render(),void this.disconnect();(this.conf.playing||this.isMouseDown)&&requestAnimationFrame(this.animate)}),t(this,"addIsLoadedClass",()=>{!this.isLoadedClass&&(this.isLoadedClass=!0,this.el.classList.add("isLoaded"),setTimeout(()=>{this.el.parentElement.classList.add("isLoaded")},3e3))}),t(this,"pause",()=>{this.conf.playing=!1}),t(this,"play",()=>{requestAnimationFrame(this.animate),this.conf.playing=!0}),t(this,"initGradient",l=>(this.el=document.querySelector(l),this.connect(),this))}async connect(){this.shaderFiles={vertex:`varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  //
  // Tilting the plane
  //

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  //
  // Vertex noise
  //

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  //
  // Vertex color, to be passed to fragment shader
  //

  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  //
  // Finish
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,noise:`//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}`,blend:`//
// https://github.com/jamieowen/glsl-blend
//

// Normal

vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen

float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay

float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard light

vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft light

float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Color dodge

float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Color burn

float blendColorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light

float blendVividLight(float base, float blend) {
	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear burn

float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear dodge

float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear light

float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}`,fragment:`varying vec3 v_color;

void main() {
  vec3 color = v_color;
  if (u_darken_top == 1.0) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
  }
  gl_FragColor = vec4(color, 1.0);
}`},this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},document.querySelectorAll("canvas").length<1?console.log("DID NOT LOAD HERO STRIPE CANVAS"):(this.minigl=new y(this.el,null,null,!0),requestAnimationFrame(()=>{this.el&&(this.computedCanvasStyle=getComputedStyle(this.el),this.waitForCssVars())}))}disconnect(){this.scrollObserver&&(window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("keydown",this.handleKeyDown),this.scrollObserver.disconnect()),window.removeEventListener("resize",this.resize)}initMaterial(){this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:10}),u_darken_top:new this.minigl.Uniform({value:this.el.dataset.jsDarkenTop===""?1:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:5e-6})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let o=1;o<this.sectionColors.length;o+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[o],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+o/this.sectionColors.length,3+o/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*o}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*o}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*o}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*o})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}shouldSkipFrame(o){return!!window.document.hidden||!this.conf.playing||parseInt(o,10)%2==0||void 0}updateFrequency(o){this.freqX+=o,this.freqY+=o}toggleColor(o){this.activeColors[o]=this.activeColors[o]===0?1:0}showGradientLegend(){this.width>this.minWidth&&(this.isGradientLegendVisible=!0,document.body.classList.add("isGradientLegendVisible"))}hideGradientLegend(){this.isGradientLegendVisible=!1,document.body.classList.remove("isGradientLegendVisible")}init(){this.initGradientColors(),this.initMesh(),this.resize(),requestAnimationFrame(this.animate),window.addEventListener("resize",this.resize)}waitForCssVars(){if(this.computedCanvasStyle&&this.computedCanvasStyle.getPropertyValue("--gradient-color-1").indexOf("#")!==-1)this.init(),this.addIsLoadedClass();else{if(this.cssVarRetries+=1,this.cssVarRetries>this.maxCssVarRetries)return this.sectionColors=[16711680,16711680,16711935,65280,255],void this.init();requestAnimationFrame(()=>this.waitForCssVars())}}initGradientColors(){this.sectionColors=["--gradient-color-1","--gradient-color-2","--gradient-color-3","--gradient-color-4"].map(o=>{let l=this.computedCanvasStyle.getPropertyValue(o).trim();return l.length===4&&(l=`#${l.substr(1).split("").map(g=>g+g).join("")}`),l&&`0x${l.substr(1)}`}).filter(Boolean).map(_)}};window.Gradient=x;
