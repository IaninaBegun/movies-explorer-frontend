import React from 'react';

import './PopupErrors.css';

function PopupErrors ({ isOpen, openPopup, onClose,  onError}) {

  function handleOverlayClose(e) {
    if (isOpen && (e.currentTarget === e.target)) {
      onClose(e.target);
    }
  }

  React.useEffect(()=> {

    const handleCloseByEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleCloseByEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc)
    }

  }, [onClose, isOpen]);

  return(
    <>
      <div className={ isOpen ? `popup popup_opened` : `popup` } onClick={handleOverlayClose} >
        <button className="popup__btn-close" type="button"  onClick={onClose}></button>
        <div className="popup__infoBoard">
          <h1 className="popup__registerText">{ isOpen ? `${onError}` : `Что-то пошло не так! Попробуйте ещё раз.`}</h1>
        </div>
      </div>
    </>
  );
};

export default PopupErrors;
