export default function CustomButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded text-cyan-300 hover:text-cyan-100 font-semibold text-xs md:text-base"
    >
      {children}
    </button>
  );
}
