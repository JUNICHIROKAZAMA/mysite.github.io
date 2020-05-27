'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();
      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');

        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          checkResult();
          spin.classList.remove('inactive');
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
        'img/inu.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  const seven = 'file:///Users/JunichiroKazama/Desktop/MySlotMachine2/img/seven.png';
  const bell = 'file:///Users/JunichiroKazama/Desktop/MySlotMachine2/img/bell.png';
  const cherry ='file:///Users/JunichiroKazama/Desktop/MySlotMachine2/img/cherry.png';
  const inu = 'file:///Users/JunichiroKazama/Desktop/MySlotMachine2/img/inu.png';

  const money = document.getElementById('money');

  function getMoney(){
    money.textContent = moneyLeft + '円';
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
    if(panels[0].img.src === bell && panels[1].img.src === bell && panels[2].img.src === bell){
      moneyLeft += 80;
    }
    if(panels[0].img.src === cherry && panels[1].img.src === cherry && panels[2].img.src === cherry){
      moneyLeft += 100;
    }
    if(panels[0].img.src === seven && panels[1].img.src === seven && panels[2].img.src === seven){
      moneyLeft += 200;
    }
    if(panels[0].img.src === inu && panels[1].img.src === inu && panels[2].img.src === inu){
      moneyLeft -= 300;
    }
    getMoney();
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3;
  let moneyLeft = 1000;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');

    moneyLeft -= 10;
    getMoney();

    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}