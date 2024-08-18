import './App.css';
import Auth from './pages/auth/view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/welcome-page/view';
import HighchartsDashboard from './pages/highcharts/view';
import RechartsDashboard from './pages/recharts';
import ChartJsDashboard from './pages/chart-js';
import VictoryDashboard from './pages/victory';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-800 p-4">
              <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-semibold">
                  My Dashboard
                </Link>
                <div className="space-x-4">
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/chartjs"
                    className="text-gray-300 hover:text-white"
                  >
                    Chart.js
                  </Link>
                  <Link
                    to="/highcharts"
                    className="text-gray-300 hover:text-white"
                  >
                    Highcharts
                  </Link>
                  <Link
                    to="/recharts"
                    className="text-gray-300 hover:text-white"
                  >
                    Recharts
                  </Link>
                  <Link
                    to="/victory"
                    className="text-gray-300 hover:text-white"
                  >
                    Victory
                  </Link>
                </div>
              </div>
            </nav>
            {/* Main Content */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/chartjs" element={<ChartJsDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/highcharts" element={<HighchartsDashboard />} />
                <Route path="/recharts" element={<RechartsDashboard />} />
                <Route path="/victory" element={<VictoryDashboard />} />
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
