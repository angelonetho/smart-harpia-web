export default function Pagination({ page, setPage }) {
  return (
    <>
      <div className="pagination">
        <p>Página {page} </p>
        <button onClick={() => setPage(1)}>ínicio</button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>

        <button onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
      <style jsx>{`
        h1,
        p {
          color: var(--Text, #fff);
          text-align: center;
          margin-top: 32px;
          margin-bottom: 16px;
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          user-select: none;
        }

        p {
          font-weight: normal;
        }

        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          gap: 16px;
        }

        .pagination {
          margin: 16px;
        }

        .pagination p {
          margin-top: 0px;
        }

        button {
          height: 35px;

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
          margin-right: 8px;

          cursor: pointer;
          user-select: none;

          transition: background-color 0.2s ease-in-out;
        }

        button:hover {
          background: #004fa3;
        }

        button:disabled {
          background: #004fa3;
        }
      `}</style>
    </>
  );
}
