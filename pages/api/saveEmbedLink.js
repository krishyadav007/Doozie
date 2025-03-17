const { query } = require('../../utils/db');
const { v4: uuidv4 } = require('uuid');

function isValidEmbedLink(link) {
  try {
    const url = new URL(link);
    const regex = /^https:\/\/docs\.google\.com\/document\/d\/[a-zA-Z0-9_-]+/;
    return regex.test(url.href);
  } catch (err) {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { embedLink, selectedOption, title } = req.body;

    if (!isValidEmbedLink(embedLink)) {
      res.status(400).json({ error: 'Invalid embed link' });
      return;
    }

    const uniqueId = uuidv4();

    try {
      const result = await query(
        'INSERT INTO embed_links (id, embed_link, selected_option, title) VALUES (?, ?, ?, ?)',
        [uniqueId, embedLink, selectedOption, title]
      );
      res.status(200).json({ message: 'Embed link saved successfully', id: uniqueId, result });
    } catch (err) {
      console.error('Error saving embed link: ' + err.stack);
      res.status(500).json({ error: 'Failed to save embed link' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}