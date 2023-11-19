import { useState } from "react";

export default function SwitchInput({ placeholder, ...props }) {
  return (
    <div>
      <div className="container">
        <p>{placeholder}</p>
        <label className="switch">
          <input {...props} type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          width: 675px;
          height: 55px;
          justify-content: space-between;
          align-items: center;
        }

        p {
          padding-left: 16px;
          color: #fff;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .switch {
          --button-width: 3.5em;
          --button-height: 2em;
          --toggle-diameter: 1.5em;
          --button-toggle-offset: calc(
            (var(--button-height) - var(--toggle-diameter)) / 2
          );
          --toggle-shadow-offset: 10px;
          --toggle-wider: 3em;
          --color-grey: #cccccc;
          --color-green: #4296f4;

          cursor: pointer;
        }

        .slider {
          display: inline-block;
          width: var(--button-width);
          height: var(--button-height);
          background-color: var(--color-grey);
          border-radius: calc(var(--button-height) / 2);
          position: relative;
          transition: 0.3s all ease-in-out;
        }

        .slider::after {
          content: "";
          display: inline-block;
          width: var(--toggle-diameter);
          height: var(--toggle-diameter);
          background-color: #fff;
          border-radius: calc(var(--toggle-diameter) / 2);
          position: absolute;
          top: var(--button-toggle-offset);
          transform: translateX(var(--button-toggle-offset));
          box-shadow: var(--toggle-shadow-offset) 0
            calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
          transition: 0.3s all ease-in-out;
        }

        .switch input[type="checkbox"]:checked + .slider {
          background-color: var(--color-green);
        }

        .switch input[type="checkbox"]:checked + .slider::after {
          transform: translateX(
            calc(
              var(--button-width) - var(--toggle-diameter) -
                var(--button-toggle-offset)
            )
          );
          box-shadow: calc(var(--toggle-shadow-offset) * -1) 0
            calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        }

        .switch input[type="checkbox"] {
          display: none;
        }

        .switch input[type="checkbox"]:active + .slider::after {
          width: var(--toggle-wider);
        }

        .switch input[type="checkbox"]:checked:active + .slider::after {
          transform: translateX(
            calc(
              var(--button-width) - var(--toggle-wider) -
                var(--button-toggle-offset)
            )
          );
        }

        @media only screen and (max-width: 600px) {
          .container {
            width: 90vw;
          }
        }
      `}</style>
    </div>
  );
}
