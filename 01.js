let ballsArray = [1, 1, 1, 2, 1, 1, 1, 1];
ballsArray = { ...ballsArray };
let checkLottery = [];

//ARRAY [[INDEX]: [VALUE]] => CHANGE TO SAVE INDEXES
ballsArray = Object.entries(ballsArray);

function lotteryIndex(ballsArray) {
  let randomIndex = Math.floor(Math.random() * ballsArray.length);
  return randomIndex;
}

function weightScale(leftScale, rightScale, restScale) {
  let leftWeight = 0;
  let rightWeight = 0;

  //CHECK SCALES
  console.log(...leftScale);
  console.log(...rightScale);
  console.log(...restScale);

  leftWeight = leftScale
    .flat()
    .filter((el) => typeof el === `number`)
    .reduce((acc, el) => acc + el, 0);
  rightWeight = rightScale
    .flat()
    .filter((el) => typeof el === `number`)
    .reduce((acc, el) => acc + el, 0);

  //CHECK WEIGHTS
  console.log(`Left weight is ${leftWeight}`);
  console.log(`Right weight is ${rightWeight}`);

  if (leftWeight > rightWeight) {
    console.log(`The winner is leftWeight \n`);
    ballsArray = leftScale;
    if (ballsArray.length === 1) return ballsArray;
    return findIndex(ballsArray);
  } else if (leftWeight < rightWeight) {
    console.log(`The winner is rightWeight \n`);
    ballsArray = rightScale;
    if (ballsArray.length === 1) return ballsArray;
    return findIndex(ballsArray);
  } else {
    console.log(`The winner is restWeight \n`);
    ballsArray = restScale;
    if (ballsArray.length === 1) return ballsArray;
    return findIndex(ballsArray);
  }
}

function findIndex(ballsArray) {
  let leftScale = [];
  let rightScale = [];
  let restScale = [];

  while (ballsArray.length !== 0) {
    leftScale.push(...ballsArray.splice(lotteryIndex(ballsArray), 1));
    rightScale.push(...ballsArray.splice(lotteryIndex(ballsArray), 1));
    restScale.push(...ballsArray.splice(lotteryIndex(ballsArray), 1));
  }
  return weightScale(leftScale, rightScale, restScale);
}
let winnerArray = findIndex(ballsArray);
console.log(`\n` + `Winner index is ${winnerArray[0][0]}`);
console.log(``);
