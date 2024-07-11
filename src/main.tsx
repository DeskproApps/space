import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import { ReplyBoxProvider } from "./hooks";
import { App } from "./App";
import { ErrorFallback } from "./components";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "@deskpro/deskpro-ui/dist/fonts/DpIcons/dp-icon-v2.css";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render((
  <StrictMode>
    <DeskproAppProvider>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingSpinner/>}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ReplyBoxProvider>
                <App />
              </ReplyBoxProvider>
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </HashRouter>
    </DeskproAppProvider>
  </StrictMode>
));
