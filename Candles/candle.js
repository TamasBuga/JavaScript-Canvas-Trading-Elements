const traders = {
  buyers: 100,
  sellers: 0,
  summary: () => {
    return this.buyers + this.sellers;
  } 
} 

function initCandle(){
  const candleBoard = document.getElementById('candleBoard');
const canvas = document.getElementById('candleCanvas');
canvas.width = candleBoard.clientWidth;
canvas.height = candleBoard.clientHeight;
const canvas_VC = canvas.height / 2;
const canvas_HC = canvas.width / 2;

const candle = {
    x: 3,
    y: canvas_VC,
    width: 10,
    height: 20,
    gap: 3,
    color: 'red',
    grow: false,
    getWidth: function () {
        return this.gap + this.width
    }
}

let periodTimer = null;
let period = 5000;
let candleTimer = null;
let time = 0;
let t = 200;
let buyers = 0;
let sellers = 0;

clearInterval(periodTimer);

periodTimer = setInterval(() => {
    const ctx = canvas.getContext('2d');

    candleTimer = setInterval(() => {

        if (time >= period) {
            clearInterval(candleTimer);
        }

        const growing = [true, false];
        seller = Math.floor(Math.random() * 6);
        buyer = (Math.floor(Math.random() * 6) * -1);

        candle.grow = growing[Math.floor(Math.random() * growing.length)];
        candle.height = candle.grow ? candle.height + buyer : candle.height + seller;
        candle.color = candle.height < 0 ? 'rgb(120, 255, 120)' : 'red';
        
        setCandle(candle, canvas, ctx, candle.color);
        
        time += t;
        
    }, t);
    
    traders.sellers = sellers;
    traders.buyers = buyers;
    
    // Set candle properties
    candle.y += candle.height; 
    candle.x += candle.getWidth();
    candle.height = 0;


}, period);

function setCandle(candle, canvas, context, color) {
    context.clearRect(candle.x, 0, candle.getWidth(), canvas.height);
    context.fillStyle = color;
    context.fillRect(candle.x, candle.y, candle.width, candle.height);
}

} 
initCandle();
