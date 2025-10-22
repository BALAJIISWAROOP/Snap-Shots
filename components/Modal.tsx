import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-zinc-900 rounded-lg shadow-2xl shadow-cyan-900/30 w-full max-w-3xl border border-zinc-800 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 md:p-8 pt-0 pb-8 md:pb-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;