export function DirectionInputs() {
  return (
    <>
      <div className="direction">
        <label htmlFor="">Направление</label>
        <div className="direction__inputs">
          <div className="direction__input direction__input--from">
            <input
              type="text"
              className="direction__input-field"
              placeholder="Откуда"
            />
            <img src="/icons/Vector.png" alt="" className="direction__icon" />
          </div>
          <img
            src="/icons/ic_cached_white_48dp.png"
            alt=""
            className="direction__switcher"
          />
          <div className="direction__input direction__input--from">
            <input
              type="text"
              className="direction__input-field"
              placeholder="Куда"
            />
            <img src="/icons/Vector.png" alt="" className="direction__icon" />
          </div>
        </div>
      </div>
    </>
  );
}
