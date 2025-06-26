import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Summary = () => {
  const { sid } = useParams();
  const [summary, setSummary] = useState('');

  useEffect(() => {
    return onSnapshot(doc(db, 'surveys', sid, 'roadmap', 'summary'), snap => {
      if (snap.exists()) setSummary(snap.data().summaryText);
    });
  }, [sid]);

  return <div className="p-4 whitespace-pre-wrap">{summary || 'Loading...'}</div>;
};

export default Summary;
