import { useReducer } from 'react';

interface ModalState {
  isOpen: boolean;
}

type ModalAction = 
  | { type: 'OPEN' }
  | { type: 'CLOSE' };

const initialState: ModalState = { isOpen: false };

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN':
      return { isOpen: true };
    case 'CLOSE':
      return { isOpen: false };
    default:
      return state;
  }
}

export function useModal() {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const open = () => dispatch({ type: 'OPEN' });
  const close = () => dispatch({ type: 'CLOSE' });
  return { isOpen: state.isOpen, open, close };
}