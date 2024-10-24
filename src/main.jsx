// src/main.jsx
import React, { useContext } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { AppProvider } from './context/AppContext'; // Importe o AppProvider
import App from './App.jsx';
import ListTickets from './pages/ListTickets.jsx';
import CreateTicket from './pages/CreateTicket.jsx';
import TicketPrint from './pages/TicketPrint.jsx';
import HomePage from './pages/HomePage.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Logout from './pages/Logout.jsx';
import NovoUsuario from './pages/NovoUsuario.jsx';
import NovaEmpresa from './pages/NovaEmpresa.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import EditarUsuario from './pages/EditarUsuario.jsx';
import UserInfo from './pages/UserInfo.jsx';
import MyTickets from './pages/MyTickets.jsx';
import NotasFiscais from './pages/NotasFiscais.jsx';
import ImageTicket from './pages/ImageTicket.jsx';


const router = createBrowserRouter([

  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <LoginPage/> },
      { path: '/home', element: <ProtectedRoute element={<HomePage />} /> },
      { path: '/novo', element: <ProtectedRoute element={<CreateTicket />} /> },
      { path: '/tickets', element: <ProtectedRoute element={<ListTickets />} /> },
      { path: '/print', element: <ProtectedRoute element={<TicketPrint />} /> },
      { path: '/config', element: <ProtectedRoute element={<Configuracoes />} /> },
      { path: '/usuarios', element: <ProtectedRoute element={<NovoUsuario />} /> },
      { path: '/empresa', element: <ProtectedRoute element={<NovaEmpresa />} /> },
      { path: '/editar_usuario/', element: <ProtectedRoute element={<EditarUsuario />} /> },
      { path: '/userinfo/', element: <ProtectedRoute element={<UserInfo />} /> },
      { path: '/mytickets/', element: <ProtectedRoute element={<MyTickets />} /> },
      { path: '/baixarnf/', element: <ProtectedRoute element={<NotasFiscais />} /> },
      { path: '/imagem', element: <ProtectedRoute element={<ImageTicket />} /> },
      { path: '/logout', element: <ProtectedRoute element={<Logout />} /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
