window.addEventListener('load', start)

function start(){
    rulesModal()
    play()
}

function rulesModal(){
    const openModal = document.querySelector('.rules-btn');
    const closeModal = document.querySelector('.close-modal')
    const modal = document.querySelector('.modal');
    
    closeModal.addEventListener('click', rulesToggle)
    openModal.addEventListener('click', rulesToggle)
    
    function rulesToggle(){
        return modal.classList.toggle('active')
    }
}

function play(){
    const container = document.querySelector('.start-container');
    const buttons = document.querySelectorAll('.btn-game');
    const count = document.querySelector('.points-count');
    const resultText = document.querySelector('.result-text');
    let score = 0;
    let resulted = new Object()

    buttons.forEach((btn)=> btn.addEventListener('click', startGame))
    
    function startGame(event){
        let selected = Number(event.target.id);
        let random = generateRandom(0,4)
        while(random == selected){
            random = generateRandom(0,4)
        }
        function generateRandom(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        resulted = {
            selected: selected,
            random: random
        }
        function playAgain(event){
            const btnPlay = document.querySelector('.play-again')
            btnPlay.addEventListener('click', ()=>{
                resultText.classList.remove('showResult')
                buttons.forEach((btn)=> {
                    btn.classList.remove('active')
                    btn.classList.remove('house-pick')
                    btn.style.gridArea = '';
                    btn.style.boxShadow = "0 0 0 0"
                })
                container.classList.remove('active')
            })
        }
        playAgain(event)
        checkResult(event ,resulted)
        render(event)
    }

    function render(event){
        buttons.forEach((btn,i)=>{
            if(i == resulted.random){
                btn.classList.add('house-pick')
                btn.style.gridArea = 'house';
            }
            if(win == true){
                event.target.style.boxShadow = "0px 0px 0px 31px rgba(255, 255, 255, 0.123),  0px 0px 0px 50px rgba(255, 255, 255, 0.151), 0px 0px 0px 70px rgba(255, 255, 255, 0.034)"
            }
        })
        container.classList.add('active')
        event.target.classList.add('active');
    }
    function checkResult(event,resulted){
        function scoreCount(){
            score++;
            return count.innerHTML = score;
        }
        function winner(){
            setTimeout(()=>{
                resultText.classList.add('showResult')
                resultText.children[0].innerHTML = "you win"
            }, 600)
            scoreCount();
            return win = true;
        }
        function loose(){
            buttons.forEach((btn,i)=>{
                if(i == resulted.random){
                    btn.style.boxShadow = "0px 0px 0px 31px rgba(255, 255, 255, 0.123),  0px 0px 0px 50px rgba(255, 255, 255, 0.151), 0px 0px 0px 70px rgba(255, 255, 255, 0.034)"
                    setTimeout(()=>{
                        resultText.classList.add('showResult')
                        resultText.children[0].innerHTML = "you lost"
                    }, 600)
                }
                
            })
            return win = false;
        }
        if(resulted.selected == 0){
            switch(resulted.random){
                case 2:
                    winner()
                    break;
                case 3:
                    winner()
                    break;
                default:
                    loose()
            }
        }
        if(resulted.selected == 1){
            switch(resulted.random){
                case 0:
                    winner()
                    break;
                case 4:
                    winner()
                    break;
                default:
                    loose()
            }
        }
        if(resulted.selected == 2){
            switch(resulted.random){
                case 3:
                    winner()
                    break;
                case 1:
                    winner()
                    break;
                default:
                    loose()
            }
        }
        if(resulted.selected == 3){
            switch(resulted.random){
                case 2:
                    winner()
                    break;
                case 1:
                    winner()
                    break;
                default:
                    loose()
            }
        }
        if(resulted.selected == 4){
            switch(resulted.random){
                case 0:
                    winner()
                    break;
                case 3:
                    winner()
                    break;
                default:
                    loose()
            }
        }
        return win;
    }
}
