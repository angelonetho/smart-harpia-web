import Button from "./Button";

function VideoContainer() {
  return (
    <div className="container">
      <div className="video-container">
        <div className="overlay"></div>

        <video autoPlay muted loop>
          <source
            src="https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/jt/JTHQGPVE1AOZ1694023148831.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="test">
        <h1 className="text-focus-in">Smart Harpia</h1>
        <p>Tornando o invisível visível</p>

        <Button href={"/login"}>ENTRE AGORA</Button>
      </div>

      <style jsx>{`
        h1 {
          color: white;
          font-size: 6.5rem;
          font-weight: bolder;
          z-index: 1;
          user-select: none;
        }

        p {
          color: white;
          font-size: 3rem;
          user-select: none;
        }

        .container {
          min-height: 100vh; /* Define uma altura mínima para a tela inteira */
          position: relative;
        }

        .test {
          text-align: center;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          min-width: 1024px;
          align-items: center;
        }

        .text-focus-in {
          animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
        }

        .video-container {
          position: relative;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }

        video {
          width: 100%;
          height: 960px;
          object-fit: cover;
        }

        @keyframes text-focus-in {
          0% {
            filter: blur(12px);
            opacity: 0;
          }
          100% {
            filter: blur(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default VideoContainer;
