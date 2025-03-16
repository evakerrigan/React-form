// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import reactHookFormReducer from '../store/reactHookFormSlice';

export const ReactHookForm: React.FC = () => {
  // const [formValues, setFormValues] = useState({});
  // const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(reactHookFormReducer.actions.setFormValues(formValues));
  //   // Здесь можно добавить логику отправки формы
  // };

  return (
    <>
      <div>ReactHookForm</div>
    </>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={formValues.name || ''}
    //     onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
    //     placeholder="Введите имя"
    //   />
    //   <button type="submit">Отправить</button>
    // </form>
  );
};
