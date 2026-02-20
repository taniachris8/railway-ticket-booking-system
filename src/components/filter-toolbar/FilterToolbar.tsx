import "./FilterToolbar.css";
import { useState } from "react";

export function FilterToolbar() {
  const [openToolbarSort, setOpenToolbarSort] = useState(false);
  const [selected, setSelected] = useState("времени");
  const [limit, setLimit] = useState("5");

  const sortOptions = ["времени", "стоимости", "длительности"];
  const limits = ["5", "10", "20"];

  return (
    <div className="toolbar">
      <p className="toolbar__results">найдено 20</p>

      <div className="toolbar__controls">
        <div className="toolbar__sort">
          сортировать по:
          <div className="toolbar__sort__container">
            {!openToolbarSort ? (
              <>
                <div
                  className="toolbar__sort__selected"
                  onClick={() => setOpenToolbarSort(!openToolbarSort)}>
                  {selected}
                </div>
              </>
            ) : (
              <>
                <ul className="toolbar__sort__list">
                  {sortOptions.map((option) => (
                    <li
                      key={option}
                      className={
                        selected === option
                          ? "toolbar__sort__item active"
                          : "toolbar__sort__item"
                      }
                      onClick={() => {
                        setSelected(option);
                        setOpenToolbarSort(false);
                      }}>
                      <p>{option}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="toolbar__limit">
          <span className="toolbar__limit-text">показывать по: </span>
          {limits.map((l) => (
            <button
              onClick={() => setLimit(l)}
              className={
                limit === l
                  ? "toolbar__limit-option active"
                  : "toolbar__limit-option"
              }>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
