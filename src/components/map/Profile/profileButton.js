import ProfileCard from "./profileCard";
import { useEffect, useState } from "react";

export default function ProfileButton({ user }) {
  const [isCardOpen, setIsCardOpen] = useState(false); // Estado para controlar se o card está aberto

  if (!user.image_path) {
    user.image_path =
      "https://th.bing.com/th/id/OIG.n8xAfFUU70LYIsaHU2lK?pid=ImgGn";
  }

  const handleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div>
      <div className="container">
        <img
          src={user.image_path}
          alt={user.name}
          className="image"
          onClick={handleCard}
          key={user.id}
        />
      </div>
      {isCardOpen && <ProfileCard user={user} onClose={handleCard} />}
      <style jsx>{`
        .container {
          position: absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }

        .image {
          width: 52px;
          height: 52px;
          user-select: none;
          border-radius: 50%;
          border: 2px solid transparent;
          box-shadow: 0px 0px 5px 2px #50c878;
          display: block;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
