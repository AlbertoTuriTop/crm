import { moveDeal } from '@/adapters/inbound/api/deals-handlers';
export async function PUT(req: Request, { params }: { params: { id: string } }) { return moveDeal(params.id, req); }
