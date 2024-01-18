import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import publicRoute from './config/router';
import ChatLayout from './layouts/ChatLayout';
import './app.scss';
import { useEffect } from 'react';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoute.map((route) => {
              let Layout = ChatLayout
              if (route.layout) Layout = route.layout
              const Page = route.page

              return <Route
                path={route.path}
                element={<Layout>
                  <Page />
                </Layout>}
                key={route.path}
              />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
