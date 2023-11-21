import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DefaultButton from "../../../../../../../src/components/buttons/default/Default";
import VariantButton from "../../../../../../../src/components/buttons/default/Variant";
import DefaultInput from "../../../../../../../src/components/inputs/Default";
import SelectInput from "../../../../../../../src/components/inputs/select/SelectInput";
import SwitchInput from "../../../../../../../src/components/inputs/Switch";
import LinkArrow from "../../../../../../../src/components/Link";
import ProfilePicture from "../../../../../../../src/components/ProfilePicture";
import { HttpClient } from "../../../../../../../src/infra/HttpClient/HttpClient";
import { withSession } from "../../../../../../../src/services/auth/session";
import { tokenService } from "../../../../../../../src/services/auth/tokenService";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);

  const [locals, setLocals] = useState([]);

  const [active, setActive] = useState(true);
  const handleActive = () => {
    setActive(!active);
  };

  const router = useRouter();
  const mdevId = router.query.mdevId;
  const institutionId = router.query.id;
  const localId = router.query.localId;

  const [values, setValues] = React.useState({
    name: "",
    latitude: "",
    longitude: "",
    local: "",
    imagePath: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/locals`,
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

        const locals = response.body.locals;

        const result = locals.filter((local) => {
          return local.institution_id == institutionId;
        });
        setLocals(result);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/mdevs/${mdevId}`,
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

        const mdev = response.body.mdev;
        setValues({
          name: mdev.name,
          latitude: mdev.latitude,
          longitude: mdev.longitude,
          imagePath: mdev.image_path,
          local: mdev.local_id,
        });

        setActive(mdev.active);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, [values.state]);

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    if (fieldValue === "-1") return;

    console.log(locals);
    console.log(values.local);

    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  function validate() {
    const parsedLatitude = parseFloat(values.latitude);
    const parsedLongitude = parseFloat(values.longitude);

    if (
      isNaN(parsedLatitude) ||
      parsedLatitude > 90 ||
      parsedLatitude < -90 ||
      isNaN(parsedLongitude) ||
      parsedLongitude > 90 ||
      parsedLongitude < -90
    ) {
      throw new Error(
        "Latitude e Longitude devem conter valores entre -90 e 90"
      );
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const token = tokenService.get();
    try {
      validate();
      const response = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mdevs/${mdevId}`,
        {
          method: "PUT",
          body: {
            name: values.name,
            latitude: values.latitude,
            longitude: values.longitude,
            local: values.local,
            imagePath: values.imagePath,
            active,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log(response);
        console.log(values);
        throw new Error("Erro ao adicionar: " + response.body.message);
      }

      toast.success("Feito");
    } catch (error) {
      console.log(error);
      toast.error("Erro real" + error);
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
            placeholder="Latitude"
            name="latitude"
            type="number"
            value={values.latitude}
            onChange={handleChange}
            required
          />
          <DefaultInput
            placeholder="Longitude"
            name="longitude"
            type="number"
            value={values.longitude}
            onChange={handleChange}
            required
          />
          <DefaultInput
            placeholder="URL da imagem"
            name="imagePath"
            type="link"
            value={values.imagePath}
            onChange={handleChange}
          />
          <SelectInput
            name="local"
            title="Locals"
            value={values.local}
            onChange={handleChange}
            required
          >
            <optgroup label="Local">
              <option key={-1} value={-1}>
                Selecione uma localização
              </option>
              {locals.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.name}
                </option>
              ))}
            </optgroup>
          </SelectInput>

          <SwitchInput
            placeholder={"Operante"}
            name="active"
            checked={active}
            value={active}
            onChange={handleActive}
          />

          <DefaultButton text={"Salvar"} animation={loading} />
        </form>
        <div>
          <LinkArrow
            href={`/institutions/${institutionId}/locals/${localId}/mdevs/${mdevId}/records`}
          >
            Visualizar registros
          </LinkArrow>
          <LinkArrow
            href={`/institutions/${institutionId}/locals/${localId}/mdevs/${mdevId}/devices`}
          >
            Visualizar dispostivos
          </LinkArrow>
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
