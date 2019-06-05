/*
 Highcharts JS v6.2.0 (2018-10-17)
 Boost module

 (c) 2010-2017 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(v){"object"===typeof module&&module.exports?module.exports=v:"function"===typeof define&&define.amd?define(function(){return v}):v(Highcharts)})(function(v){(function(h){function v(){var a=Array.prototype.slice.call(arguments),c=-Number.MAX_VALUE;n(a,function(a){if("undefined"!==typeof a&&null!==a&&"undefined"!==typeof a.length&&0<a.length)return c=a.length,!0});return c}function O(a){var c=0,d=0,f=D(a.options.boost&&a.options.boost.allowForce,!0),b;if("undefined"!==typeof a.boostForceChartBoost)return a.boostForceChartBoost;
if(1<a.series.length)for(var h=0;h<a.series.length;h++)b=a.series[h],0!==b.options.boostThreshold&&(F[b.type]&&++d,v(b.processedXData,b.options.data,b.points)>=(b.options.boostThreshold||Number.MAX_VALUE)&&++c);a.boostForceChartBoost=f&&(d===a.series.length&&0<c||5<c);return a.boostForceChartBoost}function P(a){return D(a&&a.options&&a.options.boost&&a.options.boost.enabled,!0)}function pa(a){function c(){k.length&&h.error("[highcharts boost] shader error - "+k.join("\n"))}function d(b,e){var c=a.createShader("vertex"===
e?a.VERTEX_SHADER:a.FRAGMENT_SHADER);a.shaderSource(c,b);a.compileShader(c);return a.getShaderParameter(c,a.COMPILE_STATUS)?c:(k.push("when compiling "+e+" shader:\n"+a.getShaderInfoLog(c)),!1)}function f(){function b(b){return a.getUniformLocation(l,b)}var f=d("#version 100\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float plotHeight;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value \x3d aVertexPosition.w;\nfloat zMax \x3d bubbleZMax;\nfloat zMin \x3d bubbleZMin;\nfloat radius \x3d 0.0;\nfloat pos \x3d 0.0;\nfloat zRange \x3d zMax - zMin;\nif (bubbleSizeAbs){\nvalue \x3d value - bubbleZThreshold;\nzMax \x3d max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin \x3d 0.0;\n}\nif (value \x3c zMin){\nradius \x3d bubbleZMin / 2.0 - 1.0;\n} else {\npos \x3d zRange \x3e 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea \x26\x26 pos \x3e 0.0){\npos \x3d sqrt(pos);\n}\nradius \x3d ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord\n){\nfloat sign \x3d 1.0;\nfloat cvsOffset \x3d 0.0;\nif (cvsCoord) {\nsign *\x3d -1.0;\ncvsOffset \x3d len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value){\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold){\nfloat v;\nif (skipTranslation){\nv \x3d value;// + yAxisPos;\n} else {\nv \x3d translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord);// + yAxisPos;\nif (v \x3e plotHeight) {\nv \x3d plotHeight;\n}\n}\nif (checkTreshold \x3e 0.0 \x26\x26 hasThreshold) {\nv \x3d min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize \x3d bubbleRadius();\n} else {\ngl_PointSize \x3d pSize;\n}\nvColor \x3d aColor;\nif (isInverted) {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.y) + yAxisPos, yToPixels(aVertexPosition.x, aVertexPosition.z) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
"vertex"),h=d("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col \x3d fillColor;\nvec4 tcol;\nif (hasColor) {\ncol \x3d vColor;\n}\nif (isCircle) {\ntcol \x3d texture2D(uSampler, gl_PointCoord.st);\ncol *\x3d tcol;\nif (tcol.r \x3c 0.0) {\ndiscard;\n} else {\ngl_FragColor \x3d col;\n}\n} else {\ngl_FragColor \x3d col;\n}\n}","fragment");
if(!f||!h)return l=!1,c(),!1;l=a.createProgram();a.attachShader(l,f);a.attachShader(l,h);a.linkProgram(l);if(!a.getProgramParameter(l,a.LINK_STATUS))return k.push(a.getProgramInfoLog(l)),c(),l=!1;a.useProgram(l);a.bindAttribLocation(l,0,"aVertexPosition");m=b("uPMatrix");Q=b("pSize");K=b("fillColor");g=b("isBubble");B=b("bubbleSizeAbs");e=b("bubbleSizeByArea");q=b("uSampler");G=b("skipTranslation");t=b("isCircle");A=b("isInverted");n=b("plotHeight");return!0}function b(b,e){a&&l&&(b=J[b]=J[b]||a.getUniformLocation(l,
b),a.uniform1f(b,e))}var J={},l,m,Q,K,g,B,e,G,t,A,n,k=[],q;return a&&!f()?!1:{psUniform:function(){return Q},pUniform:function(){return m},fillColorUniform:function(){return K},setPlotHeight:function(b){a&&l&&a.uniform1f(n,b)},setBubbleUniforms:function(c,d,f){var h=c.options,w=Number.MAX_VALUE,x=-Number.MAX_VALUE;a&&l&&"bubble"===c.type&&(w=D(h.zMin,Math.min(w,Math.max(d,!1===h.displayNegative?h.zThreshold:-Number.MAX_VALUE))),x=D(h.zMax,Math.max(x,f)),a.uniform1i(g,1),a.uniform1i(t,1),a.uniform1i(e,
"width"!==c.options.sizeBy),a.uniform1i(B,c.options.sizeByAbsoluteValue),b("bubbleZMin",w),b("bubbleZMax",x),b("bubbleZThreshold",c.options.zThreshold),b("bubbleMinSize",c.minPxSize),b("bubbleMaxSize",c.maxPxSize))},bind:function(){a&&l&&a.useProgram(l)},program:function(){return l},create:f,setUniform:b,setPMatrix:function(b){a&&l&&a.uniformMatrix4fv(m,!1,b)},setColor:function(b){a&&l&&a.uniform4f(K,b[0]/255,b[1]/255,b[2]/255,b[3])},setPointSize:function(b){a&&l&&a.uniform1f(Q,b)},setSkipTranslation:function(b){a&&
l&&a.uniform1i(G,!0===b?1:0)},setTexture:function(b){a&&l&&a.uniform1i(q,b)},setDrawAsCircle:function(b){a&&l&&a.uniform1i(t,b?1:0)},reset:function(){a&&l&&(a.uniform1i(g,0),a.uniform1i(t,0))},setInverted:function(b){a&&l&&a.uniform1i(A,b)},destroy:function(){a&&l&&(a.deleteProgram(l),l=!1)}}}function S(a,c,d){function f(){b&&(a.deleteBuffer(b),h=b=!1);k=0;l=d||2;n=[]}var b=!1,h=!1,l=d||2,m=!1,k=0,n;return{destroy:f,bind:function(){if(!b)return!1;a.vertexAttribPointer(h,l,a.FLOAT,!1,0,0)},data:n,
build:function(d,B,e){var g;n=d||[];if(!(n&&0!==n.length||m))return f(),!1;l=e||l;b&&a.deleteBuffer(b);m||(g=new Float32Array(n));b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,b);a.bufferData(a.ARRAY_BUFFER,m||g,a.STATIC_DRAW);h=a.getAttribLocation(c.program(),B);a.enableVertexAttribArray(h);return!0},render:function(c,d,e){var g=m?m.length:n.length;if(!b||!g)return!1;if(!c||c>g||0>c)c=0;if(!d||d>g)d=g;a.drawArrays(a[(e||"points").toUpperCase()],c/l,(d-c)/l);return!0},allocate:function(a){k=-1;m=
new Float32Array(4*a)},push:function(a,b,c,d){m&&(m[++k]=a,m[++k]=b,m[++k]=c,m[++k]=d)}}}function qa(a){function c(a){var b,c;return a.isSeriesBoosting?(b=!!a.options.stacking,c=a.xData||a.options.xData||a.processedXData,b=(b?a.data:c||a.options.data).length,"treemap"===a.type?b*=12:"heatmap"===a.type?b*=6:ha[a.type]&&(b*=2),b):0}function d(){e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT)}function f(a,b){function c(a){a&&(b.colorData.push(a[0]),b.colorData.push(a[1]),b.colorData.push(a[2]),b.colorData.push(a[3]))}
function e(a,b,e,d,x){c(x);r.usePreallocated?B.push(a,b,e?1:0,d||1):(A.push(a),A.push(b),A.push(e?1:0),A.push(d||1))}function d(){b.segments.length&&(b.segments[b.segments.length-1].to=A.length)}function x(){b.segments.length&&b.segments[b.segments.length-1].from===A.length||(d(),b.segments.push({from:A.length}))}function g(a,b,d,x,g){c(g);e(a+d,b);c(g);e(a,b);c(g);e(a,b+x);c(g);e(a,b+x);c(g);e(a+d,b+x);c(g);e(a+d,b)}function f(a,c){r.useGPUTranslations||(b.skipTranslation=!0,a.x=E.toPixels(a.x,!0),
a.y=z.toPixels(a.y,!0));c?A=[a.x,a.y,0,2].concat(A):e(a.x,a.y,0,2)}var ja=a.pointArrayMap&&"low,high"===a.pointArrayMap.join(","),l=a.chart,L=a.options,m=!!L.stacking,k=L.data,T=a.xAxis.getExtremes(),J=T.min,T=T.max,q=a.yAxis.getExtremes(),w=q.min,q=q.max,t=a.xData||L.xData||a.processedXData,G=a.yData||L.yData||a.processedYData,v=a.zData||L.zData||a.processedZData,z=a.yAxis,E=a.xAxis,K=a.chart.plotHeight,D=a.chart.plotWidth,W=!t||0===t.length,F=L.connectNulls,p=a.points||!1,Q=!1,H=!1,y,U,V,k=m?a.data:
t||k,t={x:Number.MAX_VALUE,y:0},I={x:-Number.MAX_VALUE,y:0},M=0,N=!1,u,fa,C=-1,Z=!1,aa=!1,ba,R="undefined"===typeof l.index,X=!1,ga=!1,O=ha[a.type],P=!1,ia=!0,S=L.threshold;if(!(L.boostData&&0<L.boostData.length)){l.inverted&&(K=a.chart.plotWidth,D=a.chart.plotHeight);a.closestPointRangePx=Number.MAX_VALUE;x();if(p&&0<p.length)b.skipTranslation=!0,b.drawMode="triangles",p[0].node&&p[0].node.levelDynamic&&p.sort(function(a,b){if(a.node){if(a.node.levelDynamic>b.node.levelDynamic)return 1;if(a.node.levelDynamic<
b.node.levelDynamic)return-1}return 0}),n(p,function(b){var c=b.plotY,e;"undefined"===typeof c||isNaN(c)||null===b.y||(c=b.shapeArgs,e=b.series.pointAttribs(b),b=e["stroke-width"]||0,U=h.color(e.fill).rgba,U[0]/=255,U[1]/=255,U[2]/=255,"treemap"===a.type&&(b=b||1,V=h.color(e.stroke).rgba,V[0]/=255,V[1]/=255,V[2]/=255,g(c.x,c.y,c.width,c.height,V),b/=2),"heatmap"===a.type&&l.inverted&&(c.x=E.len-c.x,c.y=z.len-c.y,c.width=-c.width,c.height=-c.height),g(c.x+b,c.y+b,c.width-2*b,c.height-2*b,U))});else{for(;C<
k.length-1;){y=k[++C];if(R)break;W?(p=y[0],u=y[1],k[C+1]&&(aa=k[C+1][0]),k[C-1]&&(Z=k[C-1][0]),3<=y.length&&(fa=y[2],y[2]>b.zMax&&(b.zMax=y[2]),y[2]<b.zMin&&(b.zMin=y[2]))):(p=y,u=G[C],k[C+1]&&(aa=k[C+1]),k[C-1]&&(Z=k[C-1]),v&&v.length&&(fa=v[C],v[C]>b.zMax&&(b.zMax=v[C]),v[C]<b.zMin&&(b.zMin=v[C])));if(F||null!==p&&null!==u){if(aa&&aa>=J&&aa<=T&&(X=!0),Z&&Z>=J&&Z<=T&&(ga=!0),ja?(W&&(u=y.slice(1,3)),ba=u[0],u=u[1]):m&&(p=y.x,u=y.stackY,ba=u-y.y),null!==w&&"undefined"!==typeof w&&null!==q&&"undefined"!==
typeof q&&(ia=u>=w&&u<=q),p>T&&I.x<T&&(I.x=p,I.y=u),p<J&&t.x>J&&(t.x=p,t.y=u),null!==u||!F)if(null!==u&&(ia||X||ga)){if(p>=J&&p<=T&&(P=!0),P||X||ga){if(!r.useGPUTranslations&&(b.skipTranslation=!0,p=E.toPixels(p,!0),u=z.toPixels(u,!0),u>K&&(u=K),p>D)){if("points"===b.drawMode)continue;p=D}if(O){y=ba;if(!1===ba||"undefined"===typeof ba)y=0>u?u:0;ja||m||(y=Math.max(S,w));r.useGPUTranslations||(y=z.toPixels(y,!0));e(p,y,0,0,!1)}b.hasMarkers&&!1!==Q&&(a.closestPointRangePx=Math.min(a.closestPointRangePx,
Math.abs(p-Q)));!r.useGPUTranslations&&!r.usePreallocated&&Q&&1>Math.abs(p-Q)&&H&&1>Math.abs(u-H)?r.debug.showSkipSummary&&++M:(L.step&&e(p,H,0,2,!1),e(p,u,0,"bubble"===a.type?fa||1:2,!1),Q=p,H=u,N=!0)}}else x()}else x()}r.debug.showSkipSummary&&console.log("skipped points:",M);N||!1===F||"line_strip"!==a.drawMode||(t.x<Number.MAX_VALUE&&f(t,!0),I.x>-Number.MAX_VALUE&&f(I))}d()}}function b(){w=[];z.data=A=[];v=[];B&&B.destroy()}function k(a){g&&(g.setUniform("xAxisTrans",a.transA),g.setUniform("xAxisMin",
a.min),g.setUniform("xAxisMinPad",a.minPixelPadding),g.setUniform("xAxisPointRange",a.pointRange),g.setUniform("xAxisLen",a.len),g.setUniform("xAxisPos",a.pos),g.setUniform("xAxisCVSCoord",!a.horiz))}function l(a){g&&(g.setUniform("yAxisTrans",a.transA),g.setUniform("yAxisMin",a.min),g.setUniform("yAxisMinPad",a.minPixelPadding),g.setUniform("yAxisPointRange",a.pointRange),g.setUniform("yAxisLen",a.len),g.setUniform("yAxisPos",a.pos),g.setUniform("yAxisCVSCoord",!a.horiz))}function m(a,b){g.setUniform("hasThreshold",
a);g.setUniform("translatedThreshold",b)}function q(c){if(c)G=c.chartWidth||800,t=c.chartHeight||400;else return!1;if(!(e&&G&&t&&g))return!1;r.debug.timeRendering&&console.time("gl rendering");e.canvas.width=G;e.canvas.height=t;g.bind();e.viewport(0,0,G,t);g.setPMatrix([2/G,0,0,0,0,-(2/t),0,0,0,0,-2,0,-1,1,-1,1]);g.setPlotHeight(c.plotHeight);1<r.lineWidth&&!h.isMS&&e.lineWidth(r.lineWidth);B.build(z.data,"aVertexPosition",4);B.bind();g.setInverted(c.inverted);n(w,function(a,b){var c=a.series.options,
d=c.marker,f;f="undefined"!==typeof c.lineWidth?c.lineWidth:1;var x=c.threshold,J=H(x),n=a.series.yAxis.getThreshold(x),x=D(c.marker?c.marker.enabled:null,a.series.xAxis.isRadial?!0:null,a.series.closestPointRangePx>2*((c.marker?c.marker.radius:10)||10)),d=E[d&&d.symbol||a.series.symbol]||E.circle;if(!(0===a.segments.length||a.segmentslength&&a.segments[0].from===a.segments[0].to)){d.isReady&&(e.bindTexture(e.TEXTURE_2D,d.handle),g.setTexture(d.handle));d=a.series.pointAttribs&&a.series.pointAttribs().fill||
a.series.color;c.colorByPoint&&(d=a.series.chart.options.colors[b]);a.series.fillOpacity&&c.fillOpacity&&(d=(new ea(d)).setOpacity(D(c.fillOpacity,1)).get());d=h.color(d).rgba;r.useAlpha||(d[3]=1);"lines"===a.drawMode&&r.useAlpha&&1>d[3]&&(d[3]/=10);"add"===c.boostBlending?(e.blendFunc(e.SRC_ALPHA,e.ONE),e.blendEquation(e.FUNC_ADD)):"mult"===c.boostBlending?e.blendFunc(e.DST_COLOR,e.ZERO):"darken"===c.boostBlending?(e.blendFunc(e.ONE,e.ONE),e.blendEquation(e.FUNC_MIN)):e.blendFuncSeparate(e.SRC_ALPHA,
e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);g.reset();0<a.colorData.length&&(g.setUniform("hasColor",1),b=S(e,g),b.build(a.colorData,"aColor",4),b.bind());g.setColor(d);k(a.series.xAxis);l(a.series.yAxis);m(J,n);"points"===a.drawMode&&(c.marker&&c.marker.radius?g.setPointSize(2*c.marker.radius):g.setPointSize(1));g.setSkipTranslation(a.skipTranslation);"bubble"===a.series.type&&g.setBubbleUniforms(a.series,a.zMin,a.zMax);g.setDrawAsCircle(F[a.series.type]||!1);if(0<f||"line_strip"!==a.drawMode)for(f=
0;f<a.segments.length;f++)B.render(a.segments[f].from,a.segments[f].to,a.drawMode);if(a.hasMarkers&&x)for(c.marker&&c.marker.radius?g.setPointSize(2*c.marker.radius):g.setPointSize(10),g.setDrawAsCircle(!0),f=0;f<a.segments.length;f++)B.render(a.segments[f].from,a.segments[f].to,"POINTS")}});r.debug.timeRendering&&console.timeEnd("gl rendering");a&&a();b()}function K(a){d();if(a.renderer.forExport)return q(a);W?q(a):setTimeout(function(){K(a)},1)}var g=!1,B=!1,e=!1,G=0,t=0,A=!1,v=!1,z={},W=!1,w=[],
E={},ha={column:!0,columnrange:!0,bar:!0,area:!0,arearange:!0},F={scatter:!0,bubble:!0},r={pointSize:1,lineWidth:1,fillColor:"#AA00AA",useAlpha:!0,usePreallocated:!1,useGPUTranslations:!1,debug:{timeRendering:!1,timeSeriesProcessing:!1,timeSetup:!1,timeBufferCopy:!1,timeKDTree:!1,showSkipSummary:!1}};return z={allocateBufferForSingleSeries:function(a){var b=0;r.usePreallocated&&(a.isSeriesBoosting&&(b=c(a)),B.allocate(b))},pushSeries:function(a){0<w.length&&w[w.length-1].hasMarkers&&(w[w.length-1].markerTo=
v.length);r.debug.timeSeriesProcessing&&console.time("building "+a.type+" series");w.push({segments:[],markerFrom:v.length,colorData:[],series:a,zMin:Number.MAX_VALUE,zMax:-Number.MAX_VALUE,hasMarkers:a.options.marker?!1!==a.options.marker.enabled:!1,showMarksers:!0,drawMode:{area:"lines",arearange:"lines",areaspline:"line_strip",column:"lines",columnrange:"lines",bar:"lines",line:"line_strip",scatter:"points",heatmap:"triangles",treemap:"triangles",bubble:"points"}[a.type]||"line_strip"});f(a,w[w.length-
1]);r.debug.timeSeriesProcessing&&console.timeEnd("building "+a.type+" series")},setSize:function(a,b){G===a&&b===b||!g||(G=a,t=b,g.bind(),g.setPMatrix([2/G,0,0,0,0,-(2/t),0,0,0,0,-2,0,-1,1,-1,1]))},inited:function(){return W},setThreshold:m,init:function(a,c){function d(a,b){var c={isReady:!1,texture:I.createElement("canvas"),handle:e.createTexture()},d=c.texture.getContext("2d");E[a]=c;c.texture.width=512;c.texture.height=512;d.mozImageSmoothingEnabled=!1;d.webkitImageSmoothingEnabled=!1;d.msImageSmoothingEnabled=
!1;d.imageSmoothingEnabled=!1;d.strokeStyle="rgba(255, 255, 255, 0)";d.fillStyle="#FFF";b(d);try{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c.handle),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,c.texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.bindTexture(e.TEXTURE_2D,
null),c.isReady=!0}catch(da){}}var f=0,h=["webgl","experimental-webgl","moz-webgl","webkit-3d"];W=!1;if(!a)return!1;for(r.debug.timeSetup&&console.time("gl setup");f<h.length&&!(e=a.getContext(h[f],{}));f++);if(e)c||b();else return!1;e.enable(e.BLEND);e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);e.disable(e.DEPTH_TEST);e.depthFunc(e.LESS);g=pa(e);if(!g)return!1;B=S(e,g);d("circle",function(a){a.beginPath();a.arc(256,256,256,0,2*Math.PI);a.stroke();a.fill()});d("square",function(a){a.fillRect(0,
0,512,512)});d("diamond",function(a){a.beginPath();a.moveTo(256,0);a.lineTo(512,256);a.lineTo(256,512);a.lineTo(0,256);a.lineTo(256,0);a.fill()});d("triangle",function(a){a.beginPath();a.moveTo(0,512);a.lineTo(256,0);a.lineTo(512,512);a.lineTo(0,512);a.fill()});d("triangle-down",function(a){a.beginPath();a.moveTo(0,0);a.lineTo(256,512);a.lineTo(512,0);a.lineTo(0,0);a.fill()});W=!0;r.debug.timeSetup&&console.timeEnd("gl setup");return!0},render:K,settings:r,valid:function(){return!1!==e},clear:d,flush:b,
setXAxis:k,setYAxis:l,data:A,gl:function(){return e},allocateBuffer:function(a){var b=0;r.usePreallocated&&(n(a.series,function(a){a.isSeriesBoosting&&(b+=c(a))}),B.allocate(b))},destroy:function(){b();B.destroy();g.destroy();e&&(ra(E,function(a){E[a].handle&&e.deleteTexture(E[a].handle)}),e.canvas.width=1,e.canvas.height=1)},setOptions:function(a){sa(!0,r,a)}}}function ka(a,c){var d=a.chartWidth,f=a.chartHeight,b=a,k=a.seriesGroup||c.group,l=I.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#Extensibility",
"1.1"),b=a.isChartSeriesBoosting()?a:c,l=!1;b.renderTarget||(b.canvas=ta,a.renderer.forExport||!l?(b.renderTarget=a.renderer.image("",0,0,d,f).addClass("highcharts-boost-canvas").add(k),b.boostClear=function(){b.renderTarget.attr({href:""})},b.boostCopy=function(){b.boostResizeTarget();b.renderTarget.attr({href:b.canvas.toDataURL("image/png")})}):(b.renderTargetFo=a.renderer.createElement("foreignObject").add(k),b.renderTarget=I.createElement("canvas"),b.renderTargetCtx=b.renderTarget.getContext("2d"),
b.renderTargetFo.element.appendChild(b.renderTarget),b.boostClear=function(){b.renderTarget.width=b.canvas.width;b.renderTarget.height=b.canvas.height},b.boostCopy=function(){b.renderTarget.width=b.canvas.width;b.renderTarget.height=b.canvas.height;b.renderTargetCtx.drawImage(b.canvas,0,0)}),b.boostResizeTarget=function(){d=a.chartWidth;f=a.chartHeight;(b.renderTargetFo||b.renderTarget).attr({x:0,y:0,width:d,height:f}).css({pointerEvents:"none",mixedBlendMode:"normal",opacity:1});b instanceof h.Chart&&
b.markerGroup.translate(a.plotLeft,a.plotTop)},b.boostClipRect=a.renderer.clipRect(),(b.renderTargetFo||b.renderTarget).clip(b.boostClipRect),b instanceof h.Chart&&(b.markerGroup=b.renderer.g().add(k),b.markerGroup.translate(c.xAxis.pos,c.yAxis.pos)));b.canvas.width=d;b.canvas.height=f;b.boostClipRect.attr(a.getBoostClipRect(b));b.boostResizeTarget();b.boostClear();b.ogl||(b.ogl=qa(function(){b.ogl.settings.debug.timeBufferCopy&&console.time("buffer copy");b.boostCopy();b.ogl.settings.debug.timeBufferCopy&&
console.timeEnd("buffer copy")}),b.ogl.init(b.canvas)||h.error("[highcharts boost] - unable to init WebGL renderer"),b.ogl.setOptions(a.options.boost||{}),b instanceof h.Chart&&b.ogl.allocateBuffer(a));b.ogl.setSize(d,f);return b.ogl}function la(a,c,d){a&&c.renderTarget&&c.canvas&&!(d||c.chart).isChartSeriesBoosting()&&a.render(d||c.chart)}function ma(a,c){a&&c.renderTarget&&c.canvas&&!c.chart.isChartSeriesBoosting()&&a.allocateBufferForSingleSeries(c)}function ua(a){var c=!0;this.chart.options&&
this.chart.options.boost&&(c="undefined"===typeof this.chart.options.boost.enabled?!0:this.chart.options.boost.enabled);if(!c||!this.isSeriesBoosting)return a.call(this);this.chart.isBoosting=!0;if(a=ka(this.chart,this))ma(a,this),a.pushSeries(this);la(a,this)}var M=h.win,I=M.document,va=function(){},ca=h.Chart,ea=h.Color,k=h.Series,q=h.seriesTypes,n=h.each,ra=h.objectEach,na=h.extend,N=h.addEvent,wa=h.fireEvent,xa=h.grep,H=h.isNumber,sa=h.merge,D=h.pick,z=h.wrap,R=h.getOptions().plotOptions,ta=I.createElement("canvas"),
X,oa="area arearange column columnrange bar line scatter heatmap bubble treemap".split(" "),F={};n(oa,function(a){F[a]=1});ea.prototype.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",
crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",feldspar:"#d19275",firebrick:"#b22222",
floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",
lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslateblue:"#8470ff",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",
mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",
sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",violetred:"#d02090",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};ca.prototype.isChartSeriesBoosting=function(){return D(this.options.boost&&this.options.boost.seriesThreshold,
50)<=this.series.length||O(this)};ca.prototype.getBoostClipRect=function(a){var c={x:this.plotLeft,y:this.plotTop,width:this.plotWidth,height:this.plotHeight};a===this&&n(this.yAxis,function(a){c.y=Math.min(a.pos,c.y);c.height=Math.max(a.pos-this.plotTop+a.len,c.height)},this);return c};h.eachAsync=function(a,c,d,f,b,k){b=b||0;f=f||3E4;for(var l=b+f,m=!0;m&&b<l&&b<a.length;)m=c(a[b],b),++b;m&&(b<a.length?k?h.eachAsync(a,c,d,f,b,k):M.requestAnimationFrame?M.requestAnimationFrame(function(){h.eachAsync(a,
c,d,f,b)}):setTimeout(function(){h.eachAsync(a,c,d,f,b)}):d&&d())};k.prototype.getPoint=function(a){var c=a,d=this.xData||this.options.xData||this.processedXData||!1;!a||a instanceof this.pointClass||(c=(new this.pointClass).init(this,this.options.data[a.i],d?d[a.i]:void 0),c.category=c.x,c.dist=a.dist,c.distX=a.distX,c.plotX=a.plotX,c.plotY=a.plotY,c.index=a.i);return c};z(k.prototype,"searchPoint",function(a){return this.getPoint(a.apply(this,[].slice.call(arguments,1)))});N(k,"destroy",function(){var a=
this,c=a.chart;c.markerGroup===a.markerGroup&&(a.markerGroup=null);c.hoverPoints&&(c.hoverPoints=xa(c.hoverPoints,function(c){return c.series===a}));c.hoverPoint&&c.hoverPoint.series===a&&(c.hoverPoint=null)});z(k.prototype,"getExtremes",function(a){if(!this.isSeriesBoosting||!this.hasExtremes||!this.hasExtremes())return a.apply(this,Array.prototype.slice.call(arguments,1))});n(oa,function(a){R[a]&&(R[a].boostThreshold=5E3,R[a].boostData=[],q[a].prototype.fillOpacity=!0)});n(["translate","generatePoints",
"drawTracker","drawPoints","render"],function(a){function c(c){var d=this.options.stacking&&("translate"===a||"generatePoints"===a);if(!this.isSeriesBoosting||d||!P(this.chart)||"heatmap"===this.type||"treemap"===this.type||!F[this.type]||0===this.options.boostThreshold)c.call(this);else if(this[a+"Canvas"])this[a+"Canvas"]()}z(k.prototype,a,c);"translate"===a&&n("column bar arearange columnrange heatmap treemap".split(" "),function(d){q[d]&&z(q[d].prototype,a,c)})});z(k.prototype,"processData",function(a){function c(a){return d.chart.isChartSeriesBoosting()||
(a?a.length:0)>=(d.options.boostThreshold||Number.MAX_VALUE)}var d=this,f=this.options.data;P(this.chart)&&F[this.type]?(c(f)&&"heatmap"!==this.type&&"treemap"!==this.type&&!this.options.stacking&&this.hasExtremes&&this.hasExtremes(!0)||(a.apply(this,Array.prototype.slice.call(arguments,1)),f=this.processedXData),(this.isSeriesBoosting=c(f))?this.enterBoost():this.exitBoost&&this.exitBoost()):a.apply(this,Array.prototype.slice.call(arguments,1))});N(k,"hide",function(){this.canvas&&this.renderTarget&&
(this.ogl&&this.ogl.clear(),this.boostClear())});k.prototype.enterBoost=function(){this.alteredByBoost=[];n(["allowDG","directTouch","stickyTracking"],function(a){this.alteredByBoost.push({prop:a,val:this[a],own:this.hasOwnProperty(a)})},this);this.directTouch=this.allowDG=!1;this.stickyTracking=!0;this.animate=null;this.labelBySeries&&(this.labelBySeries=this.labelBySeries.destroy())};k.prototype.exitBoost=function(){n(this.alteredByBoost||[],function(a){a.own?this[a.prop]=a.val:delete this[a.prop]},
this);this.boostClear&&this.boostClear()};k.prototype.hasExtremes=function(a){var c=this.options,d=this.xAxis&&this.xAxis.options,f=this.yAxis&&this.yAxis.options;return c.data.length>(c.boostThreshold||Number.MAX_VALUE)&&H(f.min)&&H(f.max)&&(!a||H(d.min)&&H(d.max))};k.prototype.destroyGraphics=function(){var a=this,c=this.points,d,f;if(c)for(f=0;f<c.length;f+=1)(d=c[f])&&d.destroyElements&&d.destroyElements();n(["graph","area","tracker"],function(b){a[b]&&(a[b]=a[b].destroy())})};h.hasWebGLSupport=
function(){var a=0,c,d=["webgl","experimental-webgl","moz-webgl","webkit-3d"],f=!1;if("undefined"!==typeof M.WebGLRenderingContext)for(c=I.createElement("canvas");a<d.length;a++)try{if(f=c.getContext(d[a]),"undefined"!==typeof f&&null!==f)return!0}catch(b){}return!1};h.hasWebGLSupport()?(h.extend(k.prototype,{renderCanvas:function(){function a(a,b){var c,d,f=!1,g="undefined"===typeof k.index,h=!0;if(!g&&(N?(c=a[0],d=a[1]):(c=a,d=q[b]),H?(N&&(d=a.slice(1,3)),f=d[0],d=d[1]):M&&(c=a.x,d=a.stackY,f=d-
a.y),x||(h=d>=z&&d<=t),null!==d&&c>=v&&c<=e&&h))if(a=Math.ceil(l.toPixels(c,!0)),I){if(void 0===Y||a===D){H||(f=d);if(void 0===O||d>R)R=d,O=b;if(void 0===Y||f<P)P=f,Y=b}a!==D&&(void 0!==Y&&(d=m.toPixels(R,!0),E=m.toPixels(P,!0),da(a,d,O),E!==d&&da(a,E,Y)),Y=O=void 0,D=a)}else d=Math.ceil(m.toPixels(d,!0)),da(a,d,b);return!g}function c(){wa(d,"renderedCanvas");delete d.buildKDTree;d.buildKDTree();S.debug.timeKDTree&&console.timeEnd("kd tree building")}var d=this,f=d.options||{},b=!1,k=d.chart,l=this.xAxis,
m=this.yAxis,n=f.xData||d.processedXData,q=f.yData||d.processedYData,g=f.data,b=l.getExtremes(),v=b.min,e=b.max,b=m.getExtremes(),z=b.min,t=b.max,A={},D,I=!!d.sampling,F,w=!1!==f.enableMouseTracking,E=m.getThreshold(f.threshold),H=d.pointArrayMap&&"low,high"===d.pointArrayMap.join(","),M=!!f.stacking,r=d.cropStart||0,x=d.requireSorting,N=!n,P,R,Y,O,S,ea="x"===f.findNearestPointBy,ca=this.xData||this.options.xData||this.processedXData||!1,da=function(a,b,c){X=ea?a:a+","+b;w&&!A[X]&&(A[X]=!0,k.inverted&&
(a=l.len-a,b=m.len-b),F.push({x:ca?ca[r+c]:!1,clientX:a,plotX:a,plotY:b,i:r+c}))},b=ka(k,d);k.isBoosting=!0;S=b.settings;if(this.visible){if(this.points||this.graph)this.animate=null,this.destroyGraphics();k.isChartSeriesBoosting()?(this.markerGroup=k.markerGroup,this.renderTarget&&(this.renderTarget=this.renderTarget.destroy())):this.markerGroup=d.plotGroup("markerGroup","markers",!0,1,k.seriesGroup);F=this.points=[];d.buildKDTree=va;b&&(ma(b,this),b.pushSeries(d),la(b,this,k));k.renderer.forExport||
(S.debug.timeKDTree&&console.time("kd tree building"),h.eachAsync(M?d.data:n||g,a,c))}}}),n(["heatmap","treemap"],function(a){q[a]&&z(q[a].prototype,"drawPoints",ua)}),q.bubble&&(delete q.bubble.prototype.buildKDTree,z(q.bubble.prototype,"markerAttribs",function(a){return this.isSeriesBoosting?!1:a.apply(this,[].slice.call(arguments,1))})),q.scatter.prototype.fill=!0,na(q.area.prototype,{fill:!0,fillOpacity:!0,sampling:!0}),na(q.column.prototype,{fill:!0,sampling:!0}),h.Chart.prototype.callbacks.push(function(a){N(a,
"predraw",function(){a.boostForceChartBoost=void 0;a.boostForceChartBoost=O(a);a.isBoosting=!1;!a.isChartSeriesBoosting()&&a.didBoost&&(a.didBoost=!1);a.boostClear&&a.boostClear();a.canvas&&a.ogl&&a.isChartSeriesBoosting()&&(a.didBoost=!0,a.ogl.allocateBuffer(a));a.markerGroup&&a.xAxis&&0<a.xAxis.length&&a.yAxis&&0<a.yAxis.length&&a.markerGroup.translate(a.xAxis[0].pos,a.yAxis[0].pos)});N(a,"render",function(){a.ogl&&a.isChartSeriesBoosting()&&a.ogl.render(a)})})):"undefined"!==typeof h.initCanvasBoost?
h.initCanvasBoost():h.error(26)})(v)});
//# sourceMappingURL=boost.js.map