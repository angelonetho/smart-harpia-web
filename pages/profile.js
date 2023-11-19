import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tokenService } from "../src/services/auth/tokenService";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import { authService } from "../src/services/auth/authService";
import { withSession } from "../src/services/auth/session";
import ProfilePicture from "../src/components/ProfilePicture";
import DefaultInput from "../src/components/inputs/Default";
import DefaultButton from "../src/components/buttons/default/Default";
import VariantButton from "../src/components/buttons/default/Variant";
import { toast } from "react-toastify";

export default function Profile(ctx) {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    email: "",
    imagePath: "",
    id: "",
  });

  useEffect(() => {
    const user = ctx.session.user;

    setValues({
      name: user.name,
      email: user.email,
      imagePath: user.image_path,
      id: user.id,
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    sendAPI();
  };

  const handleDelete = () => {
    sendDeleteAPI();
  };

  const sendAPI = () => {
    const token = tokenService.get();
    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${values.id}`, {
      method: "PUT",
      body: {
        name: values.name,
        email: values.email,
        imagePath: values.imagePath,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        toast.error("Erro " + response.message);
        console.log(response);
      } else {
        toast.success("Feito");
      }
    });
  };

  const sendDeleteAPI = () => {
    const token = tokenService.get();
    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${values.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status !== 204) {
        toast.error("" + error);
      } else {
        toast.success("Feito");
        router.push("/");
      }
    });
  };

  return (
    <div>
      <h1>Meu Perfil</h1>
      <div className="container">
        <ProfilePicture url={values.imagePath} />
        <form onSubmit={handleUpdate}>
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
            placeholder="URL da foto"
            name="imagePath"
            type="text"
            value={values.imagePath}
            onChange={handleChange}
          />

          <DefaultButton text={"Salvar"} type="submit" />
        </form>
        <VariantButton text={"Desativar Conta"} onClick={handleDelete} />
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
