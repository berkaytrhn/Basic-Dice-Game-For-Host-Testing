
let animationFrame;

let firstTranslation=0;
let secondTranslation=0;

let imageCounter=0;
let changeCounter=0;

let rightOrLeft=true; //true for right,false for left


let firstDice;
let secondDice;
let firstTrophy;
let secondTrophy;
let header;

let isClicked=false;

let timeOuts;

const main = () => {

    //finding dices
    firstDice = document.querySelector("#dice_1");
    secondDice = document.querySelector("#dice_2");


    //get first trophy element to change it
    firstTrophy = document.querySelector("#first-trophy");
    firstTrophy.setAttribute("src","./images/header_dice.png");

    //get second trophy element to change it 
    secondTrophy = document.querySelector("#second-trophy");
    secondTrophy.setAttribute("src","./images/header_dice.png");

    //get header to change it during game
    header = document.getElementsByTagName("h1")[0];
    header.innerText="Welcome To Dice Game"
    header.parentElement.style.textAlign="center";


    timeOuts = [];

    //event listener
    document.querySelector("#roll-dice").addEventListener("click",()=>{
        if(!isClicked){
            animationFrame = requestAnimationFrame(animation);
            controlRandomnessAndClearOut(animationFrame);
            isClicked=true;
            imageSleep();
            shakingSleep();
        }
    });
};


const controlRandomnessAndClearOut = (anmationFrame)=>{
    setTimeout(()=>{
        cancelAnimationFrame(animationFrame);
        
        //reset position
        firstTranslation=0;
        secondTranslation=0;
        firstDice.style.transform=`translateX(${firstTranslation}px)`;
        secondDice.style.transform=`translateX(${secondTranslation}px)`;

        //reset controllers
        rightOrLeft=true;
        isClicked=false;

        //reset counters
        imageCounter=0;
        changeCounter=0;

        //clear timeOuts
        for(let i=0;i<timeOuts.length;i++){
            clearTimeout(timeOuts[i]);
        }

        //satisfy randomness
        let firstRandom;
        let secondRandom;
        while(firstRandom===secondRandom){
            firstRandom= Math.floor(Math.random()*6)+1;
            secondRandom= Math.floor(Math.random()*6)+1;
        }
        firstDice.setAttribute("src",`./images/dice_${firstRandom}.png`);
        secondDice.setAttribute("src",`./images/dice_${secondRandom}.png`);

        //declare winning side
        if(firstRandom>secondRandom){
            header.innerText="You Win The Dice Game!";
        }else{
            header.innerText="I Win The Dice Game :))";
        }

        //update header logos
        firstTrophy.setAttribute("src","./images/trophy.png");
        secondTrophy.setAttribute("src","./images/trophy.png");
    },1550);
};

const imageSleep= ()=>{
    imageCounter++;
    timeOuts.push(setTimeout(imageSleep,100));
};

const shakingSleep = ()=>{
    rightOrLeft=!rightOrLeft;
    timeOuts.push(setTimeout(shakingSleep,200));
};

const firstDiceMove = (dice,speed)=>{
    if(rightOrLeft){
        dice.style.transform=`translateX(${firstTranslation+speed}px)`;
        firstTranslation+=speed;
    }else{
        dice.style.transform=`translateX(${firstTranslation-speed}px)`;
        firstTranslation-=speed;
    }
};

const secondDiceMove = (dice,speed)=>{
    if(!rightOrLeft){
        dice.style.transform=`translateX(${secondTranslation+speed}px)`;
        secondTranslation+=speed;
    }else{
        dice.style.transform=`translateX(${secondTranslation-speed}px)`;
        secondTranslation-=speed;
    }
};



const animation = (now) => {


    let speed = 1.5;

    //for first dice, rotate and translate
    firstDice.setAttribute("src",`./images/dice_${(imageCounter%6)+1}.png`);


    //for second dice, rotate and translate
    secondDice.setAttribute("src",`./images/dice_${(imageCounter%6)+1}.png`);
    

    firstDiceMove(firstDice,speed);
    secondDiceMove(secondDice,speed);
    

    

    animationFrame = requestAnimationFrame(animation);
};




main();