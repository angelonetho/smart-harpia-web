import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DefaultButton from "../../../../../../../../../src/components/buttons/default/Default";
import VariantButton from "../../../../../../../../../src/components/buttons/default/Variant";
import DeviceInfo from "../../../../../../../../../src/components/DeviceInfo";
import DefaultInput from "../../../../../../../../../src/components/inputs/Default";
import SwitchInput from "../../../../../../../../../src/components/inputs/Switch";
import ProfilePicture from "../../../../../../../../../src/components/ProfilePicture";
import { HttpClient } from "../../../../../../../../../src/infra/HttpClient/HttpClient";
import { withSession } from "../../../../../../../../../src/services/auth/session";
import { tokenService } from "../../../../../../../../../src/services/auth/tokenService";

export default function Device() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const mdevId = router.query.mdevId;
  const deviceId = router.query.deviceId;

  const [values, setValues] = React.useState({
    name: undefined,
    macAddress: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = tokenService.get();
        const response = await HttpClient(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${deviceId}`,
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

        const device = response.body.device;

        setValues({
          name: device.name,
          macAddress: device.mac_address,
        });
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${deviceId}`,
        {
          method: "PUT",
          body: {
            name: values.name,
            macAddress: values.macAddress,
            mdevId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log(response);
        console.log(values);
        throw new Error("Erro ao atualizar: " + response.body.message);
      }

      toast.success("Feito");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setLoading(false);
  };

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

  return (
    <div>
      <h1>
        <DeviceInfo macAddress={values.macAddress} />
        Editando Dispositivo
      </h1>

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
