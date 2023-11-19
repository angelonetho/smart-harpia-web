import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: rgba(0, 169, 106, 0.8);
          backdrop-filter: blur(8px);
          color: white;

          margin: 1rem auto; /* Centraliza a Navbar na página */

          width: 100%; /* Alterado para 100% */
          max-width: 95vw; /* Adicionado um valor máximo de largura */

          border-radius: 10px;
          z-index: 1000;

          position: fixed;

          left: 0;
          right: 0;
        }

        .navLinks {
          display: flex;
          gap: 1rem;
        }

        .buttons {
          display: flex;
          gap: 1rem;
        }

        .space {
          min-height: 7rem;
        }
      `}</style>

      <header>
        <nav className="navLinks">
          <Link href="/map">
            <Logo />
          </Link>
        </nav>
        <div className="buttons">
          <Button href={"/login"}>Entrar</Button>
        </div>
      </header>
    </>
  );
}
