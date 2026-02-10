'use client';

import { ChangeEvent, DragEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

type FunnelColumn = { id: string; name: string; order: number };
type Deal = { id: string; title: string; valueEur: number; columnId: string };

function DealCard({
  deal,
  onDragStart,
}: {
  deal: Deal;
  onDragStart: (event: DragEvent<HTMLElement>, dealId: string) => void;
}) {
  return (
    <Card
      draggable
      onDragStart={(event) => onDragStart(event, deal.id)}
      className="mb-2"
      style={{ cursor: 'grab' }}
    >
      <Card.Body>
        {deal.title} - €{deal.valueEur}
      </Card.Body>
    </Card>
  );
}

function ColumnDropZone({
  column,
  deals,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
}: {
  column: FunnelColumn;
  deals: Deal[];
  isOver: boolean;
  onDragOver: (event: DragEvent<HTMLElement>, columnId: string) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent<HTMLElement>, columnId: string) => void;
  onDragStart: (event: DragEvent<HTMLElement>, dealId: string) => void;
}) {
  return (
    <Card>
      <Card.Header>{column.name}</Card.Header>
      <Card.Body
        onDragOver={(event) => onDragOver(event, column.id)}
        onDragLeave={onDragLeave}
        onDrop={(event) => onDrop(event, column.id)}
        style={{
          minHeight: 200,
          backgroundColor: isOver ? '#f5faff' : undefined,
          borderRadius: 8,
          transition: 'background-color 0.2s ease',
        }}
      >
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onDragStart={onDragStart} />
        ))}
      </Card.Body>
    </Card>
  );
}

export default function DealsPage() {
  const [columns, setColumns] = useState<FunnelColumn[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  const loadArray = useCallback(async <T,>(url: string): Promise<T[]> => {
    const response = await fetch(url);
    const payload: unknown = await response.json();

    if (!response.ok) {
      throw new Error(`Request failed: ${url}`);
    }

    return Array.isArray(payload) ? (payload as T[]) : [];
  }, []);

  const load = useCallback(async () => {
    try {
      setError('');
      const [loadedColumns, loadedDeals] = await Promise.all([
        loadArray<FunnelColumn>('/api/funnel/columns'),
        loadArray<Deal>('/api/deals'),
      ]);
      setColumns(loadedColumns);
      setDeals(loadedDeals);
    } catch {
      setColumns([]);
      setDeals([]);
      setError('No se pudo cargar el tablero. Revisa la conexión o el servidor.');
    }
  }, [loadArray]);

  useEffect(() => {
    void load();
  }, [load]);

  const dealsByColumn = useMemo(() => {
    const map = new Map<string, Deal[]>();
    for (const column of columns) map.set(column.id, []);
    for (const deal of deals) {
      const bucket = map.get(deal.columnId);
      if (bucket) bucket.push(deal);
    }
    return map;
  }, [columns, deals]);

  const moveDeal = async (dealId: string, destinationColumnId: string) => {
    const draggedDeal = deals.find((deal) => deal.id === dealId);
    if (!draggedDeal || draggedDeal.columnId === destinationColumnId) return;

    await fetch(`/api/deals/${dealId}/move`, {
      method: 'PUT',
      body: JSON.stringify({ columnId: destinationColumnId }),
    });

    await load();
  };

  const handleDragStart = (event: DragEvent<HTMLElement>, dealId: string) => {
    event.dataTransfer.setData('text/deal-id', dealId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event: DragEvent<HTMLElement>, columnId: string) => {
    event.preventDefault();
    setDragOverColumnId(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumnId(null);
  };

  const handleDrop = async (
    event: DragEvent<HTMLElement>,
    destinationColumnId: string,
  ) => {
    event.preventDefault();
    const dealId = event.dataTransfer.getData('text/deal-id');
    setDragOverColumnId(null);

    if (!dealId) return;
    await moveDeal(dealId, destinationColumnId);
  };

  const handleColumnNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleAddColumn = async () => {
    if (!name.trim()) return;

    await fetch('/api/funnel/columns', {
      method: 'POST',
      body: JSON.stringify({ name: name.trim() }),
    });

    setName('');
    await load();
  };

  return (
    <Container className="py-4">
      <h1>Deals</h1>
      {error && <p className="text-danger">{error}</p>}
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

      <Row>
        {columns.map((column) => (
          <Col key={column.id}>
            <ColumnDropZone
              column={column}
              deals={dealsByColumn.get(column.id) ?? []}
              isOver={dragOverColumnId === column.id}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
