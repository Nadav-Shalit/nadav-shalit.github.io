export default function CustomInput({ label, textarea, ...props }) {
  const inputClassName =
    'className="w-full p-1 border-b-2 rounded-sm border-blue-300 bg-gray-100 text-blue-600 focus:outline-none focus:border-blue-600';

  return (
    <p className="flex flex-col py-4 gap-1 ">
      <label className="text-sm font-bold uppercase text-cyan-500 p-1">
        {label}
      </label>
      {textarea ? (
        <textarea {...props} className={inputClassName} />
      ) : (
        <input type="text" {...props} className={inputClassName} />
      )}
    </p>
  );
}
