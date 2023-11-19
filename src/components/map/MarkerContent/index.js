export default function MarkerContent({ mdev }) {
  if (!mdev.image_path) {
    mdev.image_path =
      "https://th.bing.com/th/id/OIG.mbwK1QVfxYaroYdvebrO?pid=ImgGn";
  }

  return (
    <>
      <div>
        <h1>{mdev.name}</h1>
        <img src={mdev.image_path} alt={mdev.name} />
      </div>
      <style jsx>{`
        img {
          width: 52px;
          height: 52px;

          cursor: pointer;
          user-select: none;

          border-radius: 50%;
          border: 2px solid transparent;
          box-shadow: 0px 0px 5px 2px #00a367;
          display: block;
          margin: auto;
        }

        h1 {
          color: var(--Text, #00a367);
          text-align: center;
          margin: 16px;
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          user-select: none;
        }
      `}</style>
    </>
  );
}
