import { useEffect } from 'react'
import Modal from 'react-modal'

const customStyles: any = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#070e27b3',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
  },
}

export const CustomModal = ({ isOpen, onAfterOpen, onRequestClose, children }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.height = '100vh'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
    } else {
      document.body.style.height = 'unset'
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  )
}
