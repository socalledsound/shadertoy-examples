float random( vec2 p )
{
    float q = p.x * 269.5 + p.y * 183.3;
	return fract( sin( q ) * 43758.5453 );
}

float noise( vec2 point )
{
	vec2 p = floor( point );
	vec2 f = fract( point );
	return mix(
		mix( random( p + vec2( 0.0, 0.0 ) ), random( p + vec2( 1.0, 0.0 ) ), f.x ),
		mix( random( p + vec2( 0.0, 1.0 ) ), random( p + vec2( 1.0, 1.0 ) ), f.x ),
		f.y
	);
}

float fractal( vec2 point )
{
    float sum = 0.0;
    float scale = 0.5;
    for ( int i = 0; i < 5; i++ )
	{
		sum += noise( point ) * scale;
		point *= 2.0;
        scale /= 2.0;
	}
    
	return sum;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 point = fragCoord.xy / iResolution.x;
    point.x += iTime * 0.1;
    
    point.y /= 5.0;
    point.x /= 50.0;
    float value    = fractal( point * 20.0 );
    
    value = value * 40.0;
    value = fract(value);
    
    vec3 darkBrown = vec3( 0.5, 0.1, 0.1 );
    vec3 lightBrown = vec3( 0.75, 0.4, 0.2 );
    vec3 color = mix( darkBrown, lightBrown, value );
    
    
	fragColor.rgb = color;
}
