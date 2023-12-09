import ButtonOutline from "./ButtonOutline";
import Logo from "./Logo";

const Header = () => {
  return (
    <div
      className="flex justify-between card absolute items-center"
      style={{
        height: 48,
        boxSizing: "border-box",
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        marginLeft: 10,
        zIndex: 5,
        top: 15,
        width: "96vw",
        paddingInline: 10,
        marginInline: 30,
      }}
    >
      <div />
      <div
        className="absolute"
        style={{
          left: -10,
          top: -5,
        }}
      >
        <Logo size={54} />
      </div>
      <ButtonOutline maxHeight={40} />
    </div>
  );
};

export default Header;
