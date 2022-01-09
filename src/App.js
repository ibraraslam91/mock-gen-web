import './App.css';
import Login from "./component/Login/Login";
import Project from "./component/Project/Project";
import ProjectScreens from "./component/Screens/Screens";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from "./Utils/Route/PrivateRoute";
import RestrictedRoute from "./Utils/Route/RestrictedRoute";
import ProjectSetting from "./component/Setting/ProjectSetting";


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
                    <Route path="/setting/:projectId" element={
                        <PrivateRoute>
                            <ProjectSetting/>
                        </PrivateRoute>
                    }

                    />
                </Routes>
            </div>
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </BrowserRouter>
    );
}

export default App;
