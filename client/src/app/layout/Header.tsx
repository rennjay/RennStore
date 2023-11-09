import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  isDarkMode: boolean;
  handleThemeChange: (isDarkMode: boolean) => void;
}

export default function Header({ handleThemeChange, isDarkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6">Renn-Store</Typography>
        <Switch
          checked={isDarkMode}
          onChange={() => handleThemeChange(!isDarkMode)}
        />
      </Toolbar>
    </AppBar>
  );
}
