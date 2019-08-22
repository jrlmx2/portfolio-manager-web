import { createMuiTheme, createPalette } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E9F1F7",
      contrastText: "#39393A"
    },
    secondary: {
      main: "#E9F1F7",
      contrastText: "#415A77"
    },
    error: {
      main: "#080705",
      contrastText: "#F42C04"
    }
  }
});
