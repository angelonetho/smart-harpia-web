import { useEffect, useState } from "react";
import CardLine from "../../../../../../src/components/CardLine";
import VariantButton from "../../../../../../src/components/buttons/default/Variant";
import SearchInput from "../../../../../../src/components/inputs/SearchInput";
import { HttpClient } from "../../../../../../src/infra/HttpClient/HttpClient";
import { useRouter } from "next/router";
import { withSession } from "../../../../../../src/services/auth/session";
import LinkArrow from "../../../../../../src/components/Link";
import Link from "next/link";
import { tokenService } from "../../../../../../src/services/auth/tokenService";

export default function mdevs(ctx) {
  const router = useRouter();
  const parameter = router.query.localId;
  const id = router.query.id;

  const [mdevs, setMdevs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/locals/${parameter}/mdevs/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      setMdevs(response.body.mdevs);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const result = mdevs.filter((mdev) =>
    mdev.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Mdevs</h1>
      <div className="container">
        <SearchInput value={search} onChange={handleSearch} />

        {result.map((mdev) => (
          <CardLine
            key={mdev.id}
            title={mdev.name}
            isActive={mdev.active}
            href={`/institutions/${id}/locals/${parameter}/mdevs/${mdev.id}`}
          />
        ))}

        <Link href={`/institutions/${id}/locals/${parameter}/mdevs/new`}>
          <VariantButton
            disabled={!ctx.session.user.system_admin}
            text={"Adicionar novo mdev +"}
          />
        </Link>
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
