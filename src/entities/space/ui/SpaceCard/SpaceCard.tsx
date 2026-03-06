import { Card, Image, Text, Group, Button } from '@mantine/core';
import type { Space }  from '../../types/Space.ts';

interface SpaceCardProps {
  space: Space;
  onOpenModal: () => void;    
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, onOpenModal }) => {
  const renderSpaceName = () => {
    const nameParts = space.name.trim().split(/(\d+)\s*(kg|g|lb|oz)/i);
    if (nameParts.length > 1) {
      return (
        <>
          <span>{nameParts[0]}</span>
          <Text component="span" c="dimmed" fw={400}>
            {nameParts[1]}{nameParts[2] && ` ${nameParts[2]}`}
          </Text>
        </>
      );
    }
    return space.name;
  };

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section>
        <Image 
          src={space.image} 
          height={240} 
          fit="contain"
          p="md"
        />
      </Card.Section>
      
      <Group justify="center " mt="md" mb="xs">
        <Text fw={500} size="lg">{renderSpaceName()}</Text>
      </Group>
  
      <Group justify="center " mt="md" mb="xs">
        {space.rocketName && (
          <Text size="sm" c="dimmed" mb="md"  >
            {space.rocketName}
          </Text>
      )}
      </Group>
        <Group>
        <Button 
          onClick={onOpenModal}
          fullWidth
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          See more
        </Button>
      </Group>
    </Card>
  );
};

 

