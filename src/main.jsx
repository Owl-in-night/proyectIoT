import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { LanguageProvider } from "./context/LanguageContext.jsx";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const queryClient = new QueryClient();
import { NextUIProvider } from "@nextui-org/react";

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
