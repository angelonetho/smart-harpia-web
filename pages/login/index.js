import React, { useEffect, useState } from "react";
import { authService } from "../../src/services/auth/authService";
import { useRouter } from "next/router";
import GoogleButton from "../../src/components/GoogleButton";
import { useSearchParams } from "next/navigation";
import Input from "../../src/components/login/Input";
import Button from "../../src/components/login/button";
import Link from "next/link";
import { set } from "date-fns";
import { toast } from "react-toastify";

function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const data = urlSearchParams.get("authorization");
    console.log(data);
    if (data) {
      setLoading(true);
      authService
        .handleCallback(data)
        .then(() => {
          toast.success("Logado com sucesso");
          router.replace("/map");
        })
        .catch((error) => {
          console.log(
            "Erro ao transformar chave de autorização em token: " + error
          );
        });
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await authService.login({
        email: values.email,
        password: values.senha,
      });
      toast.success("Logado com sucesso");
      router.replace("/map");
    } catch (error) {
      toast.error("" + error);
      console.log(error);
    }
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
          font-size: 32px;
          color: white;
          margin-bottom: 20px;
          weight: 700;
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
          color: #0a81ff;
          font-size: 14px;
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-heading">Entrar no Smart Harpia</h1>

          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="on"
            required
          />

          <Input
            placeholder="Senha"
            name="senha"
            type="password"
            value={values.senha}
            onChange={handleChange}
            autoComplete="on"
            required
          />

          <Button type="submit" animated={loading}>
            Entrar
          </Button>
          <Link href={"/login/recover-password"}>
            <p className="link">Esqueceu a senha?</p>
          </Link>
        </form>

        <div className="login-form">
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
