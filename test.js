var Fishka = (function () {
    function Fishka(num, posX, posY, pyatnashki) {
        var _this = this;
        this.num = num;
        this.posX = posX;
        this.posY = posY;
        this.pyatnashki = pyatnashki;
        this.el = document.createElement('div');
        this.el.classList.add('fishka');
        this.el.innerHTML = '<span style="font-size: ' + (pyatnashki.fishkaWidth + pyatnashki.fishkaHeight) / 4 + '">' + this.num + '</span>';
        this.el.onmousedown = function (ev) { _this.onclick(ev); return false; };
        this.show();
        pyatnashki.parentEl.appendChild(this.el);
    }
    Fishka.prototype.onclick = function (ev) {
        if ((this.posX == this.pyatnashki.pustoX && (this.posY == this.pyatnashki.pustoY + 1 || this.posY == this.pyatnashki.pustoY - 1)) || (this.posY == this.pyatnashki.pustoY && (this.posX == this.pyatnashki.pustoX + 1 || this.posX == this.pyatnashki.pustoX - 1))) {
            _a = [this.pyatnashki.pustoX, this.posX], this.posX = _a[0], this.pyatnashki.pustoX = _a[1];
            _b = [this.pyatnashki.pustoY, this.posY], this.posY = _b[0], this.pyatnashki.pustoY = _b[1];
            this.show();
            this.pyatnashki.checkWin();
        }
        var _a, _b;
    };
    ;
    Fishka.prototype.show = function () {
        var _a = [this.pyatnashki.fishkaWidth, this.pyatnashki.fishkaHeight], width = _a[0], height = _a[1];
        this.el.setAttribute('style', 'left: ' + this.posX * width + 'px; top: ' + this.posY * height + 'px; width: ' + (width - 6) + 'px; height: ' + (height - 6) + 'px');
    };
    return Fishka;
}());
var Pyatnashki = (function () {
    function Pyatnashki(id, colX, colY) {
        if (colX === void 0) { colX = 4; }
        if (colY === void 0) { colY = 4; }
        this.colX = colX;
        this.colY = colY;
        this.fishki = [];
        this.pustoX = 0;
        this.pustoY = 0;
        this.parentEl = document.getElementById(id);
        this.fishkaWidth = this.parentEl.clientWidth / colX;
        this.fishkaHeight = this.parentEl.clientHeight / colY;
        this.initFishki();
        this.parentEl.onmousedown = this.parentEl.onselectstart = function () { return false; };
    }
    Pyatnashki.prototype.initFishki = function () {
        for (var y = 0; y < this.colY; y++) {
            for (var x = 0; x < this.colX; x++) {
                var num = this.colX * this.colY - x - this.colX * y;
                var fishka = new Fishka(num, x, y, this);
                this.fishki.push(fishka);
            }
        }
        this.fishki[0].el.parentNode.removeChild(this.fishki[0].el);
        this.fishki = this.fishki.slice(1);
        this.fishki.forEach(function (fishka) { fishka.show(); });
    };
    Pyatnashki.prototype.checkWin = function () {
        for (var i = 0; i < this.fishki.length; i++) {
            if (this.fishki[i].num != this.fishki[i].posX + this.fishki[i].posY * this.colX + 1)
                return;
        }
        alert('!!!!!! Поздравляю, Вы собрали головоломку !!!!!!!!!!!');
    };
    return Pyatnashki;
}());
