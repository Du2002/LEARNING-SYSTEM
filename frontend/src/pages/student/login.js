import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  
} from '@mantine/core';
import classes from '@/styles/AuthenticationImage.module.css';

export default function Login() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back to LMS!
        </Title>

        <TextInput label="Email" placeholder="hello@gmail.com" size="md" radius="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" radius="md"  />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />

        <Anchor href="/courses" sx={{ display: 'block' }}>
          <Button fullWidth mt="xl" size="md" radius="md">
            Login
          </Button>
        </Anchor>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor href="/student/signup" fw={500}>
            
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}