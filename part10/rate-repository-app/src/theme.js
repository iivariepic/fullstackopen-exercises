import { Platform } from "react-native"

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textWhite: '#f1faee',
    primary: '#0366d6',
    light: '#A8A8A8',
    error: '#d73a4a',
    background: '#e1e4e8',
    contentBackground: 'white',
    appBarBackground: '#24292e',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;