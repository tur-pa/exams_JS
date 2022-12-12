//11 = J | 12 = Q | 13 = K | 1 = A
const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];
//H = Hearts | D = Diamonds | S = Spades | C = Clubs
const suits = ["H", "D", "S", "C"];

//BUILDS A SET OF CARDS
function cardsBuilder() {
  const cards = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      const value = values[j];
      const suit = suits[i];
      cards.push({ value, suit });
    }
  }
  return cards;
}

//BUILDS 5 RANDOM CARDS FROM SET OF CARDS
function randomCards(cards) {
  const cardsDeck = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    cardsDeck.push(...cards.splice(randomIndex, 1));
  }
  return cardsDeck;
}

function sortCards(cardsHand) {
  let sortedCardsBySuit = [];
  let sameColor;
  //SORT CARDS AND CHECKING FULL COLOR
  sortedCardsBySuit = cardsHand.sort((currCardA, currCardB) => {
    if (currCardA.suit > currCardB.suit) {
      return 1;
    }
    if (currCardA.suit < currCardB.suit) {
      return -1;
    }
    return 0;
  });
  sortedCardsBySuit[0].suit === sortedCardsBySuit[4].suit
    ? (sameColor = true)
    : (sameColor = false);

  //SORT VALUES
  let sortedCardsByValue = [];
  sortedCardsByValue = cardsHand.sort(
    (currCardA, currCardB) => currCardA.value - currCardB.value
  );

  //SUM DUPLICATES
  let duplicatedCards = cardsHand.reduce((accu, currCard) => {
    accu[currCard.value] = accu[currCard.value] + 1 || 1;
    return accu;
  }, {});
  console.log(duplicatedCards);

  //CHECK HOW MANY DUPLICATED CARDS HAVE HAND
  let duplicatedNum;
  duplicatedNum = Object.values(duplicatedCards).reduce(
    (accu, currDuplication) => {
      accu[currDuplication] = accu[currDuplication] + 1 || 1;
      return accu;
    },
    {}
  );

  //CHECK REPEAT
  let noRepeat = Object.values(duplicatedCards).every((curr) => curr === 1);

  //CHECK IF NUMBERS ARE IN ORDER
  let numberInOrder;
  noRepeat &&
  (+sortedCardsByValue[0].value + 4 === +sortedCardsByValue[4].value ||
    +sortedCardsByValue[0].value + 12 === +sortedCardsByValue[4].value)
    ? (numberInOrder = true)
    : (numberInOrder = false);

  let convertedCards = cardsHand.map((obj) => ({ ...obj }));
  convertedCards.forEach((element) => {
    if (+element.value === 1) element.value = `A`;
    if (+element.value === 11) element.value = `J`;
    if (+element.value === 12) element.value = `Q`;
    if (+element.value === 13) element.value = `K`;
  });

  return {
    convertedCards,
    sortedCardsByValue,
    sameColor,
    duplicatedCards,
    duplicatedNum,
    numberInOrder,
  };
}

function setChecker(sortedCards) {
  console.log(`Test: `);
  console.log(sortedCards.sortedCardsByValue);
  console.log(`Yours cards: `);
  console.log(sortedCards.convertedCards);
  if (
    sortedCards.sameColor &&
    +sortedCards.sortedCardsByValue[0].value + 12 ===
      +sortedCards.sortedCardsByValue[4].value &&
    sortedCards.numberInOrder
  ) {
    return console.log(`You have royal flush.`);
  } else if (sortedCards.sameColor && sortedCards.numberInOrder) {
    return console.log(`You have straight flush.`);
  } else if (Object.keys(sortedCards.duplicatedNum).includes("4"))
    return console.log(`You have four of kind.`);
  else if (
    Object.keys(sortedCards.duplicatedNum).includes("3") &&
    Object.keys(sortedCards.duplicatedNum).includes("2")
  )
    return console.log(`You have full.`);
  else if (sortedCards.sameColor === true)
    return console.log(`You have flush.`);
  else if (sortedCards.numberInOrder && sortedCards.sameColor === false) {
    return console.log(`You have straight.`);
  } else if (Object.keys(sortedCards.duplicatedNum).includes("3"))
    return console.log(`You have three of kind.`);
  else if (Object.values(sortedCards.duplicatedNum).includes(2))
    return console.log(`You have two pair.`);
  else if (Object.keys(sortedCards.duplicatedNum).includes("2"))
    return console.log(`You have pair.`);
  else {
    console.log(`You have high card with: `);
    console.log(sortedCards.convertedCards[4]);
  }
}

// BUILD COLLECTION OF CARDS
let cards = cardsBuilder();
// TAKE 5 CARDS TO HAND
let cardsHand = randomCards(cards);

// TEST //
// console.log(cardsHand);
// cardsHand = [
//   { value: "8", suit: "C" },
//   { value: "7", suit: "H" },
//   { value: "1", suit: "H" },
//   { value: "2", suit: "H" },
//   { value: "10", suit: "H" },
// ];
// TEST END //

// CREATE OBJECTS WITH PARAMS
let sortedCards = sortCards(cardsHand);

// CHECK HAND
setChecker(sortedCards);
