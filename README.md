# Trading Journal AI Backend

This project provides an Express based API that uses Firebase Firestore.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in the values for your environment.
3. Ensure the path in `GOOGLE_APPLICATION_CREDENTIALS` points to your Firebase service account JSON.
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

## Environment Variables

The application relies on the following variables which are demonstrated in `.env.example`:

- `PORT` – port to run the server on.
- `JWT_SECRET` – secret key used to sign JWTs.
- `DATABASE_URL` – connection string for PostgreSQL.
- `GOOGLE_APPLICATION_CREDENTIALS` – path to your Firebase service account JSON file.
- `FIREBASE_API_KEY` – Firebase Web API key.
- `FIREBASE_AUTH_DOMAIN` – Firebase Auth domain.
- `FIREBASE_PROJECT_ID` – Firebase project ID.
- `FIREBASE_STORAGE_BUCKET` – Firebase storage bucket.
- `FIREBASE_MESSAGING_SENDER_ID` – Firebase messaging sender ID.
- `FIREBASE_APP_ID` – Firebase app ID.
- `FIREBASE_MEASUREMENT_ID` – Firebase measurement ID.
