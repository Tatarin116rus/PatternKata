import { Group, Text} from '@mantine/core';
import classes from './Header.module.css';

const Header: React.FC = () => {
  return (
    <Group className={classes.header} justify="center " p="md">
      <Text size="x1" fw={700}>SpaceX Launches 2020</Text>
    </Group>
  );
};

export default Header;
