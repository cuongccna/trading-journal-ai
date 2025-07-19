import express from 'express';
import admin from 'firebase-admin'; // Đã config ở src/firebase.js rồi

const router = express.Router();

// POST /api/login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Xác thực Firebase Auth qua REST API (vì Admin SDK không support sign-in bằng email/password)
  try {
    // Gọi trực tiếp Firebase REST API để sign-in (không dùng Admin SDK)
    const apiKey = process.env.FIREBASE_API_KEY; // phải có trong .env!
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(401).json({ error: data.error?.message || 'Sai tài khoản hoặc mật khẩu!' });
    }
    // Đăng nhập thành công: trả về idToken và user info
    res.json({
      token: data.idToken,
      refreshToken: data.refreshToken,
      user: {
        email: data.email,
        localId: data.localId,
        displayName: data.displayName
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Có lỗi server xảy ra!' });
  }
});

export default router;
