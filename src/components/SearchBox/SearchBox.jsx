import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {  
  
  const dispatch = useDispatch();  

  return (
    <div className={s.container}>
      <label className={s.label}>
       <span className={s.span}>Find contacts by name</span>
        <input
        className={s.input}        
        type='text'
        onChange={e => dispatch(changeFilter(e.target.value))}
        />
        </label>
    </div>
  );
};

export default SearchBox;