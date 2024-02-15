import imgSrc from "https://www.ndv.co.il/react-proj/seatgeek-api/assets/seatgeek-def_280-210.png";
export default function TaxonomyMenu({ data, filter, parentId }) {
  const classesActive =
    "inline-block xl:p-2 bg-red-500 text-black xl:rounded-t-lg active  ";
  const classesInActive =
    "inline-block xl:p-2 xl:rounded-t-lg  hover:bg-gray-800 hover:text-red-400  ";
  const imgClasses = "w-16 h-12 object-contain hidden xl:block";
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center  border-b border-red-800 gap-2 xl:gap-0 ">
      <li className="me-2">
        <button
          onClick={() => filter(null)}
          className={parentId === null ? classesActive : classesInActive}
        >
          <img src={imgSrc} className={imgClasses} />
          ALL
        </button>
      </li>
      {data.map((mnu, idx) => {
        return (
          <li key={idx} className="me-1 flex justify-items-center">
            <button
              onClick={() => filter(mnu.id)}
              data-parent-id={mnu.id}
              className={parentId === mnu.id ? classesActive : classesInActive}
            >
              <img src={mnu.imgSrc} className={imgClasses} />
              {mnu.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
