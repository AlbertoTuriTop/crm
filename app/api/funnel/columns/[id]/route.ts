import { deleteColumn, putColumn } from '@/adapters/inbound/api/funnel-handlers';
export async function PUT(req: Request, { params }: { params: { id: string } }) { return putColumn(params.id, req); }
export async function DELETE(_: Request, { params }: { params: { id: string } }) { return deleteColumn(params.id); }
