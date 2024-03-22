import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, IconButton, useTheme, styled } from '@mui/material';
import Logo from './Logo';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const navItems: { label: string; link: string }[] = [
  { label: 'Documents', link: '/' },
  { label: 'Conversations', link: '/' },
];
const menuItems: string[] = ['Settings', 'Logout'];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const onMenuClose = () => {
    setOpenMenu(null);
  };

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  return (
    <AppBar component="nav" sx={{ backgroundColor: theme.palette.primary.dark }}>
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {navItems.map((nav) => (
            <StyledLink to={nav.link} key={nav.label}>
              <Button sx={{ color: 'white', display: 'block' }}>{nav.label}</Button>
            </StyledLink>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={onOpenMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            sx={{ mt: '3.8rem' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={openMenu}
            open={Boolean(openMenu)}
            onClose={onMenuClose}
          >
            {menuItems.map((menu) => (
              <MenuItem key={menu}>{menu}</MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
