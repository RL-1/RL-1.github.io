import logo from './logo.svg';
import './App.css';
import { MobileDebitCard } from "./components/ModalDebitCard/MobileDebitCard";
import { ButtonRecroll } from "./components/ButtonRecroll/ButtonRecroll";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const App = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);
    const history = useNavigate();
  const handleOpenRecroll = (index) => {
      setSelectedButtons((prevSelected) => [...prevSelected, index])
      history('youtube');
  }
  return (
      <div className="App">
        <div className={'container'}>
          {[...Array(300)].map((_, index) => {

              if(index === 128){
                  return <MobileDebitCard />
              }
              return <div onClick={() => setSelectedButtons((prevSelected) => [...prevSelected, index])} key={index}>
                  <ButtonRecroll activeButton={selectedButtons.includes(index)} index={index} />
              </div>
          })}
        </div>
      </div>
  );
};

