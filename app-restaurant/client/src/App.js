import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import RestauraceListProvider from "./restaurace/RestauraceListProvider";
import RestauraceList from "./restaurace/RestauraceList";
import RestauraceProvider from "./restaurace/RestauraceProvider";
import Restaurace from "./restaurace/Restaurace";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <RestauraceListProvider>
                  <RestauraceList />
                </RestauraceListProvider>
              }
            />
            {/* <Route
              path="restauraceDetail"
              element={
                <RestauraceProvider>
                  <Restaurace />
                </RestauraceProvider>
              }
            /> */}

            {/* <Route path="*" element={"not found"} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
