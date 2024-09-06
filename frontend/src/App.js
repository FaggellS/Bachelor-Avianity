// hooks
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/contexthooks/useAuthContext'

// layouts
import { SignupContextLayout } from './paths/SignupContextLayout'
import { ImportContextLayout } from './paths/ImportContextLayout'
import { IdentifyContextLayout } from './paths/IdentifyContextLayout'

// pages
import Home from './pages/Home'

import Explore from './pages/explore/Explore'
import InfoPhoto from './pages/explore/InfoPhoto'
import IdentifyPhoto from './pages/identify/IdentifyPhoto'
import FlagPhoto from './pages/identify/FlagPhoto'
import IdentifyThankYou from './pages/identify/IdentifyThankYou'

import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'
import Signup from './pages/auth/Signup'
import ConfirmSignup from './pages/auth/ConfirmSignup'

import ImportPhoto from './pages/import/ImportPhoto'
import ImportSubmit from './pages/import/ImportSubmit'
import ImportThankyou from './pages/import/ImportThankyou'

import UserPage from './pages/UserPage'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'

// components
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />

        <div className='pages'>


          <Routes>

            <Route
              path="/"
              element={ <Home /> }
            />

            <Route 
              path="*" 
              element={ <NotFound /> } 
            />

            <Route
              path="/user"
              element={ user ? <UserPage /> : <Navigate to="/" /> }
            />

            <Route
              path="/about-us"
              element={ <AboutUs  /> }
            />

            
            <Route
              path="/login"
              element={ !user ? <Login /> : <Navigate to="/" /> }
            />

            <Route
              path="/login/reset"
              element={ <ResetPassword /> }
            />

            <Route element={ <SignupContextLayout /> }>

              <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/" /> } />
              <Route path="/confirm-signup" element={ !user ? <ConfirmSignup /> : <Navigate to="/" /> } />

            </Route>

            <Route element={ <ImportContextLayout /> }>

              <Route path='/import' element={ user ? <ImportPhoto /> : <Navigate to="/" />  } />

              <Route path='/import/submit' element={ user ? <ImportSubmit /> : <Navigate to="/" />  } />

              <Route path='/import/thank-you' element={ user ? <ImportThankyou /> : <Navigate to="/" />  } />

            </Route>
            
            

            <Route element={ <IdentifyContextLayout /> }>

              <Route path='/explore' element={ <Explore />  } />

              <Route path='/explore/info' element={ user ? <InfoPhoto /> :
              <Navigate to="/" /> 
              } />
              
              <Route path='/selected/identify' element={ user ? <IdentifyPhoto /> : <Navigate to="/" />  } />

              <Route path='/selected/flag' element={ user ? <FlagPhoto /> : <Navigate to="/" />  } />

              <Route path='/selected/thank-you' element={ user ? <IdentifyThankYou /> : <Navigate to="/" />  } />

            </Route>




          </Routes>




        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
