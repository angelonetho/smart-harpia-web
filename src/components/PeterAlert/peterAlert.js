import { X } from "@phosphor-icons/react";
import { useState } from "react";

export default function PeterAlert({}) {
  const [exist, setExist] = useState(true);

  if (!exist) return <></>;

  return (
    <>
      <div className="container">
        <h1>Peter Alert</h1>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_Hn69Q4dmBpL-LeZXLV7-rmjZl-o1q0_gf6HaLNh76TENOURcl7vX5rTQNs3IzeOVF8&usqp=CAU"
          width={64}
        />

        <p>nyeheheheheh look lois im in the computah</p>

        <button onClick={() => setExist(false)}>OK</button>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #ece9d8;
          padding: 20px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          border: 1px solid #000;
          width: 260px;
          display: block;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          text-align: center;
          border-width: 25px 3px 3px 3px;
          border-radius: 5px;
          border-image: linear-gradient(#2d2dc1, #5d5ddd) 30;
          user-select: none;
        }

        .closeIcon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        img {
          margin: 8px;
        }

        h1 {
          color: #000;
          text-align: center;
          margin-top: 16px;
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: bold;
        }

        p {
          font-size: 14px;
          color: #000;
          text-align: center;
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
          font-family: inherit;
          border: none;
          outline: 1px dotted rgb(37, 37, 37);
          outline-offset: -4px;
          background: hsl(0deg 0% 75%);
          box-shadow: inset -1px -1px #292929, inset 1px 1px #fff,
            inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 5px 30px;
        }

        button:active {
          box-shadow: inset -1px -1px #fff, inset 1px 1px #292929,
            inset -2px -2px #ffffff, inset 2px 2px rgb(158, 158, 158);
        }
      `}</style>
    </>
  );
}
