
let myShader;



function preload(){
    // myShader = loadShader('shader1.vert', 'shader1.frag');
    myShader = loadShader('shader2.vert', 'shader3.frag');

}

function setup(){
    createCanvas(1000, 1000, WEBGL)
}

function draw(){

    shader(myShader);
    myShader.setUniform("iResolution", [width, height]);
    myShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
    myShader.setUniform("iTime", frameCount/100);
    // myShader.setUniform("iFrame", frameCount);

    rect(0,0,200, 200);

}

