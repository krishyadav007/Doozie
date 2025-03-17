'use client'

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import Legend from "./Legend";
import useChartDimensions from "../hooks/useChartDimensions";
const to3 = {
    "AF":"AFG",
    "AL":"ALB",
    "DZ":"DZA",
    "AS":"ASM",
    "AD":"AND",
    "AO":"AGO",
    "AI":"AIA",
    "AQ":"ATA",
    "AG":"ATG",
    "AR":"ARG",
    "AM":"ARM",
    "AW":"ABW",
    "AU":"AUS",
    "AT":"AUT",
    "AZ":"AZE",
    "BS":"BHS",
    "BH":"BHR",
    "BD":"BGD",
    "BB":"BRB",
    "BY":"BLR",
    "BE":"BEL",
    "BZ":"BLZ",
    "BJ":"BEN",
    "BM":"BMU",
    "BT":"BTN",
    "BO":"BOL",
    "BQ":"BES",
    "BA":"BIH",
    "BW":"BWA",
    "BV":"BVT",
    "BR":"BRA",
    "IO":"IOT",
    "BN":"BRN",
    "BG":"BGR",
    "BF":"BFA",
    "BI":"BDI",
    "CV":"CPV",
    "KH":"KHM",
    "CM":"CMR",
    "CA":"CAN",
    "KY":"CYM",
    "CF":"CAF",
    "TD":"TCD",
    "CL":"CHL",
    "CN":"CHN",
    "CX":"CXR",
    "CC":"CCK",
    "CO":"COL",
    "KM":"COM",
    "CD":"COD",
    "CG":"COG",
    "CK":"COK",
    "CR":"CRI",
    "HR":"HRV",
    "CU":"CUB",
    "CW":"CUW",
    "CY":"CYP",
    "CZ":"CZE",
    "CI":"CIV",
    "DK":"DNK",
    "DJ":"DJI",
    "DM":"DMA",
    "DO":"DOM",
    "EC":"ECU",
    "EG":"EGY",
    "SV":"SLV",
    "GQ":"GNQ",
    "ER":"ERI",
    "EE":"EST",
    "SZ":"SWZ",
    "ET":"ETH",
    "FK":"FLK",
    "FO":"FRO",
    "FJ":"FJI",
    "FI":"FIN",
    "FR":"FRA",
    "GF":"GUF",
    "PF":"PYF",
    "TF":"ATF",
    "GA":"GAB",
    "GM":"GMB",
    "GE":"GEO",
    "DE":"DEU",
    "GH":"GHA",
    "GI":"GIB",
    "GR":"GRC",
    "GL":"GRL",
    "GD":"GRD",
    "GP":"GLP",
    "GU":"GUM",
    "GT":"GTM",
    "GG":"GGY",
    "GN":"GIN",
    "GW":"GNB",
    "GY":"GUY",
    "HT":"HTI",
    "HM":"HMD",
    "VA":"VAT",
    "HN":"HND",
    "HK":"HKG",
    "HU":"HUN",
    "IS":"ISL",
    "IN":"IND",
    "ID":"IDN",
    "IR":"IRN",
    "IQ":"IRQ",
    "IE":"IRL",
    "IM":"IMN",
    "IL":"ISR",
    "IT":"ITA",
    "JM":"JAM",
    "JP":"JPN",
    "JE":"JEY",
    "JO":"JOR",
    "KZ":"KAZ",
    "KE":"KEN",
    "KI":"KIR",
    "KP":"PRK",
    "KR":"KOR",
    "KW":"KWT",
    "KG":"KGZ",
    "LA":"LAO",
    "LV":"LVA",
    "LB":"LBN",
    "LS":"LSO",
    "LR":"LBR",
    "LY":"LBY",
    "LI":"LIE",
    "LT":"LTU",
    "LU":"LUX",
    "MO":"MAC",
    "MG":"MDG",
    "MW":"MWI",
    "MY":"MYS",
    "MV":"MDV",
    "ML":"MLI",
    "MT":"MLT",
    "MH":"MHL",
    "MQ":"MTQ",
    "MR":"MRT",
    "MU":"MUS",
    "YT":"MYT",
    "MX":"MEX",
    "FM":"FSM",
    "MD":"MDA",
    "MC":"MCO",
    "MN":"MNG",
    "ME":"MNE",
    "MS":"MSR",
    "MA":"MAR",
    "MZ":"MOZ",
    "MM":"MMR",
    "NA":"NAM",
    "NR":"NRU",
    "NP":"NPL",
    "NL":"NLD",
    "NC":"NCL",
    "NZ":"NZL",
    "NI":"NIC",
    "NE":"NER",
    "NG":"NGA",
    "NU":"NIU",
    "NF":"NFK",
    "MP":"MNP",
    "NO":"NOR",
    "OM":"OMN",
    "PK":"PAK",
    "PW":"PLW",
    "PS":"PSE",
    "PA":"PAN",
    "PG":"PNG",
    "PY":"PRY",
    "PE":"PER",
    "PH":"PHL",
    "PN":"PCN",
    "PL":"POL",
    "PT":"PRT",
    "PR":"PRI",
    "QA":"QAT",
    "MK":"MKD",
    "RO":"ROU",
    "RU":"RUS",
    "RW":"RWA",
    "RE":"REU",
    "BL":"BLM",
    "SH":"SHN",
    "KN":"KNA",
    "LC":"LCA",
    "MF":"MAF",
    "PM":"SPM",
    "VC":"VCT",
    "WS":"WSM",
    "SM":"SMR",
    "ST":"STP",
    "SA":"SAU",
    "SN":"SEN",
    "RS":"SRB",
    "SC":"SYC",
    "SL":"SLE",
    "SG":"SGP",
    "SX":"SXM",
    "SK":"SVK",
    "SI":"SVN",
    "SB":"SLB",
    "SO":"SOM",
    "ZA":"ZAF",
    "GS":"SGS",
    "SS":"SSD",
    "ES":"ESP",
    "LK":"LKA",
    "SD":"SDN",
    "SR":"SUR",
    "SJ":"SJM",
    "SE":"SWE",
    "CH":"CHE",
    "SY":"SYR",
    "TW":"TWN",
    "TJ":"TJK",
    "TZ":"TZA",
    "TH":"THA",
    "TL":"TLS",
    "TG":"TGO",
    "TK":"TKL",
    "TO":"TON",
    "TT":"TTO",
    "TN":"TUN",
    "TR":"TUR",
    "TM":"TKM",
    "TC":"TCA",
    "TV":"TUV",
    "UG":"UGA",
    "UA":"UKR",
    "AE":"ARE",
    "GB":"GBR",
    "UM":"UMI",
    "US":"USA",
    "UY":"URY",
    "UZ":"UZB",
    "VU":"VUT",
    "VE":"VEN",
    "VN":"VNM",
    "VG":"VGB",
    "VI":"VIR",
    "WF":"WLF",
    "EH":"ESH",
    "YE":"YEM",
    "ZM":"ZMB",
    "ZW":"ZWE",
    "AX":"ALA"
    }
const WorldMap = ({ height, data }) => {
  // Transform visitors data
  const visitors = data.visitors.reduce((acc, { country, count }) => {
    acc[to3[country]] = count;
    return acc;
  }, {});
  const topography = data.topography;

  const [ref, dms] = useChartDimensions({});
  const width = dms.width;

  const chartRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    name: "",
    visitors: "",
    x: 0,
    y: 0,
  });

  // Map and projection
  const path = d3.geoPath();
  const projection = d3
    .geoMercator()
    .scale(85)
    .center([0, 30])
    .translate([width / 2, height / 2]);

  const pathGenerator = path.projection(projection);

  // Color scale
  const colorScale = d3
    .scaleThreshold()
    .domain([1, 10, 50, 100, 500, 1000])
    .range(d3.schemeBlues[7]);

  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on("zoom", (event) => {
      const { transform } = event;
      setMapStyle({
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
        strokeWidth: 1 / transform.k,
      });
    });

  function reset() {
    const svg = d3.select(chartRef.current);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
  }

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.call(zoom);
  }, [zoom]);

  return (
    <div
      ref={ref}
      style={{
        height,
      }}
      className="container"
    >
      <svg
        ref={chartRef}
        className="viz"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onClick={() => reset()}
      >
        <g className="topography" style={mapStyle}>
          {topography.features.map((d) => (
            <path
              key={d.id}
              d={pathGenerator(d)}
              fill={colorScale(visitors[d.id] || 0)}
              stroke="#FFFFFF"
              cool={d.id}
            //   to3()
              strokeWidth={0.3}
              onMouseEnter={() => {
                setTooltipVisible(true);
              }}
              onMouseLeave={() => {
                setTooltipVisible(false);
              }}
              onMouseMove={(event) => {
                const visitorCount = (
                  visitors[d.properties.name] || "N/A"
                ).toLocaleString();

                // get x and y position relative to the chart
                const [x, y] = d3.pointer(event, chartRef.current);

                setTooltipData({
                  name: d.properties.name,
                  id: d.id,
                  visitors: visitors[d.id],
                  left: x - 30,
                  top: y - 80,
                });
              }}
            />
          ))}
        </g>

        {/* Legend */}
        <g className="legend" transform="translate(10,10)">
          <Legend
            color={colorScale}
            width={height / 1.4}
            tickFormat={d3.format("~s")}
          />
        </g>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <div
          className={`tooltip ${tooltipVisible ? "visible" : ""}`}
          style={{
            left: tooltipData.left,
            top: tooltipData.top,
          }}
        >
          {tooltipData.name}
          <br />
          {tooltipData.visitors}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
