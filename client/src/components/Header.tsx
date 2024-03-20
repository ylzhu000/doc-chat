import { AppBar, Toolbar, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import Logo from './Logo';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const navItems: { label: string; link: string }[] = [
  { label: 'Documents', link: '/dashboard/documents' },
  { label: 'Conversations', link: '/dashboard/conversations' },
];
const menuItems: string[] = ['Settings', 'Logout'];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);

  const onMenuClose = () => {
    setOpenMenu(null);
  };

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {navItems.map((nav) => (
            <Link to={nav.link} key={nav.label}>
              <Button sx={{ color: 'white', display: 'block' }}>{nav.label}</Button>
            </Link>
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
