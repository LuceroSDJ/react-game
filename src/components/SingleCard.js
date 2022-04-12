import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    // this function updates state in the app component
    //by triggering handleChoice defined in parent component
    const handleClick = () => { 
        if(!disabled) {
            //pass the parameter in this child component up to its parent
            handleChoice(card);
        }    
    }


    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
              <img className='front' src={card.src} alt='card front' />
              <img 
                className='back' 
                src='/img/cover90s.jpeg' 
                onClick={handleClick}
                alt='card back' 
            />
            </div>
        </div>
    )
}
