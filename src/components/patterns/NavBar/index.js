import Link from "next/link";
import { useRouter } from "next/router";
import { CaretLeft } from "@phosphor-icons/react";

export default function NavBar() {
  const router = useRouter();

  if (
    router.pathname === "/map" ||
    router.pathname === "/" ||
    router.pathname === "/login"
  ) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        header {
          align-content: center;
          align-items: center;
          background-color: #1d1d20;
          display: flex;
          flex-wrap: wrap;
          padding: 15px;
          user-select: none;
        }

        nav {
          display: flex;
          width: 100vw;
        }

        .backDiv {
          align-content: center;
          align-items: center;
          color: #9a9a9a;
          cursor: pointer;
          display: flex;
          gap: 8px;
          justify-content: space-between;
        }

        a {
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .invisibleDiv {
          align-content: center;
          align-items: center;
          color: #1d1d20;
          display: flex;
          gap: 8px;
          justify-content: space-between;
        }

        .title {
          margin: 0 auto;
        }

        .title h1 {
          color: #fff;
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-align: center;
        }
      `}</style>
      <header>
        <nav>
          <div className="backDiv" onClick={() => router.back()}>
            <CaretLeft size={18} />
            <a>Voltar</a>
          </div>

          <div className="title">
            <Link href="/map">
              <h1>Smart Harpia</h1>
            </Link>
          </div>

          <div className="invisibleDiv">
            <CaretLeft size={18} />
            <a>Voltar</a>
          </div>
        </nav>
      </header>
    </>
  );
}
