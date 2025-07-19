import express from 'express';
import { createUser, getUsers, loginUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';
import admin, { db } from '../firebase.js';

const router = express.Router();

// Đăng ký
router.post('/', createUser);
router.post('/register', createUser);

// Đăng nhập
router.post('/login', loginUser);

// Lấy danh sách users (tuỳ ý)
router.get('/', getUsers);

// Lấy thông tin user hiện tại (API thực tế FE sẽ gọi)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Thông tin cơ bản từ Firebase Auth
    const userRecord = await admin.auth().getUser(req.user.uid);

    // Nếu có thêm thông tin mở rộng trên Firestore (như plan, profile)
    let plan = 'free';
    let profile = {};
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (userDoc.exists) {
      profile = userDoc.data();
      if (profile.plan) plan = profile.plan;
    }

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || '',
      plan,
      ...profile
    });
  } catch (err) {
    res.status(500).json({ error: 'Không lấy được thông tin user.' });
  }
});

export default router;
