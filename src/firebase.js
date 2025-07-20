import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Thiếu biến GOOGLE_APPLICATION_CREDENTIALS trong .env!');
}
const keyPath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);

let serviceAccount;
try {
  serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
} catch (e) {
  throw new Error(`Không tìm thấy hoặc đọc được file serviceAccountKey.json tại path: ${keyPath}.`);
}

// **CHỈ THÊM KHÚC NÀY**
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
// **KẾT THÚC**


export const db = admin.firestore();
export default admin; // <- THÊM DÒNG NÀY!
