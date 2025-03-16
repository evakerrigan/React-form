import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Форма без контроля</Link>
          </li>
          <li>
            <Link to="/react-hook-form">Форма с React Hook Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
