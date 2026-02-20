import "./ProgressWidget.css"

export function ProgressWidget() {
  return (
    <>
      <ul className="progress">
        <li className="progress__item">
          <div className="progress__item__position">1</div>
          <p className="progress__item__name">Билеты</p>
        </li>
        <li className=" progress__item beforeactive ">
          <div className="progress__item__position">2</div>
          <p className="progress__item__name">Пассажиры</p>
        </li>
        <li className="progress__item active">
          <div className="progress__item__position">3</div>
          <p className="progress__item__name">Оплата</p>
        </li>
        <li className="progress__item ">
          <div className="progress__item__position">4</div>
          <p className="progress__item__name">Проверка</p>
        </li>
      </ul>
    </>
  );
}
