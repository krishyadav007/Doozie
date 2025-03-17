import { useEffect } from "react";
import * as d3 from "d3";

import useChartDimensions from "../hooks/useChartDimensions";

const marginTop = 30;
const marginBottom = 70;
const marginLeft = 200; // Increased margin for labels
const marginRight = 25;

const TopPagesBarChart = ({ height, data }) => {
  // Sort data to show top pages
  const sortedData = data.sort((a, b) => b.views - a.views).slice(0, 10);

  const [ref, dms] = useChartDimensions({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  });
  const width = dms.width;
  const chartBottomY = height - marginBottom;

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleBand()
    .domain(sortedData.map((d) => d.page))
    .range([marginTop, chartBottomY])
    .padding(0.3);

  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

  // Create the horizontal scale and its axis generator.
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(sortedData, (d) => d.views)])
    .nice()
    .range([marginLeft, width - marginRight]);

  const xAxis = d3.axisBottom(xScale);

  useEffect(() => {
    d3.select(ref.current).select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px");
    d3.select(ref.current).select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis]);

  return (
    <div
      ref={ref}
      style={{
        height,
      }}
      className="container"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {sortedData.map((d) => (
            <rect
              key={d.page}
              y={yScale(d.page)}
              x={marginLeft}
              height={yScale.bandwidth()}
              width={xScale(d.views) - marginLeft}
              fill="#6baed6"
            />
          ))}
        </g>
        <g className="labels">
          {sortedData.map((d) => (
            <text
              key={d.page}
              y={yScale(d.page) + yScale.bandwidth() / 2}
              x={xScale(d.views) + 5}
              textAnchor="start"
              alignmentBaseline="middle"
              fontSize={14}
              style={{ overflow: "visible" }} // Ensure label is fully visible
            >
              {d.views.toLocaleString()}
            </text>
          ))}
        </g>
        <g className="x-axis" transform={`translate(0,${chartBottomY})`}></g>
        <g className="y-axis" transform={`translate(${marginLeft},0)`}></g>
        {/* X-axis label */}
        <text
          transform={`translate(${width / 2},${height - marginBottom / 2})`}
          textAnchor="middle"
          fontSize={16}
        >
          Views
        </text>
        {/* Y-axis label */}
        <text
          transform={`translate(${marginLeft / 2},${height / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={16}
        >
          Pages
        </text>
      </svg>
    </div>
  );
};

export default TopPagesBarChart;
