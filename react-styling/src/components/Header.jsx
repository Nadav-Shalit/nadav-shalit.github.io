import logo from "../assets/logo.png";

export default function Headr() {
  return (
    <header className="flex flex-col items-center mt-8 md:mt-16">
      <img
        src={logo}
        alt="A canvas"
        className="object-contain mb-8 w-44 h-44 "
      />
      <h1 className="text-center  text-xl md:text-4xl uppercase tracking-widest text-amber-600 font-semibold font-title">
        ReactArt
      </h1>
      <p className="text-stone-500">A community of artists and art-lovers.</p>
    </header>
  );
}
