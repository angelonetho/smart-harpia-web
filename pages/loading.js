export default function Loading() {
  return (
    <>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .ping {
          --uib-size: 50px;
          --uib-speed: 1s;
          --uib-color: #00b37e;
          position: relative;
          height: var(--uib-size);
          width: var(--uib-size);
        }

        .ping::before,
        .ping::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background-color: var(--uib-color);
          animation: pulse7132 var(--uib-speed) linear infinite;
          transform: scale(0);
          opacity: 0;
        }

        .ping::after {
          animation-delay: calc(var(--uib-speed) / -2);
        }

        @keyframes pulse7132 {
          0% {
            transform: scale(0);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
      <div className="loading-container">
        <div className="ping"></div>
      </div>
    </>
  );
}
