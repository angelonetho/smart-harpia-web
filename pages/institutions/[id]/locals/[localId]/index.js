import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DefaultButton from "../../../../../src/components/buttons/default/Default";
import VariantButton from "../../../../../src/components/buttons/default/Variant";
import DefaultInput from "../../../../../src/components/inputs/Default";
import SelectInput from "../../../../../src/components/inputs/select/SelectInput";
import LinkArrow from "../../../../../src/components/Link";
import { HttpClient } from "../../../../../src/infra/HttpClient/HttpClient";
import { withSession } from "../../../../../src/services/auth/session";
import { tokenService } from "../../../../../src/services/auth/tokenService";

export default function UserProfile(ctx) {
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
      try {
        const response = await HttpClient(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${values.state}/municipios`,
          {
            method: "GET",
          }
        );

        if (response.status !== 200) {
          throw new Error("Erro ao buscar informações!");
        }

        setCities(response.body);
      } catch (error) {
        toast.error("Erro: " + error);
      }
    };

    fetchData();
  }, [values.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpClient(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/`,
          {
            method: "GET",
          }
        );

        if (response.status !== 200) {
          throw new Error("Erro ao buscar informações!");
        }

        setStates(response.body);
      } catch (error) {
        toast.error("Erro: " + error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/locals/${parameter}`,
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

        const local = response.body.local;
        setValues({
          name: local.name,
          ibgeCode: local.ibge_code,
        });
      } catch (error) {
        toast.error("Erro: " + error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!values.ibgeCode) return;

    const fetchData = async () => {
      try {
        const response = await HttpClient(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${values.ibgeCode}`,
          {
            method: "GET",
          }
        );

        if (response.status !== 200) {
          throw new Error("Erro ao buscar informações!");
        }

        setValues({
          name: values.name,
          state: response.body.microrregiao.mesorregiao.UF.sigla,
          ibgeCode: values.ibgeCode,
        });
      } catch (error) {
        toast.error("Erro: " + error);
      }
    };

    fetchData();
  }, [values.ibgeCode]);

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
  const parameter = router.query.localId;
  const id = router.query.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = tokenService.get();
    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/locals/${parameter}`,
        {
          method: "PUT",
          body: {
            name: values.name,
            ibgeCode: values.ibgeCode,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.body.message + "");
      }

      toast.success("Feito");
      router.push(`/institutions/${id}/locals/`);
    } catch (error) {
      console.log(error);
      toast.error("" + error);
    }
    setLoading(false);
  };

  async function deleteLocal() {
    const token = tokenService.get();
    try {
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/locals/${parameter}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 204) {
        throw new Error("Erro ao deletar: " + response.body.message);
      }

      toast.success("Feito");
      router.back();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <div>
      <h1>{values.name}</h1>

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

          <DefaultButton text={"Salvar"} animation={loading} />
        </form>
        <VariantButton
          text={"Apagar"}
          onClick={deleteLocal}
          disabled={!ctx.session.user.system_admin}
        />

        <LinkArrow href={`/institutions/${id}/locals/${parameter}/mdevs`}>
          Visualizar mdevs
        </LinkArrow>
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
