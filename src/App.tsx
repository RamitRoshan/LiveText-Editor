import { useEffect } from 'react';
import './App.css'
import { auth } from './firebase-config';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { TextEditor } from './components/text-editor';
 

function App() {
  useEffect(() =>{
    signInAnonymously(auth);
    onAuthStateChanged(auth, user =>{
      //if user sign in
      if(user){
        console.log(`User signed in: `, user.uid);
      }
    })
  }, []);

  return (
    <div className='App'> 
      <header> 
        <h1> Google Docs Clone</h1>
      </header>
      <TextEditor/>
    </div>
  );
}

export default App
