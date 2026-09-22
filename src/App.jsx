import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast"
import './App.css';
import Layout from './components/Layout/Layout'
import Inicio from './pages/Inicio/Inicio'
import Escenario from './pages/Escenario/Escenario'
import Productos from './pages/Catalogo/Productos'
import Contacto from './pages/Contacto/Contacto'
import Login from './pages/Auth/Login'
import Perfil from "./pages/Auth/Perfil";
import Carrito from "./pages/Carrito/Carrito";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={<Inicio />}
                />

                <Route
                  path="/escenario"
                  element={<Escenario />}
                />

                <Route
                  path="/producto"
                  element={<Productos />}
                />

                <Route
                  path="/contacto"
                  element={<Contacto />}
                />

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route 
                  path="/perfil" 
                  element={<Perfil />} />

                <Route
                  path="/carrito"
                  element={<Carrito />}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;