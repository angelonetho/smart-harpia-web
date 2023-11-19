import React from "react";

function AboutComponent() {
  return (
    <div>
      <div>
        <section>
          <h2>O PROJETO</h2>
          <p>
            O projeto Smart Harpia é uma solução para monitorar o fluxo de
            pessoas em espaços públicos usando a Internet das Coisas (IoT). Com
            sensores inteligentes e uma plataforma de análise de dados, o
            projeto visa melhorar a segurança, a mobilidade e a gestão urbana
            das cidades. A missão do projeto é contribuir para o desenvolvimento
            sustentável e a qualidade de vida dos cidadãos, usando a tecnologia
            como aliada.
          </p>
        </section>
      </div>

      <style jsx>{`
        section {
          padding: 2em;
          background: #0076f5;
          border: none;
          border-radius: 10px;
          margin: 2em;
        }

        h1,
        h2,
        p {
          color: white;
          user-select: none;
        }

        h1 {
          font-size: 1.7rem;
          font-weight: bolder;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: bolder;
        }

        p {
          font-size: 1.3rem;
          line-height: 1.7rem;
        }
      `}</style>
    </div>
  );
}

export default AboutComponent;
