import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./components/Redirect";
import FeedbackDetailed from "./pages/ChatDetailed";
import Registration from "./pages/Registration";
import { UserProvider } from "./contexts/UserContext";
import { DataProvider } from "./contexts/DataContext";
import "./style/Main.scss";
import { Toaster } from "react-hot-toast";
import UserDetail from "./pages/UserDetail";
import RememberMe from "./components/RememberMe";
import ProtectedRoute from "./components/ProtectedRoute";
import useUserInfo from "./hooks/useUserInfo";

function App() {
  const { rememberMe } = useUserInfo();

  return (
    <div className="app-container">
      <UserProvider>
        <DataProvider>
          <Routes>
            <Route element={<RememberMe />}>
              <Route path="/" element={<Redirect />} />
              <Route path="/home" element={<Home />} index />
              <Route path="/chat/:id/:id" element={<FeedbackDetailed />} />
              <Route
                path="/login"
                element={
                  rememberMe != null ? (
                    <Navigate to="/home" />
                  ) : (
                    <Registration />
                  )
                }
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/user" element={<UserDetail />} />
                <Route path="/user/:id" element={<UserDetail />} />
              </Route>
            </Route>
          </Routes>
        </DataProvider>
      </UserProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
