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
draw(400);

function inMandelbrot(x,y) {
    let c = new Complex(x,y);
    let z = new Complex(0,0);
    const maxIterations = 25;
    for (let i = 0; i < maxIterations; i++) {
        z = Complex.add(Complex.prod(z,z), c); 
            if (z.re * z.im > 4) {
                return (i / maxIterations);
            }
    }
    return 0;
}
function updateZoom(){
    zoom = Number(document.getElementById('zoomer').innerHTML);
    draw(zoom);
}
function draw(zoom){
    const midX = myCanvas.width/2 + 200;
    const midY = myCanvas.height/2;
    for (let x = 0; x < myCanvas.width; x++) {
        for (let y = 0; y < myCanvas.width; y++) {
            const belongs = inMandelbrot((x-midX)/zoom,(y-midY)/zoom)*100;
            if (belongs === 0) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x,y, 1,1);
            } else {
                ctx.fillStyle = `hsl(205, 100%, ${belongs}%)`;
                ctx.fillRect(x,y, 1,1);
            }
        }
    }
}
