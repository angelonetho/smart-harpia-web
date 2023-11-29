import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useRouter } from "next/router";
import { X } from "@phosphor-icons/react";
import { useState } from "react";

export default function DevicesTable({ mdev, onClose, user }) {
  const router = useRouter();

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/logs/mdev/${mdev.id}?realtime=true`,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="container">
      <span className="closeIcon" onClick={handleClose}>
        <X size={20} />
      </span>
      <div className="title">
        <h1>
          {data.mdev.logs.length === 1
            ? `${data.mdev.logs.length} Dispositivo detectado`
            : data.mdev.logs.length > 1
            ? `${data.mdev.logs.length} Dispositivos detectados`
            : "Nenhum dispositivo detectado"}
        </h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="tableHeader">Nome</th>
            <th className="tableHeader">Entrada</th>
          </tr>
        </thead>
        <tbody>
          {data.mdev.logs.map((item) => (
            <tr key={item.id}>
              <td
                className="tableCellDevice"
                onClick={() =>
                  router.push(
                    `/institutions/${user.institutionId}/locals/${mdev.localId}/mdevs/${mdev.id}/devices/${item.device.id}`
                  )
                }
              >
                {(!item.device.name && `Dispositivo ${item.device.id}`) ||
                  item.device.name}
              </td>
              <td className="tableCell">
                {formatDistanceToNow(new Date(item.entered_at), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          position: absolute;
          top: 100px;
          right: 10px;
          background-color: rgba(29, 29, 32, 0.9);
          backdrop-filter: blur(10px);
          padding: 8px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          color: white;
          max-height: 520px;
          user-select: none;
          overflow-x: hidden;
        }

        .closeIcon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          color: white;
          transition: background-color 0.3s ease-in-out;
        }

        .closeIcon:hover {
          color: #9a9a9a;
        }

        .title {
          font-size: 18px;
          margin: 8px 32px;

          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          color: white;
        }

        th {
          background-color: transparent;
          padding: 10px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
        }

        td {
          padding: 10px;
          word-break: break-all;
          word-wrap: break-word;
          width: 32px;
          max-height: 36px;
          text-align: center;
          font-size: 13px;

          color: #9a9a9a;
        }

        .tableCellDevice {
          color: #50c878;
          cursor: pointer;
        }

        /* Estiliza a scrollbar */
        .container::-webkit-scrollbar {
          width: 12px; /* Largura da scrollbar */
        }

        .container::-webkit-scrollbar-track {
          background-color: rgba(
            29,
            29,
            32,
            0.3
          ); 
          border-radius: 10px; 
        }

        .container::-webkit-scrollbar-thumb {
          background-color: #50c878; 
          border-radius: 10px; 
          border: 3px solid rgba(29, 29, 32, 0.3); 
        }

        .container::-webkit-scrollbar-thumb:hover {
          background-color: #407959; /
        }
      `}</style>
    </div>
  );
}
