export default function VariantButton({ animation, text, ...props }) {
  if (animation)
    return (
      <div>
        <button disabled>
          {" "}
          <div className="lds-dual-ring"></div>
        </button>

        <style jsx>{`
          button {
            min-width: 320px;
            max-width: 675px;
            height: 55px;
            flex-shrink: 0;
            border-radius: 10px;
            background: var(--Text, #fff);
            border-color: transparent;

            color: var(--Background, #121214);
            text-align: center;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            font-family: inherit;
            cursor: pointer;
            width: 675px;

            transition: background-color 0.2s ease-in-out;
          }

          @media only screen and (max-width: 600px) {
            button {
              width: 90vw;
            }
          }

          .lds-dual-ring {
            display: inline-block;
            width: 20px;
            height: 20px;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 16px;
            height: 16px;
            margin: 2px;
            border-radius: 50%;
            border: 2px solid #fff;
            border-color: #000 transparent #000 transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }

          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          button:hover {
            background: var(--Background, #9a9a9a);
          }

          button:disabled {
            background: var(--Background, #9a9a9a);
            cursor: not-allowed;
          }
        `}</style>
      </div>
    );

  return (
    <div>
      <button {...props} disabled={props.disabled}>
        {text}
      </button>

      <style jsx>{`
        button {
          min-width: 320px;
          max-width: 675px;
          height: 55px;
          flex-shrink: 0;
          border-radius: 10px;
          background: var(--Text, #fff);
          border-color: transparent;

          color: var(--Background, #121214);
          text-align: center;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          font-family: inherit;
          cursor: pointer;
          width: 675px;

          transition: background-color 0.2s ease-in-out;
        }

        @media only screen and (max-width: 600px) {
          button {
            width: 90vw;
          }
        }

        button:hover {
          background: var(--Background, #9a9a9a);
        }

        button:disabled {
          background: var(--Background, #9a9a9a);
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
