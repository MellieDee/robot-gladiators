/* GAME FUNCTIONS */

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//to confirm fight or skip response
var fightOrSkip = function() {
  //askplayer if they'd like to fight using the fightOrSkip() function
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose");

 //Conditional recursive Function Call //
 //if promptFight is not a valid value, then execute the following statements
 if (promptFight === "" || promptFight === null) {
   window.alert("You need to provide a valid answer. Try again!");
   return fightOrSkip();
 }

  //if player picks "skip" confirm and then stop the loo
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {

    //confirm player wants to skip
    var confirmSkip =  window.confirm("Are you sure you'd like to quit?");

    //if yes (true) leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      //subtract money from playerMoney for skipping, but dont let it get negative
      playerInfo.money =  Math.max(0, playerInfo.money) - 10;
   
    //return true if player wants to leave
    return true;
    }
  }
  return false;
};

//FIGHT FUNTION
//(now with randomized turns)
var fight = function(enemy) {
  
  //keep track of who is first
  var isPlayersTurn =  true;

  if (Math.random() >0.5) { 
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

//RESTART GAME AND RESET STATS
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    //check player stats
    console.log(playerInfo);

    // if player is still alive, keep fight next enemy
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyInfo array
      var pickedEnemyObj = enemyInfo[i];

      // set health for picked enemy
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  //check local storage for hight score; if it is not there use 0

  var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highScore = 0
    }

  // if player has more money than high score, player has new highest score
     if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playInfo.name);

      alert(playerInfo.name + " now has the high score of " + playerInfo.money + " !");

       } else {
        window.alert("Sorry," + playerInfo.name+ "you didn't beat the high score of "  + highScore + " . Maybe next time.");
       }
     
      // ask player if they'd like to play again
      var playAgainConfirm = window.confirm('Would you like to play again?');

      if (playAgainConfirm) {
         startGame();
      } else {
       window.alert('Thank you for playing Robot Gladiators! Come back soon!');
     }
    };


// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
  );

  // use switch case to carry out action
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// function to set name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};
/* END GAME FUNCTIONS */




/* GAME INFORMATION / VARIABLES */

// player information

//player information
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
};

// enemy information
var enemyInfo = [
  {
    name: 'Roborto',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Robo Trumble',
    attack: randomNumber(10, 14)
  }
]; 

/* END GAME INFORMATION / VARIABLES */

/* RUN GAME */
startGame();
