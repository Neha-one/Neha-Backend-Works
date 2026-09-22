import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import Empytodo from "./components/Empytodo";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemFromServer,
  markItemCompletedOnServer,
} from "./services/ItemServices";
import { useEffect, useState } from "react";

function App() {
  const [itemVal, setItemVal] = useState([]);

  useEffect(() => {
    getItemFromServer()
      .then((initialItems) => {
        setItemVal(initialItems);
      })
      .catch((error) => {
        console.error("Failed to load todos", error);
      });
  }, []);

  const onNewItem = async (itemName, itemDate) => {
    const serverItem = await addItemToServer(itemName, itemDate);
    setItemVal((previousItems) => [...previousItems, serverItem]);
  };

  const handleDeleteBtn = async (id) => {
    await deleteItemFromServer(id);
    setItemVal((previousItems) => previousItems.filter((item) => item.id !== id));
  };

  const handleToggleComplete = async (id) => {
    const updatedItem = await markItemCompletedOnServer(id);

    setItemVal((previousItems) =>
      previousItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const sortedItems = [...itemVal].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-[0_30px_90px_rgba(14,116,144,0.35)] backdrop-blur-xl">
        <div className="border-b border-white/10 bg-slate-900/60 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
          <AppName totalTodos={itemVal.length} />
        </div>

        <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
          <AddTodo handleNewItem={onNewItem} />

          {sortedItems.length === 0 ? (
            <Empytodo />
          ) : (
            <TodoItems
              listItem={sortedItems}
              onDeleteClick={handleDeleteBtn}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
