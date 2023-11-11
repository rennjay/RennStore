import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
  isDarkMode: boolean;
  handleThemeChange: (isDarkMode: boolean) => void;
}

const midLinks = [
  { title: "Catalog", path: "catalog" },
  { title: "About", path: "about" },
  { title: "Contact", path: "contact" },
];

const rightLinks = [
  { title: "Login", path: "login" },
  { title: "Register", path: "register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ handleThemeChange, isDarkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
          Renn-Store
        </Typography>
        <Switch
          checked={isDarkMode}
          onChange={() => handleThemeChange(!isDarkMode)}
        />
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => {
            return (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            );
          })}
        </List>

        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => {
            return (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            );
          })}
        </List>
      </Toolbar>
    </AppBar>
  );
}
