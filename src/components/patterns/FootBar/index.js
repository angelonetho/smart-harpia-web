import Link from "next/link";
import { useRouter } from "next/router";

export default function FootBar() {
  const router = useRouter();

  if (!router.pathname.includes("/institution")) {
    return null;
  }

  return (
    <>
      <div className="space">
        {" "}
        <footer>
          <p>
            <span>
              <a className="link" href={"https://netho.dev"}>
                &copy; 2023
              </a>
            </span>
          </p>
          <style jsx>{`
            footer {
              background-color: #121214;
              margin-top: auto;
              height: 3rem;
              width: 100vw;
              display: flex;
              justify-content: center;
              align-items: center;
              user-select: none;

              position: relative;
              bottom: 0;
              width: 100%;
            }

            a {
              color: #9a9a9a;
              text-align: center;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              cursor: help;
            }

            .space {
              min-height: 52px;
            }
          `}</style>
        </footer>
      </div>
    </>
  );
}
