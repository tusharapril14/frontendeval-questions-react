import { useState } from 'react';
import './App.css';
import ModalPage from './ModalOverview/ModalPage';

function App() {
  const [showModal,setShowModal] = useState(false);
  const [offerAccepted,setOfferAccepted] = useState(false);

  function handleModal(){
      setShowModal(prev=>!prev)
  }
  return (
    <div className="App">{
      offerAccepted && 
       (<h1>
          Offer Accepted!
        </h1>)
      
    }
      {!offerAccepted &&
        <div>
          {
            showModal ? <ModalPage setOfferAccepted={setOfferAccepted} handleModal={handleModal} /> : 
            <button className='btn-accept' onClick={handleModal}>Show Offer</button>
          }
      </div>
       }
     
    </div>
  );
}

export default App;
