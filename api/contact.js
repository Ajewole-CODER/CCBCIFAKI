export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = {};
  try {
    // Vercel parses JSON automatically when content-type is application/json
    body = req.body && Object.keys(req.body).length ? req.body : await parseBody(req);
  } catch (err) {
    console.warn('Failed to parse body as JSON, trying form data');
    // fallthrough: body may be provided via form-data; try to read as is
  }

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const message = (body.message || '').toString().trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields: name, email and message are required.' });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL; // e.g. church inbox

  if (!SENDGRID_API_KEY || !TO_EMAIL) {
    return res.status(500).json({ error: 'Email service not configured. Please set SENDGRID_API_KEY and TO_EMAIL environment variables.' });
  }

  const payload = {
    personalizations: [
      { to: [{ email: TO_EMAIL }] }
    ],
    from: { email: 'noreply@christcompanionbiblechurchifaki.vercel.app', name: 'CCBC Website' },
    subject: `Website message from ${name}`,
    content: [
      { type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` }
    ]
  };

  try {
    const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('SendGrid failed', r.status, txt);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Message sent — thank you!' });
  } catch (err) {
    console.error('contact handler error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper to parse body for non-JSON requests (small compatibility helper)
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        // Try JSON
        const json = JSON.parse(data);
        return resolve(json);
      } catch (e) {
        // Try URLSearchParams (form-encoded)
        try {
          const params = new URLSearchParams(data);
          const obj = {};
          for (const [k, v] of params) obj[k] = v;
          return resolve(obj);
        } catch (e2) {
          return resolve({});
        }
      }
    });
    req.on('error', reject);
  });
}
