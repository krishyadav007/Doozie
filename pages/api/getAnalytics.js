const { query } = require('../../utils/db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const dailyViews = await query(`
        SELECT DATE(timestamp) as date, COUNT(*) as views
        FROM analytics
        WHERE embed_id = ?
        GROUP BY DATE(timestamp)
        ORDER BY DATE(timestamp) DESC
      `, [id]);

      const countryCount = await query(`
        SELECT country, COUNT(*) as count
        FROM analytics
        WHERE embed_id = ?
        GROUP BY country
        ORDER BY count DESC
      `, [id]);

      const topPages = await query(`
        SELECT page, COUNT(*) as views
        FROM analytics
        WHERE embed_id = ?
        GROUP BY page
        ORDER BY views DESC
        LIMIT 10
      `, [id]);

      const topReferrers = await query(`
        SELECT referrer, COUNT(*) as count
        FROM analytics
        WHERE embed_id = ?
        GROUP BY referrer
        ORDER BY count DESC
        LIMIT 10
      `, [id]);
      const uniqueVisitors = 0;
      // const uniqueVisitors = await query(`
      //   SELECT COUNT(DISTINCT ip) as uniqueVisitors
      //   FROM analytics
      //   WHERE embed_id = ?
      // `, [id]);

      const avgVisitTime = await query(`
        SELECT HOUR(timestamp) as hour, COUNT(*) as count
        FROM analytics
        WHERE embed_id = ?
        GROUP BY HOUR(timestamp)
        ORDER BY count DESC
        LIMIT 1
      `, [id]);

      const todayVisitors = await query(`
        SELECT COUNT(*) as todayVisitors
        FROM analytics
        WHERE embed_id = ? AND DATE(timestamp) = CURDATE()
      `, [id]);

      const avgDailyVisitors = await query(`
        SELECT AVG(daily_count) as avgDailyVisitors
        FROM (
          SELECT DATE(timestamp) as date, COUNT(*) as daily_count
          FROM analytics
          WHERE embed_id = ?
          GROUP BY DATE(timestamp)
        ) as daily_counts
      `, [id]);

      const remainingVisitors = avgDailyVisitors[0].avgDailyVisitors - todayVisitors[0].todayVisitors;

      res.status(200).json({ dailyViews, countryCount, topPages, topReferrers, uniqueVisitors: uniqueVisitors, avgVisitTime: avgVisitTime[0].hour, remainingVisitors });
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      res.status(500).json({ message: 'Error fetching analytics summary', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}