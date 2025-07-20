import { db } from '../config/firebase.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'; // Nhớ cài npm install jsonwebtoken
import dotenv from 'dotenv';
dotenv.config();

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const id = uuidv4();
  await db.collection('users').doc(id).set({ id, email, password: hashed });
  res.status(201).json({ id, email });
};

export const getUsers = async (req, res) => {
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map(doc => {
    const { id, email } = doc.data();
    return { id, email };
  });
  res.json(users);
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Tìm user theo email
  const snapshot = await db.collection('users').where('email', '==', email).get();
  if (snapshot.empty) {
    return res.status(401).json({ message: 'Sai email hoặc mật khẩu!' });
  }
  const user = snapshot.docs[0].data();
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Sai email hoặc mật khẩu!' });
  }
  // Tạo JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );
  res.json({ token, user: { id: user.id, email: user.email } });
};