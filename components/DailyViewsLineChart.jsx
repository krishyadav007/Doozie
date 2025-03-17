import { useEffect } from "react";
import { Line } from "react-chartjs-2";

const DailyViewsLineChart = ({ data }) => {
  const dailyViewsData = {
    labels: data.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Views',
        data: data.map((entry) => entry.views),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mb-8">
      <Line data={dailyViewsData} />
    </div>
  );
};

export default DailyViewsLineChart;
