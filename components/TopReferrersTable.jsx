import React from "react";

const TopReferrersTable = ({ data }) => {
  // Sort data to show top referrers
  const sortedData = data.sort((a, b) => b.count - a.count).slice(0, 10);
  const totalCount = sortedData.reduce((sum, referrer) => sum + referrer.count, 0);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="flex mb-4 py-3 px-5 border-b-2 border-gray-300 justify-between bg-gray-100 rounded-lg">
          <div className="leading-tight font-semibold text-gray-700">Referrer</div>
          <div className="leading-tight font-semibold text-gray-700">Count</div>
        </div>
        {sortedData.map((referrer) => (
          <div
            key={referrer.referrer}
            className="flex py-3 px-5 border-b border-gray-200 justify-between mx-2 rounded-lg shadow-sm bg-white mb-4"
            style={{
              background: `linear-gradient(to right, #6baed6 ${(
                (referrer.count / totalCount) * 100
              ).toFixed(2)}%, transparent 0%)`,
            }}
          >
            <div className="text-left text-gray-800">{referrer.referrer}</div>
            <div className="text-right text-gray-800">{referrer.count.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopReferrersTable;
