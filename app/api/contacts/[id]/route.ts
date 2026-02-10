import { deleteContact, getContact, putContact } from '@/adapters/inbound/api/contacts-handlers';
export async function GET(_: Request, { params }: { params: { id: string } }) { return getContact(params.id); }
export async function PUT(req: Request, { params }: { params: { id: string } }) { return putContact(params.id, req); }
export async function DELETE(_: Request, { params }: { params: { id: string } }) { return deleteContact(params.id); }
