import imgSrc from "../../../assets/seatgeek-def_280-210.png";
export default function TaxonomyMenu({ data, filter, parentId }) {
  const classesActive =
    "inline-block p-2 bg-red-500 text-black rounded-t-lg active  ";
  const classesInActive =
    "inline-block p-2 rounded-t-lg  hover:bg-gray-800 hover:text-red-400  ";
  const imgClasses = "w-16 h-12 object-contain ";
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center  border-b border-red-800 ">
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
