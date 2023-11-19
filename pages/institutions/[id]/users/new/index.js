import React, { useState } from "react";

import { useRouter } from "next/router";
import { withSession } from "../../../../../src/services/auth/session";
import ProfilePicture from "../../../../../src/components/ProfilePicture";
import DefaultInput from "../../../../../src/components/inputs/Default";
import SwitchInput from "../../../../../src/components/inputs/Switch";
import VariantButton from "../../../../../src/components/buttons/default/Variant";
import { tokenService } from "../../../../../src/services/auth/tokenService";
import { HttpClient } from "../../../../../src/infra/HttpClient/HttpClient";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(true);
  const handleActive = () => {
    setActive(!active);
  };

  const [admin, setAdmin] = useState(false);
  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    imagePath: "",
    password: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = tokenService.get();
    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          method: "POST",
          body: {
            name: values.name,
            email: values.email,
            imagePath: values.imagePath,
            password: values.password,
            institution: parameter,
            active,
            admin,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        console.log(response);
        throw new Error("Erro ao atualizar: " + response.body.message);
      }

      toast.success("Feito");
      router.push(`/institutions/${parameter}/users/`);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Adicionar Membro</h1>
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
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <DefaultInput
            placeholder="Senha"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            required
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
            onChange={handleActive}
          />
          <SwitchInput
            placeholder={"Administrador"}
            name="admin"
            checked={admin}
            value={admin}
            onChange={handleAdmin}
          />
          <VariantButton text={"Adicionar"} animation={loading} />
        </form>
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
