import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import QuestionStep from './QuestionStep';

const SurveyLoop = () => {
  const { sid } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'surveys', sid, 'questions'), orderBy('createdAt'));
    return onSnapshot(q, snap => setQuestions(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [sid]);

  const submitAnswer = async (qid, value) => {
    await setDoc(doc(db, 'surveys', sid, 'answers', qid), { value, answeredAt: serverTimestamp() }, { merge: true });
  };

  const current = questions[questions.length - 1];

  return current ? (
    <QuestionStep question={current} onSubmit={submitAnswer} />
  ) : (
    <div className="p-4">Loading...</div>
  );
};

export default SurveyLoop;
