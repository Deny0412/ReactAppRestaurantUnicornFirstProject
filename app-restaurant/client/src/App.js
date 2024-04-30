import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import RestauraceListProvider from "./restaurace/RestauraceListProvider";
import RestauraceList from "./restaurace/RestauraceList";
import RestauraceProvider from "./restaurace/RestauraceProvider";
import RestauraceFilter from "./restaurace/RestauraceFilter";
import KategorieListProvider from "./kategorie/KategorieListProvider";
import RestauraceDetail from "./restaurace/RestauraceDetail";
import RestauraceMenu from "./restaurace/RestauraceMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RestauraceListProvider>
                <KategorieListProvider>
                  <RestauraceFilter />
                  <RestauraceList />
                </KategorieListProvider>
              </RestauraceListProvider>
            }
          />
          <Route
            path="restauraceDetail"
            element={
              <RestauraceProvider>
                <RestauraceDetail />
                <RestauraceMenu />
              </RestauraceProvider>
            }
          />

          {/* <Route path="*" element={"not found"} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
