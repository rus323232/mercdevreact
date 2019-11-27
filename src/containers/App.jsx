import React from 'react';
import { observer, inject } from 'mobx-react';

import { StoreTypes } from '../store';
import ContentHolder from '../components/ContentHolder';

function App(props) {
  const store = props[StoreTypes.TasksStore];

  return (
    <ContentHolder>
      <header>
        <h2>
          {store.tasksWhichIsDone.map(task => (
            <div key={task.id}>
              {task.title}
            </div>
          ))}
        </h2>
      </header>
      <main>
        <h2> main </h2>
      </main>
      <footer>
        <h2> footer </h2>
      </footer>
    </ContentHolder>
  );
}

export default inject(StoreTypes.TasksStore)(observer(App));
