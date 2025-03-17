import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { json as d3Json } from 'd3-fetch';
import 'chart.js/auto';

import Link from 'next/link';
import WorldMap from "/components/WorldMap";
import Header from "/components/Header";
import TopReferrersTable from "/components/TopReferrersTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import DailyViewsBarChart from '/components/DailyViewsBarChart';
import DailyViewsCalendar from '/components/DailyViewsCalendar';

const geoUrl =
  'https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world.geojson';

export default function ViewAnalytics() {
  const router = useRouter();
  const { id } = router.query;

  const [embedData, setEmbedData] = useState(null);
  const [analyticsSummary, setAnalyticsSummary] = useState({
    dailyViews: [],
    countryCount: [],
    topPages: [],
    topReferrers: [],
    uniqueVisitors: 0,
    avgVisitTime: 0,
    remainingVisitors: 0
  });

  const [topography, setTopography] = useState();
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
    document.body.classList.add("relative","bg-yellow-50","overflow-hidden","max-h-screen");
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/getAnalytics?id=${id}`);
          const data = await response.json();
          setAnalyticsSummary(data);
        } catch (error) {
          console.error('Error fetching analytics summary:', error);
        }
      };

      const fetchTopography = async () => {
        try {
          const topoData = await d3Json(geoUrl);
          setTopography(topoData);
        } catch (error) {
          console.error('Error fetching topography data:', error);
        }
      };
      const fetchEmbedData = async () => {
        try {
        const response = await fetch(`/api/getEmbedLink?id=${id}`);
        const data = await response.json();
        console.log(data);
        setEmbedData(data);
        } catch (error) {
        console.error('Error fetching embed data:', error);
        }
    };
    fetchEmbedData();
      fetchData();
      fetchTopography();
    }
  }, [id]);
  
  return (
    <>
      <Header/>
      <main className="pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-5">
            <h1 className="text-3xl font-bold mb-10">
              { !embedData || !embedData.title ? "Loading..." : embedData.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-stretch">
                  <div className="text-gray-400 text-xs">
                    Toolbar
                  </div>
                  <div className="h-100 border-l mx-4" />
                  <div className="flex flex-nowrap gap-x-2">
                    <Link
                      href={ !embedData || !embedData.id ? "Loading..." : "/d/" + embedData.id + "/view"}
                      className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
                    >
                      View page
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
              <DailyViewsBarChart height={400} data={analyticsSummary.dailyViews} />
              <DailyViewsCalendar data={analyticsSummary.dailyViews} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Stats</h2>
                  <TopReferrersTable data={analyticsSummary.topReferrers} />
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Country</h2>
                  {topography && (
                    <WorldMap
                      width={550}
                      height={450}
                      data={{ visitors: analyticsSummary.countryCount, topography }}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Stats</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1 sm:col-span-2">
                      <div className="p-4 bg-green-100 rounded-xl">
                        <div className="font-bold text-xl text-gray-800 leading-none">
                          Good day, <br />
                          Guest
                        </div>
                        <div className="mt-5">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                          >
                            Start tracking
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">{analyticsSummary.avgVisitTime}:00</div>
                      <div className="mt-2">Avg time at which visitors visit</div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">{analyticsSummary.uniqueVisitors}</div>
                      <div className="mt-2">Unique IPs</div>
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                        <div className="font-bold text-xl leading-none">
                          Growth
                        </div>
                        <div className="mt-2">{analyticsSummary.remainingVisitors}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">AI recommendations</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Let me know you are interested</div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="font-bold hover:text-yellow-800 hover:underline"
                        onClick={() => handleButtonClick('AI recommendation')}
                      >
                        Coming soon
                      </a>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Let me know you are interested</div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="font-bold hover:text-yellow-800 hover:underline"
                        onClick={() => handleButtonClick('AI recommendation')}
                      >
                        Coming soon
                      </a>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Let me know you are interested</div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="font-bold hover:text-yellow-800 hover:underline"
                        onClick={() => handleButtonClick('AI recommendation')}
                      >
                        Coming soon
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
