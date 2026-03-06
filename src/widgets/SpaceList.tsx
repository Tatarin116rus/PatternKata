
import { useEffect, useReducer } from 'react';
import { Container, SimpleGrid } from '@mantine/core';
import { SpaceCard } from '../entities/space/ui/SpaceCard/SpaceCard.tsx';
import { fetchSpacesByYear } from '../entities/space/api/spaceApi.ts';
import { SpaceDetailsModal } from '../features/ui/SpaceDetailsModal.tsx';
import type { Space } from '../entities/space/types/Space.ts';

// Редьюсер (как обсуждали ранее)
type State = {
  spaces: Space[];
  selectedSpace: Space | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Space[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT_SPACE'; payload: Space | null }
  | { type: 'CLOSE_MODAL' };

const initialState: State = {
  spaces: [],
  selectedSpace: null,
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, spaces: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SELECT_SPACE':
      return { ...state, selectedSpace: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, selectedSpace: null };
    default:
      return state;
  }
}

export const SpaceList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetchSpacesByYear('2020')
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error.message }));
  }, []);

  const handleOpenModal = (space: Space) => {
    dispatch({ type: 'SELECT_SPACE', payload: space });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  // Можно добавить обработку загрузки и ошибок
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <Container size="xl" py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {state.spaces.map(space => (
          <SpaceCard
            key={space.id}
            space={space}
            onOpenModal={() => handleOpenModal(space)}
          />
        ))}
      </SimpleGrid>

      {/* Модальное окно открывается, если выбран space */}
      {state.selectedSpace && (
        <SpaceDetailsModal
          space={state.selectedSpace}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};