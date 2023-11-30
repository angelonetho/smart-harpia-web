import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../src/components/login/button";
import Input from "../../src/components/login/Input";
import { HttpClient } from "../../src/infra/HttpClient/HttpClient";

function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const data = urlSearchParams.get("token");
    if (!data) {
      toast.error("Não foi encontrado o token na URL");
      setLoading(false);
      return;
    }

    if (values.password !== values.passwordConfirmation) {
      toast.error("As senhas não correspondem");
      setLoading(false);
      return;
    }

    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password`, {
      method: "POST",
      body: {
        password: values.password,
        token: data,
      },
    }).then((response) => {
      if (response.status !== 204) {
        toast.error("Erro");
      } else {
        toast.success("Feito");
        router.replace("/login");
      }
    });

    setLoading(false);
  };

  return (
    <div className="login-container">
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          min-width: 390px;
        }

        .login-heading {
          font-size: 1.5rem;
          margin-bottom: 20px;
          weight: 600;
          color: white;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 400px;

          padding: 30px 0 30px 0;
          background-color: #121214;
          border-radius: 0.7rem;
          border: 1.3px solid #ebebeb;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          margin: 10px 0 10px 0;
          gap: 1rem;
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-heading">Escolha uma nova senha</h1>

          <Input
            placeholder="Senha"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <Input
            placeholder="Confirmar senha"
            name="passwordConfirmation"
            type="password"
            value={values.passwordConfirmation}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <Button type="submit" animated={loading}>
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
