import React from 'react'

const ModalPage = ({handleModal,setOfferAccepted}) => {
  const acceptOffer = () => {
    setOfferAccepted(true)
    handleModal()
  }
  const handleModalStatus = (e) => {
    e.preventDefault();
  }
  return (
    <div className='modal-background' onClick={()=>handleModal()}>
        <div className='modal-content'>
                <button className='btn-accept' onClick={(e)=>handleModalStatus(e)} type="button">X</button>
                <div>
                    <h2>Click the button below to accept our amazing offer!</h2>
                </div>
            <button onClick={()=>acceptOffer()} className='btn-accept'>Accept Offer</button>
        </div>

    </div>

  )
}

export default ModalPage