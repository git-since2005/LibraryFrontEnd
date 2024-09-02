import logo from './logo.svg';
import {React, Suspense, lazy} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
const User = lazy(()=>import('./User'))
const SignIn = lazy(()=>import('./SignIn'))
const SignUp = lazy(()=>import('./SignUp'))
const Librarian = lazy(()=>import('./Librarian.js'))
const LibrarySystem = lazy(()=>import('./LibrarySystem.js'))
const LibrarianSignUp = lazy(()=>import('./LibrarianSignup.js'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><User /></Suspense>} />
        <Route path='/signin' element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><SignIn /></Suspense>} />
        <Route path='/signup' element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><SignUp /></Suspense>} />
        <Route path='/librarian' element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><Librarian /></Suspense>} />
        <Route path='/LibrarySystem' element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><LibrarySystem /></Suspense>} />
        <Route path='/LibrarySignUp' element = {<Suspense fallback={<p style={{"marginTop":"25%","marginLeft":"50%",'transform':'translate(-50px, -50px)'}}>Loading...</p>}><LibrarianSignUp /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
