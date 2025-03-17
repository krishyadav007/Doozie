import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "/components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function ViewEmbed() {
  const router = useRouter();
  const { id } = router.query;
  const [embedData, setEmbedData] = useState(null);
  const [views, setViews] = useState(0);

  const MySwal = withReactContent(Swal);

  const handleButtonClick = (name) => {
    MySwal.fire({
      title: `Do you want ${name}?`,
      text: `Vote here for the ${name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        window.open('/new-url', '_blank'); // Replace '/new-url' with the desired URL
      }
    });
  };

  useEffect(() => {
    if (!id) return; // Wait until id is defined

    document.body.classList.add("relative", "bg-yellow-50", "overflow-hidden", "max-h-screen");
    const handleAnalytics = async () => {
      const startTime = Date.now();

      // Fetch the user's IP address
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;

      window.addEventListener('beforeunload', async () => {
        const endTime = Date.now();
        const timeSpent = (endTime - startTime) / 1000; // time spent in seconds

        const analyticsData = {
          event: 'page_view',
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          page: window.location.pathname,
          timeSpent,
          country: 'Unknown',
          id: id,
          userIP
        };

        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analyticsData),
        });
      });
    };

    handleAnalytics();
  }, [id]);

  useEffect(() => {
    if (!id) return; // Wait until id is defined

    const fetchEmbedData = async () => {
      try {
        const response = await fetch(`/api/getEmbedLink?id=${id}`);
        const data = await response.json();
        setEmbedData(data);
      } catch (error) {
        console.error('Error fetching embed data:', error);
      }
    };

    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/getAnalytics?id=${id}`);
        const data = await response.json();
        // console.log(data.dailyViews);
        const totalViews = data.dailyViews.reduce((acc, view) => acc + view.views, 0);
        setViews(totalViews);
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    };

    fetchEmbedData();
    fetchViews();
  }, [id]);

  if (!embedData) {
    return <div>Loading...</div>;
  }

  const publishedDate = new Date(embedData.timestamp);
  const day = publishedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const date = publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Header />
      <main className="pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-5">
              <h1 className="text-3xl font-bold mb-10">
                {embedData.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-stretch">
                  <div className="text-gray-400 text-xs">
                    {day}, {date}
                  </div>
                  <div className="h-100 border-l mx-4" />
                  <div className="flex flex-nowrap gap-x-2">
                    <Link
                      href={"/d/" + embedData.id + "/analytics"}
                      className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
                    >
                      Analytics
                      <span className="ml-2">{views}</span>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition"
                    onClick={() => handleButtonClick('likes')}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition"
                    onClick={() => handleButtonClick('comments')}
                  >
                    <FontAwesomeIcon icon={faComments} />
                  </button>
                </div>
              </div>
              <hr className="my-10" />
              <div className="mt-2">
                <iframe
                  id="embedded-doc"
                  src={embedData.embed_link}
                  width="100%"
                  height="1500"
                  style={{ width: '100%' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}