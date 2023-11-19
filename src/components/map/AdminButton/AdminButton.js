import Link from "next/link";

export default function AdminButton() {
  return (
    <div>
      <div className="container">
        <Link href="/institutions">
          <button>Administrar</button>
        </Link>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          top: 30px;
          right: 90px;
          cursor: pointer;
          user-select: none;
        }

        button {
          background: #00a367;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          font-size: 16px;

          gap: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button:hover {
          background: black;
        }
      `}</style>
    </div>
  );
}
