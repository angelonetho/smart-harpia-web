import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../src/components/login/button";
import Input from "../../src/components/login/Input";
import { HttpClient } from "../../src/infra/HttpClient/HttpClient";
import { authService } from "../../src/services/auth/authService";

function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
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

    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password`, {
      method: "POST",
      body: {
        email: values.email,
        resetPasswordUrl: `http://smart-harpia.netho.dev/login/reset-password`,
      },
    }).then((response) => {
      if (response.status !== 204) {
        toast.error("Erro");
      } else {
        toast.success("Feito");
      }

      console.log(response);
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
          border: 1.3px solid transparent;
          margin: 10px 0 10px 0;
          gap: 1rem;
        }

        .link {
          text-decoration: none;
          color: #006ce0;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-heading">Redefinição de Senha</h1>

          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="on"
            required
          />

          <Button type="submit" animated={loading}>
            Enviar Código
          </Button>
          <Link href={"/login"}>
            <p className="link">Voltar</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
