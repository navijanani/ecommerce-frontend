import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MerchantPage from "./pages/MerchantPage";
import CustomerPage from "./pages/CustomerPage";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/customer"
                  className="link-style"
                >
                  Customer
                </Link>
                <Link
                  to="/merchant"
                  className="link-style"
                >
                  Merchant
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/merchant" element={<MerchantPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
