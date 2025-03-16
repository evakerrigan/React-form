// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import uncontrolledFormReducer from '../store/uncontrolledFormSlice';

export const UncontrolledForm: React.FC = () => {
  // const [formData, setFormData] = useState({});
  // const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(uncontrolledFormReducer.actions.setFormData(formData));
  // };

  return (
    <>
      <div>UncontrolledForm</div>
    </>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={formData.name || ''}
    //     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //     placeholder="Введите имя"
    //   />
    //   <button type="submit">Отправить</button>
    // </form>
  );
};
