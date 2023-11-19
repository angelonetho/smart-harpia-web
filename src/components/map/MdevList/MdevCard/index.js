import Link from "next/link";
import { useMap } from "react-map-gl";

export default function MdevCard({ mdev, user }) {
  function NavigateButton({ mdev, ...props }) {
    const { current: map } = useMap();

    const onClick = () => {
      map.flyTo({ center: [mdev.longitude, mdev.latitude] });
    };

    return (
      <button {...props} onClick={onClick}>
        <span>&#10132;</span>
      </button>
    );
  }

  if (!mdev.image_path) {
    mdev.image_path =
      "https://th.bing.com/th/id/OIG.mbwK1QVfxYaroYdvebrO?pid=ImgGn";
  }

  return (
    <>
      <div className="container">
        <img src={mdev.image_path} alt={mdev.name} />
        <div className="contentStyle">
          <h1>{mdev.name}</h1>
          <Link
            href={`/institutions/${user.institution_id}/locals/${mdev.local_id}/mdevs/${mdev.id}`}
          >
            <a className="link">Detalhes</a>
            {""}
          </Link>
          <Link
            href={`/institutions/${user.institution_id}/locals/${mdev.local_id}/mdevs/${mdev.id}/records`}
          >
            <a className="link">Registros</a>
            {""}
          </Link>
        </div>
        <NavigateButton className="buttonStyle" mdev={mdev} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #303036;
          border-radius: 10px;
          margin: 8px 0;
          padding: 0 10px;
          width: 298px;
          background-color: #1d1d20;
          -webkit-animation: scale-in-center 0.5s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }

        img {
          width: 52px;
          height: 52px;
          margin-right: 10px;
          border-radius: 50%;
        }

        h1 {
          font-size: 18px;
          max-width: 200px;
          overflow: wrap;
          word-break: break-all;
          word-wrap: break-word;
        }

        .contentStyle {
          padding: 10px;
          margin: 5px;
          flex-grow: 1;
        }

        .link {
          margin-right: 0.5rem;
          text-decoration: none;
          color: #9a9a9a;
          font-size: 14px;
        }

        .buttonStyle {
          background-color: #006ce0;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 16px;
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
    </>
  );
}
