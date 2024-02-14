export default function SideBar({ data, navigate, menuTab }) {
  const classesActive =
    "inline-block p-4 bg-red-500 text-black rounded-t-lg active ";
  const classesInActive =
    "inline-block p-4 rounded-t-lg  dark:hover:bg-gray-800 dark:hover:text-purple-300";

  return (
    <>
      <h2 className="mb-8 font-bold tracking-wider uppercase md:text-lg text-red-400">
        API List
      </h2>
      <ul className="mt-8">
        {data.map((mnu, idx) => {
          return (
            <li key={idx}>
              <button onClick={() => navigate(mnu)}>{mnu}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
