const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Configuration, OpenAIApi } = require('openai');
admin.initializeApp();
const db = admin.firestore();
const openai = new OpenAIApi(new Configuration({ apiKey: functions.config().openai.key }));

exports.onAnswerWrite = functions.firestore
  .document('surveys/{surveyId}/answers/{qId}')
  .onWrite(async (snap, ctx) => {
    const id = ctx.params.surveyId;
    const answers = await db.collection(`surveys/${id}/answers`).get();
    const text = answers.docs.map(d => d.data().value).join('\n');
    const res = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You\u2019re an expert business consultant.' },
        { role: 'user', content: `Given these answers:\n${text}\n1) Next diagnostic question?\n2) Quick actionable win?` }
      ]
    });
    const parts = res.data.choices[0].message.content.split('\n').filter(Boolean);
    await db.collection(`surveys/${id}/questions`).add({
      prompt: parts[0],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    await db.collection(`surveys/${id}/suggestions`).add({
      text: parts[1],
      sourceQuestionId: ctx.params.qId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

exports.onSurveyComplete = functions.firestore
  .document('surveys/{surveyId}')
  .onUpdate(async (change, ctx) => {
    if (!change.before.data().completedAt && change.after.data().completedAt) {
      const id = ctx.params.surveyId;
      const answers = await db.collection(`surveys/${id}/answers`).get();
      const text = answers.docs.map(d => d.data().value).join('\n');
      const summ = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Summarize and prioritize improvements with estimated ROI.' },
          { role: 'user', content: `Business answers:\n${text}` }
        ]
      });
      await db.doc(`surveys/${id}/roadmap/summary`).set({
        summaryText: summ.data.choices[0].message.content,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  });
