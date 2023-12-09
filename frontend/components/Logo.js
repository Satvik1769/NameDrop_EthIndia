import Image from "next/image";

const Logo = ({ size = 54 }) => {
  return (
    <>
      <Image src={"/logo.png"} alt="logo" width={size} height={size} />
    </>
  );
};

export default Logo;
