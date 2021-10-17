var fight = function(enemy) {
  
  //keep track of who is first
  var isPlayersTurn =  true;

if (Math.random() >.5) { 
  isPlayerTurn = false;
}

while (playerInfo.health > 0 && enemy.health > 0){
//If it is the player-robot's turn:
  if (isPlayersTurn) {

  //ask if they would like to fight or skip using   fightOrSkip()
      if (fightOrSkip()) {
      //if true, leave fight, breakloop
      break;
      }

    
     // generate random damage value based on player's attack power
     var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

     //remove enemy's health based on random playerAttack value
     enemy.health = Math.max(0, enemy.health - damage);
     console.log(
       playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
     );

      // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }
    //player gets attacked first
  } else {
      //If it is not the player-robot's turn:
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

       //Remove damage from the player-robot's health
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    //switch turns for next round
    isPlayersTurn = !isPlayersTurn;
  }
};
