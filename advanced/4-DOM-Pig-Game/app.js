/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0; // 0 - first player, 1 - second player

document.querySelector('.dice').style.display = 'none'; // hide image

//document.querySelector('#current-'+ activePlayer).textContent = dice
// document.querySelector('#current-'+ activePlayer).innerHTML = '<em>' + dice  + '</em>'
//var x = document.querySelector('#score-0').textContent;

document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. Rand number
  var  dice = Math.floor(Math.random()*6) + 1;
  //2. Display result
  var diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + dice + '.png';
  //3. Update the round score IF the rolled number was NOT 1
  if(dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //next player
  }
})
