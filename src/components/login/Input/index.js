import { Binoculars } from "@phosphor-icons/react";

export default function DefaultInput({ ...props }) {
  return (
    <div>
      <div className="container">
        <input {...props} />
      </div>

      <style jsx>{`
        .container {
          min-width: 320px;
          max-width: 370px;
          height: 55px;
          flex-shrink: 0;
          border-radius: 10px;
          background: #1d1d20;
          border-color: transparent;
          border-width: 0px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #9a9a9a;
          text-align: left;
          font-size: 18px;
          font-style: normal;
          font-weight: normal;
          line-height: normal;
          font-family: inherit;
          width: 675px;

          gap: 8px;

          transition: background-color 0.2s ease-in-out;
        }

        .container input {
          padding: 0;
          padding-left: 16px;
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;
          background: #1d1d20;
          border-color: transparent;
          border-width: 0px;
          border-radius: 10px;

          color: white;
          text-align: left;
          font-size: 18px;
          font-style: normal;
          font-weight: normal;
          line-height: normal;
          font-family: inherit;
        }

        input::placeholder {
          color: #9a9a9a;
        }

        input:focus {
          outline: solid;
          outline-color: #3d3d3d;
          outline-width: 1px;
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
