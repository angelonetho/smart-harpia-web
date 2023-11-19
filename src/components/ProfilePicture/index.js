export default function ProfilePicture({ url }) {
  return (
    <div>
      <img
        src={url}
        alt="Profile Picture"
        className="picture"
        draggable="false"
      />

      <style jsx>{`
        .picture {
          display: block;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          margin: 16px;
          background: #9a9a9a;
          color: #9a9a9a;
          text-align: center;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
