'use client';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type ColT = { id: string; name: string; order: number };
type Deal = { id: string; title: string; valueEur: number; columnId: string };

export default function DealsPage() {
  const [columns, setColumns] = useState<ColT[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [name, setName] = useState('');

  const load = async () => {
    setColumns(await (await fetch('/api/funnel/columns')).json());
    setDeals(await (await fetch('/api/deals')).json());
  };
  useEffect(() => { load(); }, []);

  const onDragEnd = async (res: any) => {
    if (!res.destination) return;
    await fetch(`/api/deals/${res.draggableId}/move`, { method: 'PUT', body: JSON.stringify({ columnId: res.destination.droppableId }) });
    load();
  };

  return <Container className="py-4"><h1>Deals</h1>
    <Form className="d-flex gap-2 mb-3"><Form.Control placeholder="Nueva columna" onChange={(e) => setName(e.target.value)} /><Button type="button" onClick={async()=>{await fetch('/api/funnel/columns',{method:'POST',body:JSON.stringify({name})});load();}}>Agregar columna</Button></Form>
    <DragDropContext onDragEnd={onDragEnd}><Row>{columns.map((col) => <Col key={col.id}><Card><Card.Header>{col.name}</Card.Header><Card.Body><Droppable droppableId={col.id}>{(p)=><div ref={p.innerRef} {...p.droppableProps}>{deals.filter((d)=>d.columnId===col.id).map((d,idx)=><Draggable key={d.id} draggableId={d.id} index={idx}>{(dp)=><Card ref={dp.innerRef} {...dp.draggableProps} {...dp.dragHandleProps} className="mb-2"><Card.Body>{d.title} - €{d.valueEur}</Card.Body></Card>}</Draggable>)}{p.placeholder}</div>}</Droppable></Card.Body></Card></Col>)}</Row></DragDropContext>
  </Container>;
}
