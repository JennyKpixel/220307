let jsondata;
let btns = [];

function preload(){
  jsondata = loadJSON('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-11-02&minmagnitude=5');
}

function setup() {
  createCanvas(400, 400,WEBGL);
  console.log(jsondata.features);
  jsondata.features.forEach((v)=>{

    let lat = v.geometry.coordinates[0];
    let lng = v.geometry.coordinates[1];
    let mag = v.properties.mag;
    noStroke();
    // fill(255,0,0,50);
    
    // circle
    // (map(lat,-180,180,-width/2,width/2),
    //  map(lng,-90,90,0,-height/2,height/2),
    //  mag*mag);
    btns.push(new btn(map(lat,-180,180,-width/2,width/2),
                      map(lng,-90,90,-height/2,height/2),
                      mag*mag));
    // let loc={
    //   lat:map(lat,-180,180,0,width),
    //   lng:map(lng,-90,90,0,height),
    //   mag:mag*mag
    // }
    // cs.push(loc);
  })
  // console.log(cs);
}

function draw() {
  background(220);
  btns.forEach((b)=>{b.display();})
}

class btn{
  constructor(x=0,y=0,s=20){
    this.x=x;
    this.y=y;
    this.s=s;
    this.a=0;
  }
  display(){
    push();
      translate(this.x,this.y);
      if (dist(mouseX-width/2,mouseY-height/2,this.x,this.y)<this.s/2){
        
        fill(255,0,0,50);
        this.a+=0.1;
      }else{
        fill(0,255,0,150);
      }
      rotate(this.a);
      box(this.s);
    pop();
  }
}