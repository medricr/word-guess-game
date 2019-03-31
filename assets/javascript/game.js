/*
-------------------------
hangman game description
-------------------------

this game will operate by comparing a target string (the word to be guessed) with a 
mirror string (the collection of user guessed letters)

after a players guess, if it is a correct guess the code will compare the mirror string with the target string

    if they match, the game is over, and the player has won
    if not, and the player has still guessed correctly, this round does not count for them, and play begins again
    if neither one of the previous conditions are true, then the player gets a strike agains them
    if the player has hit their sixth strike, the game is over, and the player is lost
    
the player will then recieve a prompt to play again, if they choose this option, another word will 
be pulled from the array of possible solutions, and play will resume

------------------------
hangman game pesudocode
------------------------

initialize array of potential words
randomly select a target word and store it in an array called TARGET
initialize array named MIRROR of underscores (_) which has equal length to the target word

display a number of blank spaces equal to the number of letters in the target word

propmt user input
    if the letter the user selected is in the word
        fill ALL instances of that letter on the screen
        populate a mirror string with the correct letter guesses and display
        if mirror == target
            the player wins
        else
            gameplay continues
    else
        increase the fail counter
    if fail counter <= 6
        display failure screen
*/


// BEGINNING OF HANGMAN SCRIPT
$(document).ready(function() {

// HANGMAN GAME VAR DECLARATIONS

 // player STRIKE counter
 var player_strikes=0;

 var correct_guess=false;

 var player_win=false;

 var guesses_left = 6;

 var player_wins = 0;

 var player_losses = 0;

 var guesses = [];

 lbl: start:
    var word_bank=["federation","starship","replicator","phaser","warp","shuttle"];
    // choose word from word bank and assign it to the TARGET variable
    var target=word_bank[Math.floor(Math.random() * word_bank.length)];

    // create MIRROR array
    var mirror=[];
    // populate MIRROR with blank spaces
    for(i=0; i<target.length; i++) {
        mirror.push("_");
    }
   

/* HANGMAN GAME LOGIC */
var str = mirror.join(' ');
$("#mirror_display").text(str);
$("#guesses-left").text(guesses_left)
        // when the user presses a key
        document.onkeyup=function(event) {
        // reset their guess status to 'false'
        correct_guess=false;
        // store their guess in the 'user_choice' variable
        var user_choice=event.key;
        
        // check if the letter guessed is in the TARGET word
        for(i=0; i<target.length; i++) {
            // if so
            if(user_choice == target[i]) {
                // switch out the appropriate letters in 'MIRROR
                mirror[i] = user_choice;
                correct_guess=true;
                if(mirror.join("") == target) {
                        // alert("you win");
                        player_win=true;
                }
            }
        }
        // if the user guessed incorrectly
        if(!correct_guess){
            // increase player strikes on incorrect guess
            player_strikes++;
            guesses_left -=1;
            $("#guesses-left").text(guesses_left)
        }

        if(player_strikes == 6) {
            // if the user has 6 strikes, they lose
            player_losses +=1;
            $("#loss-tracker").text(player_losses);
            $("#win-or-lose").text("u lose :((((")
        }

        guesses.push(event.key);
        $("#letters-guessed").text(guesses);


        
        $("#target_display").text(target);
        var str = mirror.join(' ');
        $("#mirror_display").text(str);

        if(player_win) {
            $("#win-or-lose").text("you win!");
            player_wins +=1;
            $("#win-tracker").text(player_wins);
        }

        

        }
$(".reset").on("click",function () {
    continue start;

})
    
})