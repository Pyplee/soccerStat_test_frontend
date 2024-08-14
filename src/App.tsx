import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './layout';
import CommandsInfo from './pages/CommandsInfo';
import Commands from './pages/Commands';
import Competitions from './pages/Competitions';
import CompetitionsInfo from './pages/CompetitionsInfo';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/competitions" />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/competitions/info" element={<CompetitionsInfo />} />
          <Route path="/commands/info" element={<CommandsInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
