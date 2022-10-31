

function initScore(trades) {

    const cash = document.getElementById('userCash');
    const cashType = document.getElementById('cashType');

    cash.textContent = 3289;
    cashType.textContent = '€';

    const userPoint = trades;
    const maxPoints = 100;
    const angle = 360;
    const userPercent = pointsToPercent(userPoint, maxPoints, true);
    const endAngle = percentToPoints(userPercent, angle, false);
    const scoreText = document.getElementById('scoreText');

    function pointsToPercent(point, maxPoints, isRound) {
        return isRound ? Math.round(point / (maxPoints / 100)) : (point / (maxPoints / 100)).toFixed(2);
    }

    function percentToPoints(percent, maxPoints, isRound) {
        return isRound ? Math.round(percent * (maxPoints / 100)) : (percent * (maxPoints / 100)).toFixed(2);
    }

    function radianToDegree(radians) {
        return (radians * 180) / Math.PI;
    }

    function degreeToRadian(degrees) {
        return degrees * (Math.PI / 180);
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 100;
    canvas.height = 100;
    canvas.style.transform = 'rotateZ(-90deg)';
    canvas.style.position = 'absolute';
    document.getElementsByClassName('main-circle')[0].appendChild(canvas);

    let id = null;
    let fps = 60;
    let period = 1000 / fps;
    let duration = 3000;
    let time = 0;
    let deg = 0;
    let percent = userPercent < 50 ? 0 : -1;
    let incPercent = userPoint / (duration / period);
    let incDeg = endAngle / (duration / period);
    let incColorAngle = (360 / 255);
    let r = 255;
    let g = 0;
    let b = 0;

    id = setInterval(() => {

        if (time >= duration) {
            clearInterval(id);
        }

        deg += incDeg;

        r -= deg >= 180 ? (incColorAngle * 2) : 0;
        g += incColorAngle;

        percent += incPercent;
        scoreText.textContent = Math.round(percent) + '%';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc((canvas.width / 2), (canvas.height / 2), (canvas.width / 2) - 10, degreeToRadian(0), degreeToRadian(deg), false);
        ctx.lineWidth = '10';
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.stroke();

        time += period;

    }, period);

} 
