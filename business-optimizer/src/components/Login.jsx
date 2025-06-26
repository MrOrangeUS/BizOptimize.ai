import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const login = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pw);
  };

  const google = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="p-4">
      <form onSubmit={login} className="space-y-2">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-2" />
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="border p-2" />
        <button className="bg-blue-500 text-white p-2">Login</button>
      </form>
      <button onClick={google} className="mt-2 bg-red-500 text-white p-2">Sign in with Google</button>
    </div>
  );
};

export default Login;
