import { useRouter } from "next/router";
import { X } from "@phosphor-icons/react";
import Link from "next/link";

export default function PopupCard({ mdev, onClose, user }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="container">
        <span className="closeIcon" onClick={handleClose}>
          <X size={20} />
        </span>

        <h1>{mdev.name}</h1>
        <h2>
          Lat: {mdev.latitude} Long:{mdev.longitude}
        </h2>
        <h2></h2>
        <div className="buttons">
          <Link
            href={`/institutions/${user.institution_id}/locals/${mdev.local_id}/mdevs/${mdev.id}`}
          >
            <button>Detalhes</button>
          </Link>
          <Link
            href={`/institutions/${user.institution_id}/locals/${mdev.local_id}/mdevs/${mdev.id}/report-page`}
          >
            <button>Relatório</button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          margin-top: 16px;
          right: 0px;
          padding: 20px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          width: 260px;
          border: 1px solid rgba(0, 0, 0, 0.25);
          translate: 88px;

          background-color: rgba(29, 29, 32, 0.7);
          backdrop-filter: blur(10px);
        }

        .image {
          width: 64px;
          height: 64px;

          cursor: pointer;
          user-select: none;

          border-radius: 50%;
          border: 2px solid transparent;
          box-shadow: 0px 0px 5px 2px #50c878;
          display: block;
          margin: auto;
        }

        h1,
        h2 {
          color: var(--Text, #fff);
          text-align: center;
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          user-select: none;
        }

        h2 {
          font-size: 14px;
          color: #9a9a9a;
        }

        .closeIcon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          font-size: 20px;
          color: white;
          transition: background-color 0.3s ease-in-out;
        }

        .closeIcon:hover {
          color: #9a9a9a;
        }

        .buttons {
          justify-content: center;
          display: flex;
          gap: 8px;
        }

        button {
          background: #006ce0;
          color: #ffffff;
          border: none;
          border-radius: 7px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.1s ease-in-out;
        }

        button:hover {
          background: #004fa3;
        }
      `}</style>
    </>
  );
}
