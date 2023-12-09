const HeroLeftText = ({ heading, desc }) => {
  return (
    <>
      <div>
        <h1>
          {heading || (
            <>
              Connect.
              <br /> Collect.
              <br /> Captivate.
              <br />
            </>
          )}
        </h1>
        <p className="mt-5">
          {desc ||
            "Circle : Where Connections Become Unforgettable Experiences"}
        </p>
        <button
          className="btnOutline mt-10"
          style={{
            height: 55,
          }}
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default HeroLeftText;
