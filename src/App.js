import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import './App.css'

//array created outside of the component bc it's a constant. It won't change.
//this way the cards array won't be re-created every time the component gets re-evaluated
const cardImages = [
  {'src': process.env.PUBLIC_URL + '/img/brickPhone.png', matched: false},
  {'src': process.env.PUBLIC_URL + '/img/caset.png', matched: false},
  {'src': process.env.PUBLIC_URL + '/img/floppyDisk.png', matched: false},
  {'src': process.env.PUBLIC_URL + '/img/gamePlayer.png', matched: false},
  {'src': process.env.PUBLIC_URL + '/img/tamagotchi.png', matched: false},
  {'src': process.env.PUBLIC_URL + '/img/videoGamePlayer.png', matched: false}

]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  //choiceOne/Two will be used to compare them
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);



  //shuffle card:
  //duplicate each card
  //randomize the order of the cards using the sort()
  //apply random id to each card
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      //if we return a # < 0, the order of the 2 items stays the same, else if # > 0, items' order is swaped 
      .sort(() => Math.random() - 0.5)
      //next, we want to fire a function for each item inside the new sorted array to add an id
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }


  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        console.log('yes match');

        //keep track of which cards have been matched
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        console.log('no match');
        setTimeout(() => resetTurn(), 1000)      
      }
    }
    // return () => {
    //   cleanup
    // }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //automatically start the game right after the 1st render 
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            // there are 3 scenarios in which a card should be flipped 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;