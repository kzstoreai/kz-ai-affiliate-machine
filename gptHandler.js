import express from 'express';
import axios from 'axios';

const router = express.Router();

// הגדר את המפתח שלך כאן
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// הנקודה שמטפלת בבקשה
router.get('/ask', async (req, res) => {
  const question = req.query.question;
  if (!question) {
    return res.status(400).send('Missing question');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'אתה כותב תשובות שיווקיות קצרות בעברית עם לינק אפיליאייט של KZ בסוף' },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const gptReply = response.data.choices[0].message.content;
    const fullReply = `${gptReply}\n\n🔗 לינק שותף מומלץ: https://systeme.io?sa=kz.store.ai`;
    res.send(fullReply);

  } catch (err) {
    console.error('GPT error:', err?.response?.data || err.message);
    res.status(500).send('שגיאה בתקשורת עם GPT');
  }
});

export default router;
