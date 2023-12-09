import Image from "next/image";
import HeroLeftText from "./HeroLeftText";

const HomeHero = () => {
  return (
    <>
      <div
        className=" relative flex lg:items-center gap-8 justify-between flex-col-reverse lg:flex-row pt105 gap-x-8 px-2 md:px-7"
        style={{
          maxWidth: 1440,
          overflow: "hidden",
        }}
      >
        <HeroLeftText />
        <Image
          priority={true}
          className="lg:right-[-50px] "
          style={{
            position: "relative",
            // width: "100%",
            // height: "100%",
            // right: -50,
          }}
          src={"/hero.png"}
          alt="group of people"
          width={800}
          height={434}
        />
      </div>
    </>
  );
};

export default HomeHero;
