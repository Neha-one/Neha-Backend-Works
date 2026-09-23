import TodoItem from "./TodoItem";

const TodoItems = ({ listItem, onDeleteClick, onToggleComplete }) => {
  return (
    <div className="mt-8 space-y-4">
      {listItem.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          itemName={item.itemName}
          itemDate={item.itemDate}
          onDeleteClick={onDeleteClick}
          onToggleComplete={onToggleComplete}
          completed={item.completed}
        />
      ))}
    </div>
  );
};

export default TodoItems;