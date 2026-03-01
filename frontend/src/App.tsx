import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Digital Voting System</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to Digital Voting System</h2>
      <p>Secure voting for Swedish associations</p>
    </div>
  );
}

export default App;
