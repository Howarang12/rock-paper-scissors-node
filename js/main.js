// document.querySelector('#clickMe').addEventListener('click', makeReq)
let winner = document.querySelector('#winner')
let choices = document.querySelector('#choices')
let botImg = document.querySelector('#botImg')
choices.addEventListener('click' , makeReq)

async function makeReq(e){
  const res = await fetch(`/api`)
  const data = await res.json()
  console.log(data);

  const userChoice = e.target.id;
  const botChoice = data.bot


  displayBot(botChoice)
  playGame(userChoice, botChoice)
    
}

function playGame(user, bot){
   if(user === 'rock' && bot === 'scissors' ||
    user === 'paper' && bot === 'rock' ||
    user === 'scissors' && bot === 'paper') {
      winner.innerText = `You chose ${user} and the bot chose ${bot}. You win!!!`
    
    } 
    else if (bot === 'rock' && user === 'scissors' ||
    bot === 'paper' && user === 'rock' ||
    bot === 'scissors' && user === 'paper'){
      winner.innerText = `You chose ${user} and the bot chose ${bot}. You lose...`
    } 
    else if (user === bot){
      winner.innerText = `You chose ${user} and the bot chose ${bot}. It's a tie... `
    }
}

function displayBot(choice){
  if(choice === 'rock'){
    botImg.src = 'img/rock.png'
  }
  else if(choice === 'paper'){
    botImg.src = 'img/paper.png'
  } 
  else if (choice === 'scissors'){
    botImg.src = 'img/scissors.png'
  }
}