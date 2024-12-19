import { INDEX } from '@shared/constants';
import { css } from '@styled/css';
import { Box, Flex } from '@styled/jsx';
import { buttonRecipe } from '@ui/Button/recipes';
import { Li, Ul } from '@ui/index';
import classNames from 'classnames';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menu = [
  {
    label: 'Azul',
    path: 'azul',
  },
  {
    label: 'Connect 4',
    path: 'connect-4',
  },
  {
    label: 'Richochet robot',
    path: 'ricochet-robot',
  },
];

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
        bg="ivory"
        overflow="auto"
      >
        <Ul>
          {menu.map(({ label, path }) => (
            <Li
              cursor="pointer"
              key={path}
              color="blue.700"
              _hover={{
                textDecoration: 'underline',
              }}
            >
              <Link to={path}>{label}</Link>
            </Li>
          ))}
        </Ul>
      </Flex>
    );
  }
  return (
    <Flex width="full" height="full" bg="ivory">
      <Box
        width="full"
        height="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Link
          className={classNames(
            buttonRecipe({
              buttonSize: 'sm',
              buttonStyle: 'text',
              buttonTheme: 'primary',
            }),
            css({
              left: 4,
              top: 4,
              position: 'absolute',
            }),
          )}
          to="/"
        >
          Back
        </Link>
        <Outlet />
      </Box>
    </Flex>
  );
}
