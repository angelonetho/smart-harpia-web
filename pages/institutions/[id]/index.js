import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DefaultButton from "../../../src/components/buttons/default/Default";
import DefaultInput from "../../../src/components/inputs/Default";
import SwitchInput from "../../../src/components/inputs/Switch";
import Link from "../../../src/components/Link";
import ProfilePicture from "../../../src/components/ProfilePicture";
import { HttpClient } from "../../../src/infra/HttpClient/HttpClient";
import { withSession } from "../../../src/services/auth/session";
import { tokenService } from "../../../src/services/auth/tokenService";

export default function Institution(ctx) {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  const userIsAdmin =
    ctx.session.user.system_admin == true || ctx.session.user.admin == true;

  const [values, setValues] = React.useState({
    name: "",
    abbreviation: "",
    imagePath: "",
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  const router = useRouter();
  const parameter = router.query.id;

  useEffect(() => {
    const token = tokenService.get();
    HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/institutions/${parameter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      const institution = response.body.institution;
      setValues({
        name: institution.name,
        abbreviation: institution.abbreviation,
        imagePath: institution.image_path,
      });
      setActive(institution.active);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = tokenService.get();

    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/institutions/${parameter}`,
        {
          method: "PUT",
          body: {
            name: values.name,
            abbreviation: values.abbreviation,
            imagePath: values.imagePath,
            active,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Erro: " + response.body.message);
      } else {
        toast.success("Feito");
      }
    } catch (error) {
      toast.error("" + error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>{values.name}</h1>
      <div className="container">
        <ProfilePicture url={values.imagePath} />
        <form onSubmit={handleSubmit}>
          <DefaultInput
            placeholder="Nome"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            required
          />
          <DefaultInput
            placeholder="Abreviatura"
            name="abbreviation"
            type="text"
            value={values.abbreviation}
            onChange={handleChange}
          />
          <DefaultInput
            placeholder="Link da Foto"
            name="imagePath"
            type="link"
            value={values.imagePath}
            onChange={handleChange}
          />
          <SwitchInput
            placeholder={"Operante"}
            name="active"
            checked={active}
            value={active}
            onChange={handleClick}
          />
          <DefaultButton text={"Salvar"} animation={loading} />
        </form>
        <div>
          {userIsAdmin && (
            <Link href={`/institutions/${parameter}/users`}>
              Visualizar usuários
            </Link>
          )}

          <Link href={`/institutions/${parameter}/locals`}>
            Visualizar locais
          </Link>
        </div>
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
        .container,
        form {
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
