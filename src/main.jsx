import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import chakraTheme from "./components/ui/theme";
import createCache from "@emotion/cache";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "./index.css";

const chakraCache = createCache({
  key: "chakra", // makes styles prefixed
});

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider value={chakraTheme}>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);
