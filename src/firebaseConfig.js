import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {

  apiKey: "AIzaSyDbYI5tvxMyJPNhO7KV_UOpF5Ch0NPw_wU",
  authDomain: "trading-journal-ai-ai.firebaseapp.com",
  projectId: "trading-journal-ai-ai",
  storageBucket: "trading-journal-ai-ai.appspot.com",
  messagingSenderId: "749761967508",
  appId: "1:749761967508:web:76eff8ce9c135ef2430b81",
  measurementId: "G-RHF110K7YQ"

};

// Đảm bảo không khởi tạo nhiều lần khi dùng hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export default app;

