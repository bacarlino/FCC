var tictactoe = (function() {
  var lock = false,
      multiplayer = false,
      playersTurn = true,
      boxesFilled = 0,
      boxesRemain = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      symbol = 'X',
      state = '',
      winners = {},
      winningMembers = [],
      membership = {
        one: ['rowOne', 'colOne', 'diagOne'],
        two: ['rowOne', 'colTwo'],
        three: ['rowOne', 'colThree', 'diagTwo'],
        four: ['rowTwo', 'colOne'],
        five: ['rowTwo', 'colTwo', 'diagOne', 'diagTwo'],
        six: ['rowTwo', 'colThree'],
        seven: ['rowThree', 'colOne', 'diagTwo'],
        eight: ['rowThree', 'colTwo'],
        nine: ['rowThree', 'colThree', 'diagOne']
      };

  // cache DOM
  $prompt = $('#prompt');

  // bind events
  $('.board-box').click(handleBoxClick);

  // kickoff app
  newGame();

  function toggleLock(state) {
    lock = !lock;
  }

  function togglePlayersTurn() {
    playersTurn = !playersTurn;
  }

  function handleBoxClick() {
    $box = $(this);
    $id = $box.attr('id');
    scoreList = membership[$id];

    if (!lock) {
      if ($box.text() === "") {
        $box.text(symbol);
        ++boxesFilled;
        boxesRemain.splice(boxesRemain.indexOf($id), 1);
        scoreList.forEach(registerScore);

        if (state === 'win') {
          winGame(winningMembers);
        }
        if (boxesFilled === 9 && state != 'win') {
          drawGame();
        }
        changeSymbol();
        if (!multiplayer) {
          togglePlayersTurn();
          if (!playersTurn) {
            runAI();
          }
        }
      }
    }
  }

  function changeSymbol() {
    if (symbol === 'X') {
      symbol = 'O';
    } else {
      symbol = 'X';
    }
  }

  function registerScore(score) {
    winners[score] = winners[score] || {X: 0, O: 0, members: []};
    ++winners[score][symbol];
    var members = winners[score]['members'];
    members.push($box.attr('id'));
    if (winners[score][symbol] === 3) {
      state = 'win';
      winningMembers = members;
      // winGame(members);
    }
  }


  // For now, AI just chooses randomly
  function runAI() {
    var boxID = boxesRemain[Math.floor(Math.random() * boxesRemain.length)];
    $('#' + boxID).trigger('click');
  }


  function newGame(boxList) {
    toggleLock();
    choosePlayers();
  }

  function choosePlayers() {
    $prompt.html('<button id="select1">1</button> or <button id="select2">2</button> player?')
           .fadeIn();
    $('#select1').one('click', function() {
      multiplayer = false;
      $prompt.hide();
      chooseSymbol();
    });
    $('#select2').one('click', function() {
      multiplayer = true;
      $prompt.hide();
      toggleLock();
    });
  }

  function chooseSymbol() {
    $prompt.html('<button id="selectX">X</button> or <button id="selectO">O</button>')
           .fadeIn();
    $('#selectX').one('click', function() {
      symbol = 'X';
      $prompt.fadeOut();
      toggleLock();
    });
    $('#selectO').one('click', function() {
      symbol = 'O';
      $prompt.fadeOut();
      toggleLock();
    });
  }

  function winGame(boxList) {
    toggleLock();
    changeBGColorById(boxList, 'dodgerblue');
    $prompt.text(symbol + ' WINS! CLICK TO RESTART')
                    .one('click',{list: boxList}, clearGame)
                    .fadeIn();
  }

  function drawGame(boxList) {
    toggleLock();
    $prompt.text('DRAW... CLICK HERE TO RESTART!')
                    .one('click',{list: boxList}, clearGame)
                    .fadeIn();
  }

  function clearGame(list) {
    $('.board-box').text("").css('background-color', '');
    $prompt.hide().text("");
    boxesFilled = 0;
    symbol = 'X';
    winners = {};
    playersTurn = true;
    boxesRemain = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    multiplayer = false;
    state = '';
    toggleLock();
    newGame();
  }

  function changeBGColorById(list, color) {
    list.forEach(function(item) {
      $('#' + item).css('background-color', color)
    });
  }
})();
