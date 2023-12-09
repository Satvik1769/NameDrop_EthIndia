const Banner = () => {
  return (
    <div
      className="relative w-full top-[-20px] bannerContainer overflow-hidden"
      style={{}}
    >
      <BannerPart rotate="-2" />;
      <BannerPart z={1} />
    </div>
  );
};

export default Banner;

const BannerPart = ({ z = 0, arrLen = 10, rotate = "1" }) => {
  const arr = Array(arrLen).fill(1);
  return (
    <div
      className="flex card relative top-0 left-0 w-full overflow-hidden"
      style={{
        opacity: z ? 1 : 0.4,
        transform: `rotate(${rotate}deg) ${
          !z ? "translateY(70%)" : "translateY(-70%)"
        }`,
        zIndex: z,
        borderRadius: 0,
        padding: "15px 15px",
        border: "none",
        boxShadow: z ? "10px 9px 18px 0px #1B242D" : "none",
        animationDelay: z ? "1000ms" : "0ms",
      }}
    >
      {arr.map((item, index) => (
        <div
          key={index}
          className={`flex ${z ? "moveRight" : "moveLeft"} flex-shrink-0 mr-3`}
          style={{
            width: "max-content",
          }}
        >
          <h1
            className="fs0"
            style={{
              color: "var(--text)",
              fontSize: 38,
            }}
          >
            {" Just launched: "}
            <span className="gradText" style={{}}>
              {" Namedrop "}
            </span>
            {index % 2 == 0 ? " 🚀 " : " 🔥 "}
          </h1>
        </div>
      ))}
    </div>
  );
};
