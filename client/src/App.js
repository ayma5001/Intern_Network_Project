import "./App.css";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Upload from "./pages/Upload/Upload";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  //const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <Navbar />

      <Router> 
        <Switch>
          <ProtectedRoute exact path="/" component={Home} /> 
          <ProtectedRoute exact path="/upload" component={Upload} /> 
          <ProtectedRoute exact path="/profile" component={Profile}  />
          <Route path="/register" exact render={() => <Register />} />
          <Route path="/login" exact render={() => <Login />} />
       </Switch>
      </Router>
    </>
  );
}

export default App;
