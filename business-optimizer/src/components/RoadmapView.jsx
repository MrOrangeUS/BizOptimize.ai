import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const RoadmapView = () => {
  const { sid } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, 'surveys', sid, 'suggestions'), snap => {
      setItems(snap.docs.map(d => d.data()));
    });
  }, [sid]);

  return (
    <ul className="p-4 list-disc">
      {items.map((s, i) => (
        <li key={i}>{s.text}</li>
      ))}
    </ul>
  );
};

export default RoadmapView;
