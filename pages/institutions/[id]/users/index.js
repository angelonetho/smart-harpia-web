import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { HttpClient } from "../../../../src/infra/HttpClient/HttpClient";
import CardLine from "../../../../src/components/CardLine";
import VariantButton from "../../../../src/components/buttons/default/Variant";
import SearchInput from "../../../../src/components/inputs/SearchInput";
import { tokenService } from "../../../../src/services/auth/tokenService";
import { withSession } from "../../../../src/services/auth/session";

export default function Users(ctx) {
  const router = useRouter();
  const id = router.query.id;

  const userIsAdmin =
    ctx.session.user.system_admin == true || ctx.session.user.admin == true;

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/institutions/${id}/users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      setUsers(response.body.users);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const result = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(ctx.session.user.system_admin == true);

  return (
    <div>
      <h1>Membros</h1>
      <div className="container">
        <SearchInput value={search} onChange={handleSearch} />

        {result.map((user) => (
          <CardLine
            key={user.id}
            title={user.name}
            isActive={user.active}
            href={`/users/${user.id}`}
          />
        ))}

        <Link href={`/institutions/${id}/users/new/`}>
          <VariantButton
            disabled={!userIsAdmin}
            text={"Adicionar novo membro +"}
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
