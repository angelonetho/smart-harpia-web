import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { withSession } from "../../../../../src/services/auth/session";
import DefaultInput from "../../../../../src/components/inputs/Default";
import VariantButton from "../../../../../src/components/buttons/default/Variant";
import { tokenService } from "../../../../../src/services/auth/tokenService";
import { HttpClient } from "../../../../../src/infra/HttpClient/HttpClient";
import SelectInput from "../../../../../src/components/inputs/select/SelectInput";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [values, setValues] = React.useState({
    name: "",
    ibgeCode: "",
    state: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!values.state) return;
      console.log("hi");
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${values.state}/municipios`,
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

        setCities(response.body);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, [values.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/`,
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

        setStates(response.body);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    if (fieldValue === "-1") return;

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/locals`,
        {
          method: "POST",
          body: {
            name: values.name,
            institution: parameter,
            ibgeCode: values.ibgeCode,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        console.log(response);
        console.log(values);
        throw new Error("Erro ao atualizar: " + response.body.message);
      }

      toast.success("Feito");
      router.push(`/institutions/${parameter}/locals/`);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Adicionar Local</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <DefaultInput
            placeholder="Nome"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            required
          />
          <SelectInput
            name="state"
            title="States"
            value={values.state}
            onChange={handleChange}
          >
            <optgroup label="Estado">
              <option key={-1} value={-1}>
                Selecione uma UF
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.sigla}>
                  {state.nome}
                </option>
              ))}
            </optgroup>
          </SelectInput>

          <SelectInput
            name="ibgeCode"
            title="Cites"
            value={values.ibgeCode}
            onChange={handleChange}
          >
            <optgroup label="Cidade">
              <option key={-1} value={-1}>
                Selecione uma cidade
              </option>
              {cities.map((city) => {
                return (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                );
              })}
            </optgroup>
          </SelectInput>

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
