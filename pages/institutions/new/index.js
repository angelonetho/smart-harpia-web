import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import VariantButton from "../../../src/components/buttons/default/Variant";
import DefaultInput from "../../../src/components/inputs/Default/";
import SwitchInput from "../../../src/components/inputs/Switch";
import ProfilePicture from "../../../src/components/ProfilePicture";
import { HttpClient } from "../../../src/infra/HttpClient/HttpClient";
import { withSession } from "../../../src/services/auth/session";
import { tokenService } from "../../../src/services/auth/tokenService";

export default function Institution() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const handleClick = () => {
    setActive(!active);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = tokenService.get();
    try {
      await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/institutions`, {
        method: "POST",
        body: {
          name: values.name,
          abbreviation: values.abbreviation,
          imagePath: values.imagePath,
          active,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Feito");
    } catch (error) {
      console.log(error);
      toast.error("Error" + error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Adicionar Instituição</h1>
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
