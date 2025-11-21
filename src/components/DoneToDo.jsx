import React from 'react';
import { Alert, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { AiOutlineDelete } from 'react-icons/ai';

const DoneToDo = ({ doneToDos, onDeleteToDo }) => {
  return (
    <div className="">
      {doneToDos.length !== 0 ? (
        <ListGroup>
          {doneToDos.map((todo) => (
            <ListGroupItem key={todo} className="d-flex justify-content-between align-items-center">
              <p className="mb-0">{todo}</p>
              <Button onClick={() => onDeleteToDo(todo)} color="danger" data-testid="delete">
                <AiOutlineDelete />
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <Alert color="warning">Halicha todo qo'shilmagan</Alert>
      )}
    </div>
  );
};

export default React.memo(DoneToDo);
