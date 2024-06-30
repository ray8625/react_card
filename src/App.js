import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import drink_card from "../src/assets/drink.jpg";
import kaohsiung_card from "../src/assets/k.jpg";
import list_card from "../src/assets/list.jpg";
import order_card from "../src/assets/order.jpg";
import setting_card from "../src/assets/setting.jpg";
import web_card from "../src/assets/web.jpg";
import "./App.css";

const cardArray = [
  { src: drink_card, matched: false, isFlipped: false },
  { src: kaohsiung_card, matched: false, isFlipped: false },
  { src: list_card, matched: false, isFlipped: false },
  { src: order_card, matched: false, isFlipped: false },
  { src: setting_card, matched: false, isFlipped: false },
  { src: web_card, matched: false, isFlipped: true },
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice,setFirstChoice] = useState(null);
  const [secondChoice,setSecondChoice] = useState(null);
  const [disable,setDisable] = useState(false); //無法連續點擊
  const [clickRe,setClickRe] = useState(0);

  const handleClick = (card) => {
    firstChoice? setSecondChoice(card) : setFirstChoice(card)
  }

  useEffect(()=>{
    if(firstChoice && secondChoice){
      console.log(firstChoice)
      console.log(secondChoice)
      setDisable(true);

      // 若卡片相同
      if(firstChoice.src === secondChoice.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === firstChoice.src){
              return {...card,matched: true}
            }
            return card;
          })
        })
        setFirstChoice(null);
        setSecondChoice(null);
        setDisable(false);
        console.log(clickRe)

      }else{
        setTimeout(()=>{
          setFirstChoice(null);
          setSecondChoice(null);
          setDisable(false);
          setClickRe(0);
        },1000)
      }
    }
  },[firstChoice,secondChoice])


  // 洗牌
  const shuffleCards = () => {
    const shuffledCards = [...cardArray, ...cardArray]
    .sort(() => Math.random() - 0.5)
    .map(card=>({...card,id: Math.random()}));

    setCards(shuffledCards);
    setFirstChoice(null);
    setSecondChoice(null);
  };

  useEffect(()=>{
    shuffleCards();
  },[])

  /* 按鈕判斷 */
  const onClick = (card) => {
    if(!disable){
      setClickRe(card.id);
      // console.log(card.id);
      // console.log(clickRe);
      if(clickRe!==card.id){
        handleClick(card);
      }
    }
  }

  return (
    <div>
      <div className="heading">紙牌小遊戲</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={()=>{shuffleCards()}}>NEW GAME</Button>
      </div>
      <div className="container">
        {cards.map(card=>(
          <div className={`card ${card.matched || card===firstChoice || card===secondChoice?"flipped":""}`} key={card.id} onClick={()=>{onClick(card)}}>
            <img className="front" src={card.src} width={300}/>
            <div className="rear" style={{ width: "300px" , height: "228px", backgroundColor: "red"}}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
