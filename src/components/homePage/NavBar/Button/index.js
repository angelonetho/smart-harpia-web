import Link from "next/link";
import { SignIn } from "@phosphor-icons/react";

export default function Button({ children, href }) {
  return (
    <div>
      <Link href={href} passHref>
        <button>
          {children}
          <SignIn size={24} weight="bold" />
        </button>
      </Link>

      <style jsx>{`
        button {
          background-color: #0076f5;
          color: white;
          border: none;
          border-radius: 10px;
          width: 7rem;
          height: 3rem;
          transition: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.4rem;
          user-select: none;

          font-size: 1rem;
          font-weight: bold;
        }

        button:hover {
          background-color: #080f0f;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
