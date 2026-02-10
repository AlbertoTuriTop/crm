import { deleteDeal, getDeal, putDeal } from '@/adapters/inbound/api/deals-handlers';
export async function GET(_: Request, { params }: { params: { id: string } }) { return getDeal(params.id); }
export async function PUT(req: Request, { params }: { params: { id: string } }) { return putDeal(params.id, req); }
export async function DELETE(_: Request, { params }: { params: { id: string } }) { return deleteDeal(params.id); }
