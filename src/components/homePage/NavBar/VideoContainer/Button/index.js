import Link from "next/link";
import { SignIn } from "@phosphor-icons/react";

export default function Button({ children, href }) {
  return (
    <div>
      <Link href={href} passHref>
        <button>{children}</button>
      </Link>

      <style jsx>{`
        button {
          background-color: #0076f5;
          color: white;
          border: none;
          border-radius: 5px;
          width: 11rem;
          height: 4rem;
          transition: 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.4rem;
          user-select: none;

          font-size: 1rem;
          letter-spacing: 1.5px;
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
