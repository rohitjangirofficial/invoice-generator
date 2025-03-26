import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddCustomers from "./pages/AddCustomers";
import InvoiceCreation from "./pages/InvoiceCreation";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-customers"
            element={
              <ProtectedRoute>
                <AddCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice-creation"
            element={
              <ProtectedRoute>
                <InvoiceCreation />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        containerStyle={{
          inset: "32px",
        }}
        toastOptions={{
          style: {
            borderRadius: "25px",
            padding: "7px 15px",
            maxWidth: "700px",
            fontWeight: "500",
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;
