var tictactoe = (function() {
  var lock = false,
      boxesFilled = 0,
      symbol = 'X',
      winners = {},
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


  //cache DOM
  $prompt = $('#prompt');


  //bind events
  $('.board-box').click(handleBoxClick);

  newGame();

  function toggleLock(state) {
    lock = !lock;
  }

  function handleBoxClick() {
    $box = $(this);
    scoreList = membership[$box.attr('id')];

    if (!lock) {
      if ($box.text() === "") {
        $box.text(symbol);
        ++boxesFilled;
        scoreList.forEach(registerScore);
        changeSymbol();
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
      winGame(members);
    } else if (boxesFilled === 9) {
      drawGame(members);
    }
  }


  function newGame(boxList) {
    toggleLock();
    $prompt.html('<button id="selectX">X</button> or <button id="selectO">O</button>?')
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
    changeBGColorById(boxList, 'green');
    $prompt.text('WINNER! CLICK HERE TO RESTART!')
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
    $('.board-box').text("");
    $prompt.hide().text("");
    changeBGColorById(list.data.list, 'gray');
    boxesFilled = 0;
    symbol = 'X';
    winners = {};
    toggleLock();
    newGame();
  }

  function changeBGColorById(list, color) {
    list.forEach(function(item) {
      $('#' + item).css('background-color', color)
    });
  }

})();
