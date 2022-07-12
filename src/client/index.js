import React from "react";
import { hydrateRoot } from 'react-dom/client';
import PageLoader from "./page-loader";
import { RouterProvider } from "../router";
import AppProvider from "../components/AppProvider";

const initialData = JSON.parse(
  document.getElementById("__FLAREACT_DATA").textContent
);

window.__FLAREACT_DATA = initialData;

const pagePath = initialData.page.pagePath;
const pageLoader = new PageLoader(pagePath);

const register = (page) => pageLoader.registerPage(page);

if (window.__FLAREACT_PAGES) {
  window.__FLAREACT_PAGES.forEach((p) => register(p));
}

window.__FLAREACT_PAGES = [];
window.__FLAREACT_PAGES.push = register;

async function render() {
  const App = await pageLoader.loadPage("/_app");
  const Component = await pageLoader.loadPage(pagePath);

  hydrateRoot(
    document.getElementById("__flareact"),
    <RouterProvider
      initialUrl={window.location.toString()}
      initialPagePath={pagePath}
      initialComponent={Component}
      pageLoader={pageLoader}
    >
      <AppProvider
        Component={Component}
        App={App}
        pageProps={initialData.props}
      />
    </RouterProvider>
  );
}

render();
