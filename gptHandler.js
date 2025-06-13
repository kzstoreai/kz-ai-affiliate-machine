import express from 'express';
import axios from 'axios';

const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.get('/ask', async (req, res) => {
  const question = req.query.question;
  if (!question) {
    return res.status(400).send('Missing question');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a persuasive marketing assistant that writes short promotional answers in English. Always include this affiliate link at the end: https://systeme.io?sa=kz.store.ai',
          },
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
    res.send(gptReply);
  } catch (err) {
    console.error('GPT error:', err?.response?.data || err.message);
    res.status(500).send('Error communicating with GPT');
  }
});

export default router;
