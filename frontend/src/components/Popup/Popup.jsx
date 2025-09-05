import style from './Popup.module.css'

function Popup( { children, onClose } ) {

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={style.container} onClick={handleClose}>
      <div className={style.containerBlock}>
        {children}
      </div>
    </div>
  )
}

export default Popup