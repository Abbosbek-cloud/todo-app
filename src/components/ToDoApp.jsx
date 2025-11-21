import React from 'react';
import useTodo from '../custom-hooks/useTodo';
import AddToDo from './AddToDo';
import AllToDo from './AllToDo';
import DoneToDo from './DoneToDo';
import Process from './Process';

const ToDoApp = () => {
  const [allToDos, doneToDos, value, selected, handleInput, saveToDo, editToDo, deleteToDo, confirmToDo, addToDo] =
    useTodo([], [], '', '');
  const percent = (doneToDos.length / (allToDos.length + doneToDos.length)) * 100 || 0;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <AddToDo
              handleInput={handleInput}
              addToDo={addToDo}
              value={value}
              selected={selected}
              saveToDo={saveToDo}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-12 col-lg-8">
            <Process percent={percent} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-6 ">
            <AllToDo todos={allToDos} confirmHandler={confirmToDo} editToDo={editToDo} />
          </div>
          <div className="col-12 col-lg-6 ">
            <DoneToDo doneToDos={doneToDos} onDeleteToDo={deleteToDo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ToDoApp);
