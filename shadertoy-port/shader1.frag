#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform vec2 iTime;





vec3 hash3( vec2 p )
{
    vec3 q = vec3( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)), 
				   dot(p,vec2(419.2,371.9)) );
	return fract(sin(q)*43758.5453);
}

float voronoise( in vec2 p, float u, float v )
{
	float k = 1.0+63.0*pow(1.0-v,6.0);

    vec2 i = floor(p);
    vec2 f = fract(p);
    
	vec2 a = vec2(0.0,0.0);
    for( int y=-2; y<=2; y++ )
    for( int x=-2; x<=2; x++ )
    {
        vec2  g = vec2( x, y );
		vec3  o = hash3( i + g )*vec3(u,u,1.0);
		vec2  d = g - f + o.xy;
		float w = pow( 1.0-smoothstep(0.0,1.414,length(d)), k );
		a += vec2(o.z*w,w);
    }
	
    return a.x/a.y;
}

void main()
{

    // vec3 t = (float(iFrame)*vec3(1.0,2.0,3.0)/1.0)/1000.0;//+iMouse.xyz/1000.0;


    // // Normalized pixel coordinates (from 0 to 1)
    // vec2 uv = gl_FragCoord.xy/iResolution.xy;
    // uv=uv/4.0+.5;
    // uv-=iMouse.xy/iResolution.xy/4.0;

    // vec3 col = vec3(0.0);



// vec2 uv = gl_FragCoord.xy/iResolution.xy;
// gl_FragColor = vec4(col,1.0);

	vec2 uv = gl_FragCoord.xy / iResolution.xy;

    vec2 p = 0.5 - 0.5*cos( iTime*vec2(1.0,0.5) );
    
	p = vec2(0.0,1.0) + vec2(1.0,-1.0)*iMouse.xy/iResolution.xy;
	
	p = p*p*(3.0-2.0*p);
	p = p*p*(3.0-2.0*p);
	p = p*p*(3.0-2.0*p);
	
	float f = voronoise( 24.0*uv, p.x, p.y );
	
   
	gl_FragColor = vec4( f, f, f, 1.0 );
}