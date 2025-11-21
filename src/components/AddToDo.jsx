import React, { useRef } from 'react';
import { InputGroup, InputGroupText } from 'reactstrap';

const AddToDo = ({ handleInput, addToDo, value, selected, saveToDo }) => {
  const target = useRef();

  return (
    <div className="mt-3">
      <InputGroup className="m-auto">
        <input ref={target} className="form-control" placeholder="To do yozing" onChange={handleInput} value={value} />
        <InputGroupText className="btn btn-success" onClick={selected ? saveToDo : addToDo}>
          {selected ? 'Save' : 'Add To Do'}
        </InputGroupText>
      </InputGroup>
    </div>
  );
};

export default React.memo(AddToDo);
