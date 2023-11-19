import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function LinkArrow({ children, href, ...props }) {
  return (
    <>
      <Link href={href}>
        <div className={"linkContainer"}>
          <CaretRight size={18} color="white" />
          <p {...props}>{children}</p>
        </div>
      </Link>
      <style jsx>{`
        p {
          color: var(--Text, #fff);
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          user-select: none;
        }

        .linkContainer {
          justify-content: center;
          align-items: center;
          display: flex;
          gap: 8px;
          margin: 16px;
        }
      `}</style>
    </>
  );
}
