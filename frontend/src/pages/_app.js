// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

 
import { createTheme, MantineProvider } from '@mantine/core';
import Navbar from '@/components/Navbar';
import { AuthContextProvider } from '../../util/api/context/AuthContext';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps } ) {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </AuthContextProvider>
    </MantineProvider>
  );
}