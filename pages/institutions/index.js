import { useEffect, useState } from "react";
import CardLine from "../../src/components/CardLine";
import Button from "../../src/components/buttons/default/Variant";
import SearchInput from "../../src/components/inputs/SearchInput";
import { HttpClient } from "../../src/infra/HttpClient/HttpClient";
import { tokenService } from "../../src/services/auth/tokenService";
import { useRouter } from "next/router";
import { withSession } from "../../src/services/auth/session";
import Link from "next/link";
import toast from "react-toastify";

export default function Institution() {
  const router = useRouter();

  const [institutions, setInstitutions] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({ system_admin: false });

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/institutions/allowed`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setInstitutions(response.body.institutions);
      setUser(response.body.user);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const result = institutions.filter(
    (institution) =>
      institution.name.toLowerCase().includes(search.toLowerCase()) &&
      (user.system_admin || institution.id === user.institution_id)
  );

  return (
    <div>
      <h1>Minhas Instituições</h1>
      <div className="container">
        <SearchInput value={search} onChange={handleSearch} />

        {result.map((institution) => (
          <CardLine
            key={institution.id}
            title={institution.name}
            isActive={institution.active}
            href={`/institutions/${institution.id}`}
          />
        ))}

        <Link href={"institutions/new"}>
          <Button
            disabled={!user.system_admin}
            text={"Adicionar nova instituição +"}
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
