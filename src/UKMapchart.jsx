// src/UKMapChart.jsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";

// Path to your UK GeoJSON file (in public/ folder)
const geoUrl = "/uk-region.geojson";

// Distinct colors for each region
const regionColors = {
  ENG: "#1f77b4", // Blue
  SCT: "#ff7f0e", // Orange
  WLS: "#2ca02c", // Green
  NIR: "#d62728", // Red
  default: "#ccc" // fallback color
};

export default function UKMapChart({ regionData }) {
  // regionData example: { ENG: 60, SCT: 20, WLS: 15, NIR: 5 }

  return (
    // We use flex-col so we can have a legend on top and the map below
    <div className="flex flex-col w-full h-full">
      {/* Legend row at the top (no container size or map size changed) */}
      <div className="flex flex-row justify-center items-center mb-0">
        {/* England Legend */}
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 mr-1" style={{ backgroundColor: regionColors.ENG }} />
          <span>England</span>
        </div>
        {/* Scotland Legend */}
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 mr-1" style={{ backgroundColor: regionColors.SCT }} />
          <span>Scotland</span>
        </div>
        {/* Wales Legend */}
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 mr-1" style={{ backgroundColor: regionColors.WLS }} />
          <span>Wales</span>
        </div>
        {/* Northern Ireland Legend */}
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1" style={{ backgroundColor: regionColors.NIR }} />
          <span>N. Ireland</span>
        </div>
      </div>

      {/* Map container fills the remaining space */}
      <div className="flex-1 relative -mt-[95px]">
        {/* Keep your rotation and scale unchanged */}
        <div className="transform rotate-[112deg] origin-center w-full h-full">
          <ComposableMap
            style={{ width: "100%", height: "100%" }}
            projection="geoMercator"
            projectionConfig={{ scale: 1500, center: [-2, 55] }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies, projection }) =>
                geographies.map((geo) => {
                  // "CTRY21NM" property => "England", "Scotland", "Wales", "Northern Ireland"
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

                  // Color & percentage logic
                  const value = regionKey ? parseFloat(regionData[regionKey]) || 0 : 0;
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
                            fontSize: "12px",
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
