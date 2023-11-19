import { Binoculars } from "@phosphor-icons/react";

export default function SearchInput({ ...props }) {
  return (
    <div>
      <div {...props.style} className="container">
        <div className="icon">
          <Binoculars size={24} color="#9A9A9A" />
        </div>

        <input {...props} type="text" placeholder="Buscar" />
      </div>

      <style jsx>{`
        .container {
          min-width: 320px;
          max-width: 675px;
          height: 55px;
          flex-shrink: 0;
          border-radius: 10px;
          background: #1d1d20;
          border-color: transparent;

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

        .icon {
          padding-left: 16px;
          padding-right: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container input {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;
          background: transparent;
          border-color: transparent;

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
          outline: none;
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
