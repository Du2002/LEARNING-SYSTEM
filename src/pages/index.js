import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from '../styles/HeroContentLeft.module.css';

export default function Home() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Learning Management System</Title>
        <Text className={classes.description} size="xl" mt="xl"><b>
          "Unlock your potential with our comprehensive learning platform.
          Access courses,track your progress, and achieve your goals all in one place."</b>
        </Text>
        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Get started
        </Button>
      </Container>
    </div>
  );
}