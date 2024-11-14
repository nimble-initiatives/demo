import store from '../../store';

const VERCEL_PROJECT_ID = 'prj_5sVnT59PATAOyxrAadCc14TYIbmC';
const VERCEL_AUTH_TOKEN = 'GmkF6ke5pWX502A2e7rvaqVP';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export async function GET({ params, request }) {
  // Get today's date
  const today = new Date();

  const date1DaysAgo = new Date(today);
  date1DaysAgo.setDate(today.getDate() - 1);

  const last14Days = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    last14Days.push(date);
  }

  const session = store.openSession();
  const allPages = await session.query({ indexName: 'Content/ByUrl' }).all();

  allPages.forEach(async (page) => {
    const tsf = session.timeSeriesFor(page.id, 'Stats');
    last14Days.forEach((date) => {
      const total = Math.floor(Math.random() * 100); // Random pageviews between 0-99
      const visitors = Math.floor(Math.random() * (total + 1)); // Random visitors up to total views
      tsf.append(date, [total, visitors]);
    });
  });
  await session.saveChanges();

  /* await fetch(
    `https://vercel.com/api/web/insights/stats/path?projectId=${VERCEL_PROJECT_ID}&from=${formatDate(
      date1DaysAgo
    )}&to=${formatDate(today)}`,
    {
      headers: { Authorization: `Bearer ${VERCEL_AUTH_TOKEN}` },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch stats');
      }
    })
    .then((stats) => {
      console.log('Got stats:', stats);
      const session = store.openSession();
      stats.data.forEach(async (stat) => {
        const page = await session
          .query({ indexName: 'Content/ByUrl' })
          .whereEquals('url', stat.key)
          .firstOrNull();
        if (page) {
          const tsf = session.timeSeriesFor(page.id, 'Stats');
          tsf.append(today, [stat.total, stat.devices]);

          console.log('Page updated:', [stat.total, stat.devices]);
          await session.saveChanges();
        }
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    }); */

  return new Response('OK');
}