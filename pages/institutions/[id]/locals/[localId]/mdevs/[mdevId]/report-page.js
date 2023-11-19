import { useEffect, useState } from "react";
import { tokenService } from "../../../../../../../src/services/auth/tokenService";
import { HttpClient } from "../../../../../../../src/infra/HttpClient/HttpClient";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  YAxis,
  Brush,
} from "recharts";
import { useRouter } from "next/router";

export default function ReportPage() {
  const [data, setData] = useState(null);

  const router = useRouter();
  const id = router.query.mdevId;

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/logs/mdev/${id}/report`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      const dataArray = Object.values(response.body);
      setData(dataArray);
    });
  }, [id]);

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
            <XAxis dataKey="hour_interval" />
            <YAxis />
            <CartesianGrid stroke="#1D1D20" strokeDasharray="5 5" />
            <Tooltip />

            <Brush dataKey="hour_interval" fill="#1D1D20" />

            <Line
              type="monotone"
              dataKey="unique_devices_count"
              stroke="#50C878"
              yAxisId={0}
              dot={false}
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
