import React, { useState } from "react";
import { useRouter } from "next/router";
import MdevCard from "./MdevCard";
import Input from "./Input/search";
import SelectInput from "./Select/localSelect";

export default function MdevCardList({
  locals,
  mdevs,
  handleClick,
  handleLocal,
  local,
  user,
}) {
  const router = useRouter();

  const [term, setTerm] = useState("");

  const handleSearch = (event) => {
    setTerm(event.target.value);
  };

  const result = mdevs.filter((mdev) =>
    mdev.name.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <Input type="text" value={term} onChange={handleSearch} />
        <SelectInput
          name="local"
          title="Locals"
          onChange={handleLocal}
          value={local}
          required
        >
          <optgroup label="Local">
            <option key={-1} value={-1}>
              Selecione uma localização
            </option>
            {locals.map((local) => (
              <option key={local.id} value={local.id}>
                {local.name}
              </option>
            ))}
          </optgroup>
        </SelectInput>
        <div>
          {result.map((mdev, index) => (
            <MdevCard
              key={index}
              user={user}
              mdev={mdev}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          color: white;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(29, 29, 32, 0.9);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-height: 80vh;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
