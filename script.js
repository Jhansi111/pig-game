var buttons=document.querySelectorAll("button");
var divSelect= document.querySelectorAll(".panel");
var image= document.querySelector(".dice");
var playScore=document.getElementById("playTo");
var input= document.querySelector("input");
var activeplayer,score,current,gamePlaying; 
init();
var winScore=10;

//INPUT selection
input.addEventListener("change", function(){
	playScore.textContent= this.value;	
    winScore=Number(this.value);
});
//ROLL DICE Button
buttons[1].addEventListener("click", function(){
    if(gamePlaying){
    	var pCurrent=  document.querySelector("#current-"+activePlayer);    
	    image.style.display="block";

	    //Generating random number
	    var randomNumber= Math.floor(Math.random()*6 + 1);

	    //Displaying result
	    var beforeLink="https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/4-DOM-pig-game/starter/dice-";
	    var afterLink= ".png?raw=true";  
	    var imageSrc=beforeLink +randomNumber+ afterLink;      
	      image.setAttribute("src",imageSrc);

	      //update the current score if the rolled number is not 1
	      if(randomNumber!==1){
	      	//Add score
	      current += randomNumber;    
	      pCurrent.textContent= current;      
	    } else {  
	    	//Next player
	       nextPlayer();	
	    }   
    }
	  
   
    
});

//HOLD Button
 buttons[2].addEventListener("click",  function(){
 	var pScore=document.querySelector("#score-"+activePlayer);
	    var pPanel=document.querySelector('.player-'+activePlayer+'-panel');
    if(gamePlaying){

	    //Add CURRENT score to GLOBAL score
	    score[activePlayer] += current; 

	    //update the UI  
	    pScore.textContent=score[activePlayer];
	}   
     
    //check if player won the game     
    if(pScore.textContent >= winScore){    	
      	document.getElementById("name-"+activePlayer).textContent ="WINNER!";
        image.style.display="none";
        pPanel.classList.add('winner');
        pPanel.classList.remove('active');        
        gamePlaying=false;
      }else{      
      //Next player	
      	nextPlayer();
      }
     
});

 //selecting Next player
  function nextPlayer(){
  	var pCurrent=  document.querySelector("#current-"+activePlayer);
  	current=0;    
    pCurrent.textContent="0";
    divSelect[activePlayer].classList.remove("active");
    activePlayer===0? activePlayer =1:activePlayer=0; 
    divSelect[activePlayer].classList.add("active");
    image.style.display="none";
  }

 //NEW GAME Button(here i= activeplayer)
buttons[0].addEventListener("click",  init);

//initial init function

function init(){
	gamePlaying=true;
	current=0;
	score=[0,0];
	activePlayer=0;
	input.value=0;
	playScore.textContent="0";	
	image.style.display="none";
	divSelect[0].classList.add("active");
	for(var i=0;i<=1;i++){		
		divSelect[i].classList.remove('winner');
		document.getElementById("name-"+i).textContent ="Player "+(i+1);
		var pCurrent=  document.querySelector("#current-"+i);
	    var pScore=document.querySelector("#score-"+i);	    
	    pCurrent.textContent="0"; 	
	    pScore.textContent="0"; 
	}
}

 
	
