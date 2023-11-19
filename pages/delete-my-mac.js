import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Input from "../src/components/login/Input";
import Button from "../src/components/login/button";
import Link from "next/link";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import { toast } from "react-toastify";

function DeleteMyMacPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    mac: "",
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

    HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${values.mac}`, {
      method: "POST",
    }).then((response) => {
      if (response.status !== 200) {
        toast.error("" + response.body.message);
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
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 90vh;
          min-width: 390px;
        }

        .heading {
          font-size: 1.5rem;
          margin-bottom: 20px;
          weight: 600;
          color: white;
        }

        .form {
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

      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="heading">Apague meu endereço MAC</h1>

          <Input
            placeholder="MAC"
            name="mac"
            type="text"
            value={values.mac}
            onChange={handleChange}
            autoComplete="on"
            required
          />

          <Button type="submit" animated={loading}>
            Apagar meu MAC
          </Button>
          <Link href={"/"}>
            <p className="link">Voltar</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default DeleteMyMacPage;
