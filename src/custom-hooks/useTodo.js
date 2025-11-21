import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useTodo = () => {
  const [allToDos, setAllToDos] = useState([]);
  const [doneToDos, setDoneToDos] = useState([]);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");

  const addToDo = useCallback(() => {
    if (allToDos.includes(value) || !value) {
      toast.error("Bu todo sizda mavjud");
    } else {
      setAllToDos([...allToDos, value]);
    }
    setValue("");
  }, [allToDos, value]);

  const confirmToDo = useCallback(
    (todo) => {
      setDoneToDos([...doneToDos, todo]);
      setAllToDos(allToDos.filter((item) => item !== todo));
    },
    [doneToDos, allToDos]
  );

  const deleteToDo = useCallback(
    (todo) => {
      setDoneToDos(doneToDos.filter((item) => item !== todo));
    },
    [doneToDos]
  );

  const editToDo = useCallback((todo) => {
    setValue(todo);
    setSelected(todo);
  }, []);

  const saveToDo = useCallback(() => {
    setAllToDos(
      allToDos.map((item) => {
        if (item === selected) {
          return value;
        } else {
          return item;
        }
      })
    );
    setSelected("");
    setValue("");
  }, [allToDos, value, selected]);

  const handleInput = useCallback(
    (e) => {
      e.preventDefault();
      setValue(e.target.value);
    },
    [value]
  );
  return [
    allToDos,
    doneToDos,
    value,
    selected,
    handleInput,
    saveToDo,
    editToDo,
    deleteToDo,
    confirmToDo,
    addToDo,
  ];
};

export default useTodo;
