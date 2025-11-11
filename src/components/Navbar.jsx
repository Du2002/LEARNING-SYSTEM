import { useState } from 'react';
import { Avatar, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '@/styles/HeaderSimple.module.css';

const links = [
  { link: '/student/login', label: 'Login' },
  { link: '/student/signup', label: 'Signup' },
  { link: '/courses', label: 'Courses' },
  { link: '/community', label: 'Community' },
];

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Avatar></Avatar>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}