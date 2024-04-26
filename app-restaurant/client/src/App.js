import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import RestauraceListProvider from "./RestauraceListProvider";
import RestauraceList from "./RestauraceList";

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
            <Route
              index
              element={
                <RestauraceListProvider>
                  <RestauraceList />
                </RestauraceListProvider>
              }
            />
            {/*     <Route
              path="restauraceDetail"
              element={
                <EventProvider>
                  <EventRoute />
                </EventProvider>
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
