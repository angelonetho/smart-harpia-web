import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tokenService } from "../../../../../../../../src/services/auth/tokenService";
import { HttpClient } from "../../../../../../../../src/infra/HttpClient/HttpClient";
import { format } from "date-fns";
import Loading from "../../../../../../../loading";
import SearchInput from "../../../../../../../../src/components/inputs/SearchInput";
import Pagination from "../../../../../../../../src/components/Pagination";
import SwitchInput from "../../../../../../../../src/components/inputs/Switch";
import { Divide } from "@phosphor-icons/react";

export default function Logs() {
  const [data, setData] = useState(null);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [realtime, setRealtime] = useState(false);

  const handleRealtime = () => {
    setRealtime(!realtime);
  };

  const router = useRouter();
  const parameter = router.query.mdevId;
  const localId = router.query.localId;
  const id = router.query.id;

  function verifyDevicesName(logs) {
    const updatedLogs = logs.map((log) => {
      if (!log.device.name) {
        log.device.name = `Dispositivo ${log.device.id}`;
      }
      return log;
    });
    return updatedLogs;
  }

  useEffect(() => {
    if (!parameter) return;
    setData(null);
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/logs/mdev/${parameter}?realtime=${realtime}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(({ body }) => {
      const data = body.logs;

      const updatedData = verifyDevicesName(data);

      setData(updatedData);
    });
  }, [parameter, page, realtime]);

  const formatDate = (date) => {
    if (date) {
      const day = format(new Date(date), "dd/MM/yy");
      const time = format(new Date(date), "HH:mm");

      return day + " " + time;
    }
  };

  const handleSearch = (event) => {
    setTerm(event.target.value);
  };

  //Mover a funcionalidade de pesquisa urgentemente para o backend
  const filteredData = data
    ? data.filter((item) => {
        const deviceName = item.device.name || "";
        const lowerTerm = term.toLowerCase();

        return deviceName.toLowerCase().includes(lowerTerm);
      })
    : [];

  return (
    <div className="container">
      <h1>Registros</h1>
      <SearchInput type="text" onChange={handleSearch} />
      <SwitchInput
        placeholder={"Apenas dispositivos pendentes"}
        name="realtime"
        checked={realtime}
        value={realtime}
        onChange={handleRealtime}
      />
      <Pagination page={page} setPage={setPage}></Pagination>

      {!data ? (
        <Loading />
      ) : data.length === 0 ? (
        <p>Parece que não há nada aqui</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Dispositivo</th>
                <th>Check-in</th>
                <th>Check-out</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#1D1D20" : "",
                  }}
                >
                  <td
                    style={{
                      cursor: "pointer",
                      color: "#50C878",
                    }}
                    onClick={() =>
                      router.push(
                        `/institutions/${id}/locals/${localId}/mdevs/${parameter}/devices/${item.device.id}`
                      )
                    }
                  >
                    {item.device.name}
                  </td>
                  <td>{formatDate(item.entered_at)}</td>
                  <td>{formatDate(item.leaved_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} setPage={setPage}></Pagination>
          <div className="space"></div>
        </>
      )}

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

        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          gap: 16px;
        }

        .space {
          min-height: 55px;
        }
        table {
          width: 90%;
          border-collapse: collapse;
          margin-top: 20px;
          color: white;
        }

        th {
          background-color: #121214;
          padding: 10px;
          text-align: left;
          font-weight: 700;
        }

        td {
          padding: 10px;
          word-break: break-all;
          word-wrap: break-word;
          width: 32px;
          max-height: 36px;
        }
      `}</style>
    </div>
  );
}
