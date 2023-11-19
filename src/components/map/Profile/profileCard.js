import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../../../services/auth/authService";
import { X } from "@phosphor-icons/react";

export default function ProfileCard({ user, onClose }) {
  const router = useRouter();

  const [name, setName] = useState("");

  useEffect(() => {
    const firstName = user.name.split(" ").shift();
    setName(firstName);
  }, [user]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    authService.logout().then(() => {
      router.push("/login");
    });
  };

  return (
    // Renderizar o card somente se isCardOpen for verdadeiro

    <>
      <div className="container">
        <span className="closeIcon" onClick={handleClose}>
          <X size={20} />
        </span>
        <img
          src={user.image_path}
          alt={user.name}
          onClick={() => router.push("/profile")}
          className="image"
        />
        <h1>Olá, {name}!</h1>
        <div className="buttons">
          <button onClick={() => router.push("/profile")}>
            Gerenciar conta
          </button>
          <button onClick={handleLogout}>Encerrar sessão</button>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          top: 80px;
          right: 20px;
          background-color: #1d1d20;
          padding: 20px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          width: 280px;
          border: 1px solid rgba(0, 0, 0, 0.25);
        }

        .image {
          width: 64px;
          height: 64px;

          cursor: pointer;
          user-select: none;

          border-radius: 50%;
          border: 2px solid transparent;
          box-shadow: 0px 0px 5px 2px #50c878;
          display: block;
          margin: auto;
        }

        h1 {
          color: var(--Text, #fff);
          text-align: center;
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          user-select: none;
        }

        .closeIcon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          font-size: 20px;
          color: white;
          transition: background-color 0.3s ease-in-out;
        }

        .closeIcon:hover {
          color: #9a9a9a;
        }

        .buttons {
          justify-content: center;
          display: flex;
          gap: 8px;
        }

        button {
          background: #006ce0;
          color: #ffffff;
          border: none;
          border-radius: 7px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.1s ease-in-out;
        }

        button:hover {
          background: #004fa3;
        }
      `}</style>
    </>
  );
}
