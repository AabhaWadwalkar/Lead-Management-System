import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
// import User from "./scenes/Homepage/User";
import Sidebar from "./scenes/global/Sidebar";
import Homepage from "./scenes/Homepage/Homepage";
import Signup from "./scenes/Homepage/Signup";
import Login from "./scenes/Homepage/Login";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Products from './scenes/products/Products';
import ReportPage from "./scenes/report/Reports";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Statistics from "./scenes/statistics/Statistics";
import LeadDetails from "./scenes/team/LeadDetails";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const hideNav = location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/";

  return (
    <ColorModeContext.Provider value={colorMode}>  
  
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {!hideNav && <Sidebar/>}
          <main className="content">
            {!hideNav && <Topbar/>}
  
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              {/* <Route path="/user" element={<User/>}/> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addlead" element={<Team />} />
              <Route path="/lead/:id" element={<LeadDetails/>}/>
              <Route path="/allleads" element={<Products/>}/>
              <Route path="/statistics" element={<Statistics/>}/>
              <Route path="/reports" element={<ReportPage/>}/>
            
            </Routes>
          </main>
        </div>
     </ThemeProvider> 
    </ColorModeContext.Provider> 
    
  );
}

export default App;
