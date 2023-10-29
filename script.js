const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

var player = false;
var gameOver = false;
var playerX = 0;
var playerO = 0;
var pXScore = document.getElementById("playerXscore");
var pOScore = document.getElementById("playerOscore");
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var box4 = document.getElementById("box4");
var box5 = document.getElementById("box5");
var box6 = document.getElementById("box6");
var box7 = document.getElementById("box7");
var box8 = document.getElementById("box8");
var box9 = document.getElementById("box9");
var blurr = document.getElementById("blur");
var body = document.getElementById("body");
var winnerText = document.getElementById("winnerText");

function showPopup(winner)
{
    blurr.classList.remove("hidden");
    body.classList.add("stop-scrolling");
    winnerText.innerHTML="The winner is " + winner;
}

const closePopup = async () => {
    blurr.classList.add("hidden");
    body.classList.remove("stop-scrolling");
    await sleep(3000);
    clearBoard();
}

function showResult()
{
    pXScore.innerHTML=playerX;
    pOScore.innerHTML=playerO;
}

function clearBoard()
{
   box1.innerHTML="";
   box2.innerHTML="";
   box3.innerHTML="";
   box4.innerHTML="";
   box5.innerHTML="";
   box6.innerHTML="";
   box7.innerHTML="";
   box8.innerHTML="";
   box9.innerHTML="";
   box1.classList.remove("green", "pink");
   box2.classList.remove("green", "pink");
   box3.classList.remove("green", "pink");
   box4.classList.remove("green", "pink");
   box5.classList.remove("green", "pink");
   box6.classList.remove("green", "pink");
   box7.classList.remove("green", "pink");
   box8.classList.remove("green", "pink");
   box9.classList.remove("green", "pink");
   gameOver=false;
}

function reset()
{
    player = false;
    gameOver = false;
    playerX = 0;
    playerO = 0;
    showResult();
    clearBoard();
}

function checkScore()
{
    if(box1.innerHTML===box2.innerHTML && box1.innerHTML===box3.innerHTML && box1.innerHTML.trim()!="" && box2.innerHTML.trim()!="" && box3.innerHTML.trim()!="")
    {
        showPopup(box1.textContent)
        gameOver=true;
        if(box1.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box4.innerHTML===box5.innerHTML && box4.innerHTML===box6.innerHTML && box4.innerHTML.trim()!="" && box5.innerHTML.trim()!="" && box6.innerHTML.trim()!="")
    {
        showPopup(box4.textContent)
        gameOver=true;
        if(box4.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box7.innerHTML===box8.innerHTML && box7.innerHTML===box9.innerHTML && box7.innerHTML.trim()!="" && box8.innerHTML.trim()!="" && box9.innerHTML.trim()!="")
    {
        showPopup(box7.textContent)
        gameOver=true;
        if(box7.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box1.innerHTML===box4.innerHTML && box1.innerHTML===box7.innerHTML && box1.innerHTML.trim()!="" && box4.innerHTML.trim()!="" && box7.innerHTML.trim()!="")
    {
        showPopup(box1.textContent)
        gameOver=true;
        if(box1.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box2.innerHTML===box5.innerHTML && box2.innerHTML===box8.innerHTML && box2.innerHTML.trim()!="" && box5.innerHTML.trim()!="" && box8.innerHTML.trim()!="")
    {
        showPopup(box2.textContent)
        gameOver=true;
        if(box2.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box3.innerHTML===box6.innerHTML && box3.innerHTML===box9.innerHTML && box3.innerHTML.trim()!="" && box6.innerHTML.trim()!="" && box9.innerHTML.trim()!="")
    {
        showPopup(box3.textContent)
        gameOver=true;
        if(box3.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box1.innerHTML===box5.innerHTML && box1.innerHTML===box9.innerHTML && box1.innerHTML.trim()!="" && box5.innerHTML.trim()!="" && box9.innerHTML.trim()!="")
    {
        showPopup(box1.textContent)
        gameOver=true;
        if(box1.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    else if(box3.innerHTML===box5.innerHTML && box3.innerHTML===box7.innerHTML && box3.innerHTML.trim()!="" && box5.innerHTML.trim()!="" && box7.innerHTML.trim()!="")
    {
        showPopup(box3.textContent)
        gameOver=true;
        if(box3.textContent==="X")
        {
            playerX++;
        }

        else
        {
            playerO++;
        }
    }

    showResult();
}

function setSymbol(element)
{
    if(player===true)
    {
        element.innerHTML="<h1>X</h1>";
        element.classList.add("green");
    }
    
    else
    {
        element.innerHTML="<h1>O</h1>";
        element.classList.add("pink");
    }
    checkScore();
}

$(".key").click(function () {
    var elementId = $(this).attr('id');
    var element = document.getElementById(elementId);
    if(!gameOver)
    {
        if(element.innerHTML.trim()=="")
        {
            if(player===false)
            {
                player=true;
            }
            else
            {
                player=false;
            }
        setSymbol(element);
        }
    }   
});

