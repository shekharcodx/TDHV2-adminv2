import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import chakraTheme from "./components/ui/theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const chakraCache = createCache({
  key: "chakra", // makes styles prefixed
});

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CacheProvider value={chakraCache}>
      <ChakraProvider value={chakraTheme}>
        <App />
        <Toaster />
      </ChakraProvider>
    </CacheProvider>
  </BrowserRouter>
);
