import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Header from "/components/Header";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [embedLink, setEmbedLink] = useState('');
  const [title, setTitle] = useState('');
  const [faqOpen, setFaqOpen] = useState({});
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      embedLink,
      selectedOption,
      title,
    };

    const response = await fetch('/api/saveEmbedLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      router.push(`/d/${result.id}/view/`);
    } else {
      console.error('Failed to save embed link:', result.error);
    }

    setEmbedLink('');
    setSelectedOption('option1');
    setTitle('');
  };

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    document.body.classList.add("relative", "bg-yellow-50", "overflow-auto", "min-h-screen");
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
          country: 'Unknown', // Placeholder, will be updated in backend
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
  }, []);

  return (
    <>
      <Header />
      <main className="w-full flex flex-col items-center text-gray-800">
        <section id="home" className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center py-20 bg-yellow-100">
            <h1 className="text-5xl px-4 font-bold text-center">Track the virality of your document</h1>
            <div className="mt-8 ">
              <p className="text-xl font-semibold">Unlock the Power of Your Google Docs:</p>
              <ul className="mt-4 space-y-2 text-lg">
                <li>• Simple, Intutive & Easy to use</li>
                <li>• Detailed metrics and analytics </li>
                <li>• Track engagement and measure success</li>
              </ul>
              <button className="mt-8 py-2 px-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                Start Now
              </button>
            </div>
          </div>
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: "url('/img/Dashy.png')" }}>
          </div>
        </section>

        <section id="about" className="w-full h-screen flex flex-col items-center justify-center py-20 bg-purple-100">
          <div className='bg-white rounded-3xl p-8 mb-5 w-3/4'>
            <h2 className="text-3xl font-bold mb-4">Embed link</h2>
            <hr></hr>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="embedLink">
                  Embed Link
                </label>
                <input
                  type="text"
                  id="embedLink"
                  value={embedLink}
                  onChange={(e) => setEmbedLink(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter embed link"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>

        <section id="steps" className="w-full h-screen flex flex-col items-center justify-center py-20 bg-red-100">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-8 flex items-center justify-center space-x-4 px-3">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
              <img src="/img/Step1.png" alt="Step 1" className="w-full mb-4" />
              <h3 className="text-xl font-semibold">Step 1</h3>
              <p className="mt-2 text-lg text-center">Click on files. Click on share. Click publish to web.</p>
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="text-2xl text-gray-600" />
            <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
            <img src="/img/Step2.png" alt="Step 2" className="w-full mb-4" />
              <h3 className="text-xl font-semibold">Step 2</h3>
              <p className="mt-2 text-lg text-center">Copy the link provided</p>
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="text-2xl text-gray-600" />
            <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
            <img src="/img/Step3.png" alt="Step 3" className="w-full mb-4" />
            <h3 className="text-xl font-semibold">Step 3</h3>
              <p className="mt-2 text-lg text-center">Paste the link with suitable title and submit</p>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full h-screen flex flex-col items-center justify-center py-20 bg-yellow-100">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <div className="mt-8 max-w-2xl space-y-4">
            {[
              { question: "What is Doozie?", answer: "Doozie is an analytics tool designed to help Google Docs auther make understand the impact and reach of their documents." },
              { question: "How does it work?", answer: "Embed  your docs, check out dashboard and make informed decisions." },
              { question: "Is it free?", answer: "Yes, Our current version is totally free for all to try and test." }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(index)}>
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <FontAwesomeIcon icon={faqOpen[index] ? faChevronUp : faChevronDown} />
                </div>
                {faqOpen[index] && <p className="mt-2 text-lg">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="w-full h-screen flex flex-col items-center justify-center py-20 bg-blue-100">
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <div className="mt-4 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
            ))}
          </div>
          <div className="mt-8 max-w-2xl text-center">
            <p className="text-lg">"This tool has transformed the way we track our research reports!"</p>
            <p className="mt-4 text-sm text-gray-600">- Anonymous, Founder of NPO</p>
          </div>
          <div className="mt-8 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
            ))}
          </div>
          <div className="mt-8 max-w-2xl text-center">
            <p className="text-lg">"Updates in realtime. Excellent for sharing early drafts of stories."</p>
            <p className="mt-4 text-sm text-gray-600">- Anonymous, Author</p>
          </div>
        </section>
      </main>

      <footer className="w-full bg-black py-4">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          &copy; 2025 Doozie. All rights reserved.
        </div>
      </footer>
    </>
  );
}