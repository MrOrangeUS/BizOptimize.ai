import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';

const BusinessIntro = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const startSurvey = async e => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'surveys'), {
      userId: auth.currentUser.uid,
      businessName: name,
      businessDesc: desc,
      startedAt: serverTimestamp()
    });
    navigate(`/survey/${docRef.id}`);
  };

  return (
    <form onSubmit={startSurvey} className="p-4 space-y-2">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Business Name" className="border p-2" />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="border p-2" />
      <button className="bg-green-500 text-white p-2">Start Survey</button>
    </form>
  );
};

export default BusinessIntro;
