export default function SmallDefaultButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>Visualizar</button>

      <style jsx>{`
        button {
          display: flex;
          width: 100%;
          height: 35px;
          flex-direction: column;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 10px;
          border-color: transparent;
          background: var(--Accent, #006ce0);

          color: var(--Text, #fff);
          text-align: center;

          font-family: inherit;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding: 0 12px;

          cursor: pointer;

          transition: background-color 0.2s ease-in-out;
        }

        button:hover {
          background: #004fa3;
        }
      `}</style>
    </div>
  );
}
