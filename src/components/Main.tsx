import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/React-form/uncontrolled-form">Форма без контроля</Link>
          </li>
          <li>
            <Link to="/React-form/react-hook-form">
              Форма с React Hook Form
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
