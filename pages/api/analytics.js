const { query } = require('../../utils/db');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { event, userAgent, referrer, page, timeSpent, userIP, id } = req.body;
    console.log(id);
    if (!event || !page || !timeSpent || !userIP) {
      return res.status(400).json({ message: 'Event, page, time spent, and user IP are required' });
    }

    try {
      // Fetch the user's country based on their IP address
      const countryResponse = await fetch(`https://ipapi.co/${userIP}/country/`);
      const country = await countryResponse.text();

      const result = await query(
        'INSERT INTO analytics (page, user_agent, referrer, time_spent, country, embed_id) VALUES (?, ?, ?, ?, ?, ?)',
        [page, userAgent || '', referrer || '', timeSpent, country || 'Unknown', id || 'NA']
      );
      res.status(200).json({ message: 'Analytics data stored successfully', result });
    } catch (error) {
      console.error('Error storing analytics data:', error);
      res.status(500).json({ message: 'Error storing analytics data', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}