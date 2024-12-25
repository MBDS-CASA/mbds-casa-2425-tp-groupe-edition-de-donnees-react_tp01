import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotesIcon from '@mui/icons-material/Notes';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import InfoIcon from '@mui/icons-material/Info';

const MENU_ITEMS = [
  { text: 'Notes', icon: <NotesIcon /> },
  { text: 'Etudiants', icon: <PeopleIcon /> },
  { text: 'Matières', icon: <ClassIcon /> },
  { text: 'A propos', icon: <InfoIcon /> },
];

function Menu({ selected, onMenuClick }) {
  return (
    <AppBar position="static">
      <Toolbar>


        {MENU_ITEMS.map((item) => (
          <Button
            key={item.text}
            color="inherit"
            startIcon={item.icon}
            onClick={() => onMenuClick(item.text)}
            sx={{ color: selected === item.text ? 'secondary.main' : 'inherit' }}
          >
            {item.text}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Menu;