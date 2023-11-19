import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import getVendor from "mac-oui-lookup";

export default function DeviceInfo({ macAddress, ...props }) {
  const [isHovered, setHovered] = useState(false);

  const vendor = getVendor(macAddress);

  return (
    vendor && (
      <div
        className="question-mark"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MagnifyingGlass size={32} />
        {isHovered && <div className="tooltip">Fornecedor: {vendor}</div>}
        <style jsx>{`
          .question-mark {
            position: relative;
            display: inline-block;
            cursor: help;
            color: white;
            margin-right: 8px;
          }

          .tooltip {
            position: absolute;
            top: 20px; /* Adjust the top position as needed */
            left: 0px;
            background-color: #1d1d20;
            color: #fff;
            padding: 10px;
            border-radius: 10px;
            display: inline-block;
            white-space: nowrap;

            font-size: 14px;
          }
        `}</style>
      </div>
    )
  );
}
