import { Navigate,Route } from "react-router-dom";
import Home from "./Home";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Route exact path="/" component={<Home/>}/>
};

export default ProtectedRoute;
