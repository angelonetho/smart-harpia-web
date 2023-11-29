import React from "react";

import AboutComponent from "../src/components/homePage/About";
import NavBar from "../src/components/homePage/NavBar";
import Video from "../src/components/homePage/NavBar/VideoContainer";

function HomePage() {
  return (
    <div>
      <NavBar />
      <Video />
     
      <div>
        <section>
        <AboutComponent />
        </section>
      </div>
     

      <style jsx>{`
        section {
          padding: 2em;
          background: #141414;
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

export default HomePage;
