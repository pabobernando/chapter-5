// membuat representasi class computer
class Computer {
  constructor(stylePilihan) {
    this.stylePilihan = stylePilihan;
  }
  // untuk menentukan langkah komputer secara random
  acakComputer() {
    const randomMove = Math.random();
    if (randomMove < 0.4) {
      this.ubahPilihanComputer('batu');
      return 'batu';
    } else if (randomMove >= 0.4 && randomMove < 0.5) {
      this.ubahPilihanComputer('kertas');
      return 'kertas';
    } else {
      this.ubahPilihanComputer('gunting');
      return 'gunting';
    }
  }

  ubahPilihanComputer(compu) {
    if (compu === 'gunting') {
      document.getElementsByClassName('gunting computer')[0].style = this.stylePilihan;
    }
    if (compu === 'kertas') {
      document.getElementsByClassName('kertas computer')[0].style = this.stylePilihan;
    }
    if (compu === 'batu') {
      document.getElementsByClassName('batu computer')[0].style = this.stylePilihan;
    }
  }
}

// Membuat representasi class dari Game,
class Game {
  #GAME_STATE;

  constructor() {
    this.boxShadow = 'box-shadow: 0px 0px 10px 10px rgb(255, 217, 0);background-color: #c4c4c4;';
    this.GAME_STATE = 'START';
    this.computer = new Computer(this.boxShadow);
    this.langkahPlayer = document.getElementsByClassName('player');
    this.resetButton = document.getElementsByClassName('reload')[0];
  }

  //          **                   *      *
  hasilComputerPlayer(player, compu) {
    if (player === compu) {
      return 'DRAW';
    } else if (player === 'batu') {
      return compu === 'kertas' ? 'COM WIN' : 'PLAYER WIN';
    } else if (player === 'kertas') {
      return compu === 'batu' ? 'PLAYER WIN' : 'COM WIN';
    } else {
      return compu === 'kertas' ? 'PLAYER WIN' : 'COM WIN';
    }
  }

  // memulai game,
  // pasang listener pada tiap elemen
  start() {
    for (let start = 0; start < this.langkahPlayer.length; start++) {
      const playerMoves = this.langkahPlayer[start];
      playerMoves.addEventListener('click', (e) => {
        if (this.GAME_STATE === 'START') {
          const player = e.target.closest('img').dataset.value;
          const compu = this.computer.acakComputer();
          const kalahMenang = this.hasilComputerPlayer(player, compu);
          this.gameWin(kalahMenang, compu, e);
          this.GAME_STATE = 'FINISH';
        } else {
          alert('Click Refresh Dahulu');
        }
        this.resetButton.addEventListener('click', () => {
          this.resetGame();
        });
      });
    }
  }

  // mengubah UI saat menang
  gameWin(kalahMenang, compu, e) {
    e.style = this.boxShadow;
    // tentukan langkah kompter
    document.getElementsByClassName('playerWin')[0].innerHTML = kalahMenang;
    document.getElementsByClassName('playerWin')[0].style.display = 'block';
    document.getElementsByClassName('vs')[0].style.display = 'none';
  }

  resetGame() {
    document.getElementsByClassName('batu computer')[0].style = '';
    document.getElementsByClassName('kertas computer')[0].style = '';
    document.getElementsByClassName('gunting computer')[0].style = '';
    document.getElementsByClassName('playerWin')[0].style.display = 'none';
    document.getElementsByClassName('vs')[0].style.display = 'block';
    this.GAME_STATE = 'START';
  }
}

const game = new Game();
game.start();
