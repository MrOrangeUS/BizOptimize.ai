# Business Optimizer MVP

Minimal setup for a generative business optimization survey.

## Environment
Set Firebase values in `.env` and OpenAI key in functions config.

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

Configure OpenAI:
```
firebase functions:config:set openai.key="sk-..."
```

## Commands

```
firebase login
firebase use <project>
npm install
npm run build
firebase deploy --only hosting,functions
```
