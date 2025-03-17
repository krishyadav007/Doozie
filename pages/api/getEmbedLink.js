const { query } = require('../../utils/db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const result = await query('SELECT * FROM embed_links WHERE id = ?', [id]);
      if (result.length === 0) {
        res.status(404).json({ error: 'Embed link not found' });
        return;
      }
      res.status(200).json(result[0]);
    } catch (error) {
      console.error('Error fetching embed link:', error);
      res.status(500).json({ error: 'Failed to fetch embed link' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}