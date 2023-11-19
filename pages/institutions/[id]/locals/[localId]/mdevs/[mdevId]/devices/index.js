import { useEffect, useState } from "react";
import CardLine from "../../../../../../../../src/components/CardLine";
import SearchInput from "../../../../../../../../src/components/inputs/SearchInput";
import { HttpClient } from "../../../../../../../../src/infra/HttpClient/HttpClient";
import { tokenService } from "../../../../../../../../src/services/auth/tokenService";

import { useRouter } from "next/router";
import { withSession } from "../../../../../../../../src/services/auth/session";

export default function Institution() {
  const router = useRouter();
  const mdevId = router.query.mdevId;
  const institutionId = router.query.id;
  const localId = router.query.localId;

  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/mdevs/${mdevId}/devices`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      console.log(response);

      const devices = response.body.devices;
      const updatedDevices = verifyDevicesName(devices);
      //Função

      setDevices(updatedDevices);
    });
  }, []);

  function verifyDevicesName(devices) {
    // Verifica cada dispositivo
    const updatedDevices = devices.map((device) => {
      // Verifica se o dispositivo possui um nome
      if (!device.name) {
        // Se não tiver um nome, atribui um nome com base no ID
        device.name = `Dispositivo ${device.id}`;
      }
      return device;
    });

    return updatedDevices;
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const result = devices.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Dispositivos</h1>
      <div className="container">
        <SearchInput value={search} onChange={handleSearch} />

        {result.map((device) => (
          <CardLine
            key={device.id}
            title={device.name}
            href={`/institutions/${institutionId}/locals/${localId}/mdevs/${mdevId}/devices/${device.id}`}
          />
        ))}
      </div>

      <style jsx>{`
        h1 {
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
      `}</style>
    </div>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});
