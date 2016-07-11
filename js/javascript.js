function render() {
  $('#container').css('background','#FFFFFF');
  var gameBoard = document.querySelector("#container");
  gameBoard.innerHTML = '';
  for (i = 0; i < 9; i++) {
    gameBoard.innerHTML += '<div class="cell" id="c' + i + '"></div>';
  }
}

function Player(letter) {
  this.letter = letter,
  this.places = []
}

function start_game() {
  var board = new render();
  var player1 = new Player("x");
  var player2 = new Player("o");
  var winner = [['c0','c1','c2'], ['c3','c4','c5'], ['c6','c7','c8'], ['c0','c3','c6'], ['c1','c4','c7'], ['c2','c5','c8'], ['c0','c4','c8'], ['c2','c4','c6']];
  var currentPlayer = player1;
  var nowinner = 0;
  
  $('h3').text("Turn: x");

  $('.cell').click(function() {
    if ($(this).text() == '') {
      $(this).text(currentPlayer.letter);
      currentPlayer.places.push($(this).attr('id'));
      if (won(currentPlayer.places, winner) || nowinner >= 8) {
        if (nowinner >= 8) {
          $('h3').text('Nobody won!');
        } else {
          $('h3').text('The winner is: ' + currentPlayer.letter + "'s");
        }
        setTimeout(function() {
          $("#container").innerHTML = '';
          $("#container div").fadeOut();
          $('#container').css('background','#FE7E25');
          $('#play').show();
        }, 3000);
      } else {
        turn();
      }
    }
  });
  
  function turn() {
    currentPlayer = (currentPlayer == player1) ? player2 : player1;
    $('h3').text('Turn: ' + currentPlayer.letter);
    nowinner += 1;
  }
  
  function won(value, arreglo) {
    var val1 = value.sort()
    var flag = false;
    for (var i = 0; i < 8; i++ ) {
      var count = 0;
      for (var k = 0; k < arreglo[i].length; k++) {
        if (val1.indexOf(arreglo[i][k]) > -1) { count++; }
      }
      if (count >= 3) {
        flag = true;
        arreglo[i].forEach(function(cel){
          $('#' + cel).css("color","yellow");
        });
      }
    }
    return flag;
  }
}

$(document).ready(function(){
  $('#play').click(function(){
    $("#play").hide();
    start_game();
  });
});
