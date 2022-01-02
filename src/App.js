import './App.css';
import Login from "./component/Login/Login";
import Project from "./component/Project/Project";
import ProjectScreens from "./component/Screens/Screens";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from "./Utils/Route/PrivateRoute";
import RestrictedRoute from "./Utils/Route/RestrictedRoute";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <Project/>
                        </PrivateRoute>
                    }/>
                    <Route path="/login" element={
                        <RestrictedRoute>
                            <Login/>
                        </RestrictedRoute>
                    }/>
                    <Route path="/screens/:projectId" element={
                        <PrivateRoute>
                            <ProjectScreens/>
                        </PrivateRoute>
                    }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
