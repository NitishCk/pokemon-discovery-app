import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PokemonCard from '../components/PokemonCard';

export default function CollectionPage({ collection, setCollection }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newCollection = Array.from(collection);
    const [moved] = newCollection.splice(result.source.index, 1);
    newCollection.splice(result.destination.index, 0, moved);
    setCollection(newCollection);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="collection" direction="horizontal">
        {(provided) => (
          <div
            className="grid-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {collection.map((p, index) => (
              <Draggable key={p.id} draggableId={p.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PokemonCard pokemon={p} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
