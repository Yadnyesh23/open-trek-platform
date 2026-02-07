import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TrekListing from './pages/TrekListing';
import TrekDetails from './pages/TrekDetails'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrek from './pages/CreateTrek';
import EditTrek from './pages/EditTrek';
import Navbar from './components/Navbar';
// We will create these pages next
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen transition-colors duration-300
  bg-stone /* Light Mode Background */
  dark:bg-night-forest /* Dark Mode Background */">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TrekListing />} />
              <Route path="/trek/:id" element={<TrekDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-trek" element={<CreateTrek />} />
              <Route path="/edit-trek/:id" element={<EditTrek />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;