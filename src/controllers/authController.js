import { db } from '../config/firebase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Đăng ký tài khoản
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (!snapshot.empty) return res.status(409).json({ error: 'Email đã tồn tại' });
    const hashed = await bcrypt.hash(password, 10);
    const user = { email, password: hashed };
    const docRef = await db.collection('users').add(user);
    res.status(201).json({ id: docRef.id, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Đăng nhập tài khoản
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) return res.status(401).json({ error: 'Sai email hoặc mật khẩu' });
    const user = snapshot.docs[0].data();
    const userId = snapshot.docs[0].id;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Sai email hoặc mật khẩu' });
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: userId, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Middleware xác thực JWT
export const requireAuth = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Token thiếu hoặc không hợp lệ' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc hết hạn' });
  }
};