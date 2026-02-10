'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Table } from 'react-bootstrap';

type Contact = { id: string; name: string; email: string; phone?: string; company?: string };

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });

  const load = async () => setContacts(await (await fetch('/api/contacts')).json());
  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    const r = await fetch('/api/contacts', { method: 'POST', body: JSON.stringify(form) });
    if (!r.ok) setError('Error al crear');
    await load();
  };

  const importCsv = async (file?: File) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/contacts/import-csv', { method: 'POST', body: fd });
    if (!r.ok) setError('CSV inválido');
    await load();
  };

  const handleCsvChange = (event: ChangeEvent<HTMLInputElement>) => {
    importCsv(event.currentTarget.files?.[0]);
  };

  return (
    <Container className="py-4">
      <h1>Contactos</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="mb-3 d-flex gap-2">
        <Form.Control
          placeholder="Nombre"
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
        />
        <Form.Control
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
        />
        <Button type="button" onClick={submit}>
          Guardar
        </Button>
        <Form.Control type="file" accept=".csv" onChange={handleCsvChange} />
      </Form>
      <Table striped>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
