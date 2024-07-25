import { Link, Outlet, useLocation } from 'react-router-dom';

import { INDEX } from '@shared/constants';
import { Box, Flex } from '@styled/jsx';
import { buttonRecipe } from '@ui/Button';
import { Li, Ul } from '@ui/index';

export default function App() {
  const location = useLocation();

  if (location.pathname === INDEX) {
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="full"
        height="full"
        p="4"
      >
        <Ul>
          <Li
            cursor="pointer"
            color="blue.700"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            <Link to="connect-4">Connect 4</Link>
          </Li>
          <Li
            cursor="pointer"
            color="blue.700"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            <Link to="ricochet-robot">Ricochet robot</Link>
          </Li>
        </Ul>
      </Flex>
    );
  }
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      width="full"
      height="full"
      py="4"
    >
      <Box width="full">
        <Outlet />
      </Box>
      <Box>
        <Link
          className={buttonRecipe({
            buttonSize: 'sm',
            buttonStyle: 'text',
            buttonTheme: 'primary',
          })}
          to="/"
        >
          Back
        </Link>
      </Box>
    </Flex>
  );
}
