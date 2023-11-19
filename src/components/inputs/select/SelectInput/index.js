export default function SelectInput({ ...props }) {
  return (
    <div>
      <div className="container">
        <select {...props} required />
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

        .container select {
          padding: 0;
          padding-left: 16px;

          margin-right: 16px;
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

        select:focus {
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
