import { useEffect, useState } from "react";
import { tokenService } from "../src/services/auth/tokenService";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export default function ReportPage() {
  const [dataa, setData] = useState(null);

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logs/report`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const dataArray = Object.values(response.body);
      setData(dataArray);
    });
  }, []);

  const data = [
    {
      name: "0:00",
      devices: 6,
    },
    {
      name: "1:00",
      devices: 6,
    },
    {
      name: "2:00",
      devices: 6,
    },
    {
      name: "3:00",
      devices: 5,
    },
    {
      name: "4:00",
      devices: 5,
    },
    {
      name: "5:00",
      devices: 6,
    },
    {
      name: "6:00",
      devices: 5,
    },
    {
      name: "7:00",
      devices: 5,
    },
    {
      name: "8:00",
      devices: 12,
    },
    {
      name: "9:00",
      devices: 68,
    },
    {
      name: "10:00",
      devices: 159,
    },
    {
      name: "11:00",
      devices: 284,
    },
    {
      name: "12:00",
      devices: 418,
    },
    {
      name: "13:00",
      devices: 527,
    },
    {
      name: "14:00",
      devices: 709,
    },
    {
      name: "15:00",
      devices: 675,
    },
    {
      name: "16:00",
      devices: 553,
    },
    {
      name: "17:00",
      devices: 355,
    },
    {
      name: "18:00",
      devices: 88,
    },
    {
      name: "19:00",
      devices: 10,
    },
    {
      name: "20:00",
      devices: 6,
    },
    {
      name: "21:00",
      devices: 7,
    },
    {
      name: "22:00",
      devices: 6,
    },
    {
      name: "23:00",
      devices: 7,
    },
  ];

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Relatório Gerado </h1>
      <div className="graph-container">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#1D1D20" strokeDasharray="5 5" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="devices"
              stroke="#50C878"
              yAxisId={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          gap: 16px;
        }

        h1 {
          color: #fff;
          text-align: center;
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          margin-top: 32px;
        }
        .graph-container {
          width: 100%;
          height: 480px;
        }
      `}</style>
    </div>
  );
}
