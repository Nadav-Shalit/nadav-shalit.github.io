export default function TaxonomyItem({ data }) {
  return (
    <section className=" flex flex-col p-2 m-2 w-60 text-center bg-red-100 rounded-md text-black-200">
      <div className="flex justify-center items-center">
        <div className="relative">
          <img
            src={data.imgSrc}
            className="w-64 h-44 object-contain justify-center"
          />
          <span className="font-extrabold absolute top-3/4 pl-3 left-0 text-white text-nowrap overflow-hidden truncate w-full text-left">
            {data.name}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-2">
        <p className="font-semibold">
          Events
          <span id="events" className="font-thin p-2">
            {data.events}
          </span>
        </p>
        <p className="font-semibold">
          Performers
          <span id="performers" className="font-thin p-2">
            {data.perfomers}
          </span>
        </p>
      </div>
    </section>
  );
}
