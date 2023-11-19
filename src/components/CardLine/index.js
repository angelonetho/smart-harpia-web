import Link from "next/link";
import SmallDefaultButton from "../buttons/small/Default";

export default function CardLine({ title, isActive, href, ...props }) {
  return (
    <div>
      <div className="container">
        <h1>{title}</h1>
        {isActive !== undefined && (
          <div className="status">
            {isActive ? (
              <div className="status">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle cx="4" cy="4" r="4" fill="#55FF55" />
                </svg>
                <p>Operante</p>
              </div>
            ) : (
              <div className="status">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <circle cx="4" cy="4" r="4" fill="#FF5555" />
                </svg>
                <p>Inoperante</p>
              </div>
            )}
          </div>
        )}

        <div className="action">
          <Link href={href}>
            <SmallDefaultButton />
          </Link>
        </div>
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
          justify-content: space-between;
          gap: 16px;
          align-items: center;

          width: 675px;

          user-select: none;

          -webkit-animation: scale-in-center 0.5s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }

        .status {
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: center;
        }

        .action {
          padding-right: 16px;
        }

        h1 {
          color: var(--Text, #fff);
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          padding-left: 16px;
          width: 50%;
          max-height: 55px;
          display: block;
          overflow: hidden;
          word-wrap: break-word;
          text-overflow: ellipsis;
        }

        p {
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        @media only screen and (max-width: 600px) {
          .container {
            width: 90vw;
          }

          h1 {
            font-size: 14px;
          }
        }

        @-webkit-keyframes scale-in-center {
          0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 1;
          }
          100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes scale-in-center {
          0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 1;
          }
          100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
