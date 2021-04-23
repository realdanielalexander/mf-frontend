import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@/../scss/vuetify/overrides.scss";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify);

const theme = {
  primary: "#000000", // change header color from here || "#1e88e6", "#21c1d6", "#fc4b6c", "#563dea", "#9C27b0", "#ff9800"
  info: "#1e88e5",
  success: "#06d79c",
  accent: "#ef5350",
  default: "#563dea",
  lightblue: "#14c6FF",
  yellow: "#FFCF00",
  pink: "#FF1976",
  orange: "#FF8657",
  magenta: "#C33AFC",
  darkblue: "#1E2D56",
  gray: "#909090",
  neutralgray: "#9BA6C1",
  green: "#2ED47A",
  red: "#FF5c4E",
  darkblueshade: "#308DC2",
  lightgray: "#BDBDBD",
  lightpink: "#FFCFE3",
  white: "#FFFFFF"
};

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
    dark: false, // If you want to set dark theme then dark:true else set to false
  },
});
