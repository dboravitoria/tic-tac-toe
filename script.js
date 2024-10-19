window.onload = function(){
  let turnPlayer = '';
  const player1 = document.getElementById('player1')
  const player2 = document.getElementById('player2')
  const time = document.getElementById('time')
  const board = document.querySelectorAll('#gameBoard span')
  let vBoard = []

  function updateTitle(){
      const player = turnPlayer === 'player1' ? player1.value : player2.value;
      time.innerText = player;
  }

  function cleanPlayer(){
      player1.value = '';
      player2.value = '';
      document.querySelector('h2').innerText = '';
  }

  function getWinRegions(){
      let winRegions = [];
      if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
          winRegions.push("0.0", "0.1", "0.2");
      if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
          winRegions.push("1.0", "1.1", "1.2");
      if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
          winRegions.push("2.0", "2.1", "2.2");
      if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
          winRegions.push("0.0", "1.0", "2.0");
      if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
          winRegions.push("0.1", "1.1", "2.1");
      if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
          winRegions.push("0.2", "1.2", "2.2");
      if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
          winRegions.push("0.0", "1.1", "2.2");
      if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
          winRegions.push("0.2", "1.1", "2.0");
      return winRegions;
  }

  function initialize(){
      vBoard = [['','',''],['','',''],['','','']];
      turnPlayer = 'player1';
      updateTitle();
  
      board.forEach(function(element){
          element.classList.remove('win');
          element.innerText = '';
          element.style.cursor = 'pointer';
          element.addEventListener('click', handleBoard);
      });
  }

  function disabledRegion(element){
      element.style.cursor = 'default';
      element.removeEventListener('click', handleBoard);
  }
  function disableAllRegions(){
    board.forEach(function(element){
        disabledRegion(element); // Desabilitar todas as regiões
    });
}
function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

  function handleBoard(ev){
      const span = ev.currentTarget;
      const region = span.dataset.region;
      const [row, column] = region.split('.');

      // Marcar a jogada e alternar o turno
      if(turnPlayer === 'player1'){
          span.innerText = 'X';
          vBoard[row][column] = 'X';
      } else {
          span.innerText = 'O';
          vBoard[row][column] = 'O';
      }

      disabledRegion(span);
      console.clear();
      console.table(vBoard);

      let winRegions = getWinRegions();

        if(winRegions.length > 0){
            const winner = turnPlayer === 'player1' ? player1.value : player2.value;
            document.querySelector('h2').innerText = `Parabéns ${winner}, você venceu!!`; // Exibir mensagem de vitória
            winRegions.forEach(function(region){
                document.querySelector(`[data-region="${region}"]`).classList.add('win');
            });
            disableAllRegions(); // Desabilitar todas as regiões
        } else if(!vBoard.flat().includes('')){ // Empate
            document.querySelector('h2').innerText = 'Empate!';
        } else {
            // Alternar turno se não houver vencedor
            turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1';
            updateTitle();
        }
    }

  document.getElementById('already').addEventListener('click', initialize);

};
