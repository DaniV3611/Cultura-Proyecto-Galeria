import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 10,
    allVariants: {
      color: "#151424",
    },
  },

  /////////////////////////////////

  palette: {
    raisinBlack: {
      main: "#151424",
    },
    steelPink: {
      main: "#D831D7",
    },
    shockingPink: {
      main: "#F834BB",
    },
    frenchRose: {
      main: "#FF428E",
    },
    flourescentCyan: {
      main: "#2BF5E9",
    },
    iceBlue: {
      main: "#A8FFEF",
    },
    chartreuse: {
      main: "#DFF959",
    },
    orangeWeb: {
      main: "#F7A409",
    },
    tomato: {
      main: "#FF594C",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      cut: 190,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
