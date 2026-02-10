'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

type FunnelColumn = { id: string; name: string; order: number };
type Deal = { id: string; title: string; valueEur: number; columnId: string };

export default function DealsPage() {
  const [columns, setColumns] = useState<FunnelColumn[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [name, setName] = useState('');

  const load = async () => {
    setColumns(await (await fetch('/api/funnel/columns')).json());
    setDeals(await (await fetch('/api/deals')).json());
  };

  useEffect(() => {
    load();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    await fetch(`/api/deals/${result.draggableId}/move`, {
      method: 'PUT',
      body: JSON.stringify({ columnId: result.destination.droppableId }),
    });

    await load();
  };

  const handleColumnNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleAddColumn = async () => {
    await fetch('/api/funnel/columns', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    setName('');
    await load();
  };

  return (
    <Container className="py-4">
      <h1>Deals</h1>
      <Form className="d-flex gap-2 mb-3">
        <Form.Control
          placeholder="Nueva columna"
          value={name}
          onChange={handleColumnNameChange}
        />
        <Button type="button" onClick={handleAddColumn}>
          Agregar columna
        </Button>
      </Form>

      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {columns.map((column) => (
            <Col key={column.id}>
              <Card>
                <Card.Header>{column.name}</Card.Header>
                <Card.Body>
                  <Droppable droppableId={column.id}>
                    {(provided: DroppableProvided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {deals
                          .filter((deal) => deal.columnId === column.id)
                          .map((deal, index) => (
                            <Draggable key={deal.id} draggableId={deal.id} index={index}>
                              {(draggableProvided: DraggableProvided) => (
                                <Card
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  className="mb-2"
                                >
                                  <Card.Body>
                                    {deal.title} - €{deal.valueEur}
                                  </Card.Body>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </Container>
  );
}
