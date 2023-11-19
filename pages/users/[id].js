import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { HttpClient } from "../../src/infra/HttpClient/HttpClient";
import { tokenService } from "../../src/services/auth/tokenService";
import { withSession } from "../../src/services/auth/session";
import ProfilePicture from "../../src/components/ProfilePicture";
import SwitchInput from "../../src/components/inputs/Switch";
import DefaultInput from "../../src/components/inputs/Default";
import DefaultButton from "../../src/components/buttons/default/Default";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(false);
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
    const fetchData = async () => {
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${parameter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Erro ao buscar informações!");
        }

        const user = response.body.user;
        setValues({
          name: user.name,
          email: user.email,
          imagePath: user.image_path,
        });

        setActive(user.active);
        setAdmin(user.admin);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = tokenService.get();
    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${parameter}`,
        {
          method: "PUT",
          body: {
            name: values.name,
            email: values.email,
            imagePath: values.imagePath,
            active,
            admin,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log(response);
        throw new Error("Erro ao atualizar: " + response.body.message);
      }

      toast.success("Feito");
    } catch (error) {
      console.log(error);
      toast.error(error);
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
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
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
          <DefaultButton text={"Salvar"} animation={loading} />
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
