class Complex {
    constructor(re, im) {
      this.re = re;
      this.im = im;
    }
    static prod(x,y){
        let newRe = x.re * y.re - x.im * y.im;
        let newIm = x.im * y.re + x.re * y.im;
        return new Complex(newRe, newIm);
    }
    static add(x,y){
        return new Complex(x.re + y.re, x.im + y.im);
    }
    static magnitude(x){
        return Math.sqrt(x.re * x.re + x.im * x.im);
    }
}
const myCanvas = document.getElementById('canvas');
document.body.appendChild(myCanvas);
const ctx = myCanvas.getContext('2d');
var ZOOM = 300;
var ITER = 10;
myCanvas.addEventListener("click", () => {
    ZOOM = ZOOM * 1.1;
    draw(ZOOM, ITER);
});
console.log(ZOOM,ITER);
draw(ZOOM,ITER);

function inMandelbrot2(x,y, maxIterations) {
    let c = new Complex(x,y);
    let z = new Complex(0,0);
    for (let i = 0; i < maxIterations; i++) {
        z = Complex.add(Complex.prod(z,z), c); 
            if (Math.abs(z.re * z.im) > 4) {
                return (i / maxIterations);
            }
    }
    return 0;
}
function inMandelbrot(x,y,maxIterations){
    let zx = 0;
    let zy = 0;
    for (let i = 0; i < maxIterations; i++) {
        zx = zx*zx - zy*zy + x;
        zy = 2*zx*zy + y
            if (Math.abs(zx * zy) > 4) {
                return (i / maxIterations);
            }
    }
    return 0;
}
function update(){
    ZOOM = Number(document.getElementById('zoomer').value);
    ITER = Number(document.getElementById('iterer').value);
    draw(ZOOM, ITER);
}
function draw(zoom, iter){
    const midX = myCanvas.width/2 + 200;
    const midY = myCanvas.height/2;
    for (let x = 0; x < myCanvas.width; x++) {
        for (let y = 0; y < myCanvas.width; y++) {
            const belongs = inMandelbrot2((x-midX)/zoom,(y-midY)/zoom, iter)*100;
            if (belongs === 0) {
                ctx.fillStyle = '#FFF';
                ctx.fillRect(x,y, 1,1);
            } else {
                ctx.fillStyle = `hsl(222, 25%, ${100-belongs}%)`;
                ctx.fillRect(x,y, 1,1);
            }
        }
    }
}
