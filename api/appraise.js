// This is a "serverless function" -- a small piece of backend code that
// Vercel runs on-demand. It never runs in the user's browser, so this is
// the ONLY safe place to use the real Anthropic API key.
//
// The frontend (index.html) sends it { messages, max_tokens }.
// This function adds the secret key + required headers, calls Anthropic,
// and hands the response straight back.

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY. Set it in Vercel > Project > Settings > Environment Variables.' });
    return;
  }

  try {
    const { messages, max_tokens } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: max_tokens || 1200,
        messages,
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error calling Anthropic API', details: err.message });
  }
};
