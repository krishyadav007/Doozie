import React from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = ({ data }) => {
  return (
    <header className="fixed right-0 top-0 left-0 bg-yellow-50 py-3 px-4 h-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition mr-2">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                <span className="text-sm">Home</span>
            </Link>
          </div>
          <div className="text-lg font-bold">Doozie</div>
          <div>
            <Link href="https://x.com/KrishRYadav" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
                <span className="text-sm">Creator</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                  <FontAwesomeIcon icon={faUser} />
                </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
