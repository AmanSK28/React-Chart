// src/UKMapChart.jsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";

const geoUrl = "/uk-region.geojson";

const regionColors = {
  ENG: "#1f77b4",
  SCT: "#ff7f0e",
  WLS: "#2ca02c",
  NIR: "#d62728",
  default: "#ccc",
};

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-xs sm:text-sm text-gray-800">{label}</span>
    </div>
  );
}

export default function UKMapChart({ regionData }) {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 640;

  // Bigger overall (tuned to still fit phones/tablets)
  const projectionScale = isSmall ? 1350 : 1750;

  return (
    <div className="flex flex-col w-full h-full min-w-0">
      {/* Legend wraps so it never overlaps */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pb-2">
        <LegendItem color={regionColors.ENG} label="England" />
        <LegendItem color={regionColors.SCT} label="Scotland" />
        <LegendItem color={regionColors.WLS} label="Wales" />
        <LegendItem color={regionColors.NIR} label="N. Ireland" />
      </div>

      {/* Map takes remaining space */}
      <div className="relative w-full min-w-0 flex-1">
        <div className="w-full h-full transform rotate-[112deg] origin-center">
          <ComposableMap
            style={{ width: "100%", height: "100%" }}
            projection="geoMercator"
            projectionConfig={{ scale: projectionScale, center: [-2, 55] }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies, projection }) =>
                geographies.map((geo) => {
                  const regionName = geo.properties.CTRY21NM;
                  let regionKey = "";

                  switch (regionName) {
                    case "England":
                      regionKey = "ENG";
                      break;
                    case "Scotland":
                      regionKey = "SCT";
                      break;
                    case "Wales":
                      regionKey = "WLS";
                      break;
                    case "Northern Ireland":
                      regionKey = "NIR";
                      break;
                    default:
                      regionKey = "";
                  }

                  const value = regionKey ? parseFloat(regionData?.[regionKey]) || 0 : 0;
                  const fillColor = regionKey
                    ? regionColors[regionKey] || regionColors.default
                    : regionColors.default;

                  const centroid = projection(geoCentroid(geo));

                  return (
                    <React.Fragment key={geo.rsmKey}>
                      <Geography
                        geography={geo}
                        fill={fillColor}
                        stroke="#FFFFFF"
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#FFCDD2", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />

                      {centroid && value > 0 && (
                        <text
                          x={centroid[0]}
                          y={centroid[1]}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          style={{
                            fontSize: isSmall ? "12px" : "14px",
                            fill: "#000",
                            pointerEvents: "none",
                            fontWeight: "bold",
                          }}
                        >
                          {`${value.toFixed(2)}%`}
                        </text>
                      )}
                    </React.Fragment>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}