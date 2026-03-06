import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children, isOpen, onClose }: ModalProps) {
useEffect(() => {
  if (!isOpen) return;
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  document.addEventListener('keydown', handleEscape);
  document.body.style.overflow = 'hidden'; 

  return () => {
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = 'unset'; 
  };
}, [isOpen, onClose]);
  if (!isOpen) return null;
  if (!modalRoot) {
    console.error('если не заработает modal, я появлюсь');
    return null;
  }
  if (!children) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}