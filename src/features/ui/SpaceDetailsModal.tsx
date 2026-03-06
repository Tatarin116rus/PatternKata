// src/features/spaceDetails/ui/SpaceDetailsModal.tsx

import  Modal from '../../shared/ui/Modal';
import type { Space } from '../../entities/space/types/Space';
import { Text, Group, Image } from '@mantine/core';

interface SpaceDetailsModalProps {
  space: Space;            // данные выбранного запуска
  isOpen: boolean;         // флаг открытия (можно управлять извне)
  onClose: () => void;     
}

export const SpaceDetailsModal = ({ space, isOpen, onClose }: SpaceDetailsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Group justify="center" mb="md">
          <Text size="lg" fw={700}>{space.name}</Text>
        </Group>

        {space.image && (
          <Image
            src={space.image}
            height={240}
            fit="contain"
            p="md"
            alt={space.name}
          />
        )}

        <Group mt="md">
          <Text size="sm" c="dimmed">Rocket:</Text>
          <Text size="sm">{space.rocketName || 'Unknown'}</Text>
        </Group>

        <Group mt="sm">
          <Text size="sm" c="dimmed">Launch year:</Text>
          <Text size="sm">{space.launchYear}</Text>
        </Group>

        <Text size="sm" mt="lg" fw={500}>Description:</Text>
        <Text size="sm" c="dimmed" mt="xs">
          {space.description}
        </Text>
      </div>
    </Modal>
  );
};