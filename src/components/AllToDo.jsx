import React from 'react';
import { Alert, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai';

const AllToDo = ({ todos, confirmHandler, editToDo }) => {
  return (
    <div className="">
      {todos.length !== 0 ? (
        <ListGroup>
          {todos.map((todo) => (
            <ListGroupItem key={todo} className="d-flex justify-content-between align-items-center mb-3">
              <p className="mb-0">{todo}</p>
              <div className="actions d-flex justify-content-between align-items-center">
                <Button onClick={() => confirmHandler(todo)} color="success" className="me-2" data-testid="complete">
                  <AiOutlineCheck />
                </Button>
                <Button onClick={() => editToDo(todo)} color="primary">
                  <AiOutlineEdit />
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <Alert color="warning">Todoga hali ma'lumotlar kiritilmagan</Alert>
      )}
    </div>
  );
};

export default React.memo(AllToDo);
