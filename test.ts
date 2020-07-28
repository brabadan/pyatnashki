class Fishka {
    public el: HTMLElement;
    public draggable = false;

    constructor(public num, public posX: number, public posY: number, public pyatnashki: Pyatnashki) {
        this.el = document.createElement('div');
        this.el.classList.add('fishka');
        this.el.innerHTML = '<span style="font-size: ' + (pyatnashki.fishkaWidth + pyatnashki.fishkaHeight) / 4 + '">' + this.num + '</span>';
        this.el.onmousedown = (ev) => {
            this.onclick(ev);
            return false;
        };
        this.show();

        pyatnashki.parentEl.appendChild(this.el);
    }

    onclick(ev) {
        if (this.draggable) {
            this.pyatnashki.onClickDraggable(this.posX, this.posY);
        }
        return;
        
        if ((this.posX == this.pyatnashki.pustoX && (this.posY == this.pyatnashki.pustoY + 1 || this.posY == this.pyatnashki.pustoY - 1)) || (this.posY == this.pyatnashki.pustoY && (this.posX == this.pyatnashki.pustoX + 1 || this.posX == this.pyatnashki.pustoX - 1))) {
            [this.posX, this.pyatnashki.pustoX] = [this.pyatnashki.pustoX, this.posX];
            [this.posY, this.pyatnashki.pustoY] = [this.pyatnashki.pustoY, this.posY];
            this.show();
            this.pyatnashki.checkWin();
        }
    };

    show() {
        let [width, height] = [this.pyatnashki.fishkaWidth, this.pyatnashki.fishkaHeight];
        this.el.setAttribute('style', 'left: ' + this.posX * width + 'px; top: ' + this.posY * height + 'px; width: ' + (width - 6) + 'px; height: ' + (height - 6) + 'px');
        if (this.draggable) {
            this.el.classList.add('draggable');
        } else {
            this.el.classList.remove('draggable');
        }
    }
}

class Pyatnashki {
    public fishki: Fishka[] = [];
    public parentEl: HTMLElement;
    public fishkaWidth: number;
    public fishkaHeight: number;
    public pustoX = 0;
    public pustoY = 0;

    constructor(id: string, public colX = 4, public colY = 4) {
        this.parentEl = document.getElementById(id);
        this.fishkaWidth = this.parentEl.clientWidth / colX;
        this.fishkaHeight = this.parentEl.clientHeight / colY;
        this.initFishki();
        this.parentEl.onmousedown = this.parentEl.onselectstart = function () {
            return false
        };
    }

    initFishki() {
        for (let y = 0; y < this.colY; y++) {
            for (let x = 0; x < this.colX; x++) {
                let num = this.colX * this.colY - x - this.colX * y;
                let fishka = new Fishka(num, x, y, this);
                this.fishki.push(fishka);
            }
        }
        this.fishki[0].el.parentNode.removeChild(this.fishki[0].el);
        this.fishki = this.fishki.slice(1);
        this.initDraggables();
    }

    initDraggables() {
        this.fishki.forEach(fishka => {
            fishka.draggable = fishka.posX === this.pustoX || fishka.posY === this.pustoY;
            fishka.show();
        })
    }
    
    onClickDraggable(posX: number, posY: number) {
        if (posX !== this.pustoX && posY !== this.pustoY) {
            return;
        }
        if (posX === this.pustoX) {
            const delta = Math.abs(this.pustoY - posY) / (this.pustoY - posY);
            this.fishki.forEach(fishka => {
                if (
                    (fishka.posX === this.pustoX && 
                    (this.pustoY < fishka.posY && fishka.posY <= posY || this.pustoY > fishka.posY && fishka.posY >= posY))
                ) {
                    fishka.posY += delta;
                }
            })
        } 
        if (posY === this.pustoY) {
            const delta = Math.abs(this.pustoX - posX) / (this.pustoX - posX);
            this.fishki.forEach(fishka => {
                if (
                    (fishka.posY === this.pustoY &&
                        (this.pustoX < fishka.posX && fishka.posX <= posX || this.pustoX > fishka.posX && fishka.posX >= posX))
                ) {
                    fishka.posX += delta;
                }
            })
        }
        [this.pustoX, this.pustoY] = [posX, posY];
        
        this.initDraggables();
        this.checkWin();
    }

    checkWin() {
        for (let i = 0; i < this.fishki.length; i++) {
            if (this.fishki[i].num != this.fishki[i].posX + this.fishki[i].posY * this.colX + 1) return;
        }
        setTimeout(() => {
            alert('!!!!!! Поздравляю, Вы собрали головоломку !!!!!!!!!!!');
        }, 200);
    }

}


