import { crmService } from '@/application/container';
import { fail, ok } from './http';

export async function getDeals() { try { return ok(await crmService.listDeals()); } catch (e) { return fail(e); } }
export async function postDeal(request: Request) { try { return ok(await crmService.createDeal(await request.json()), 201); } catch (e) { return fail(e); } }
export async function getDeal(id: string) { try { return ok(await crmService.getDeal(id)); } catch (e) { return fail(e); } }
export async function putDeal(id: string, request: Request) { try { return ok(await crmService.updateDeal(id, await request.json())); } catch (e) { return fail(e); } }
export async function deleteDeal(id: string) { try { await crmService.deleteDeal(id); return ok({ deleted: true }); } catch (e) { return fail(e); } }
export async function moveDeal(id: string, request: Request) { try { const { columnId } = await request.json(); return ok(await crmService.moveDeal(id, columnId)); } catch (e) { return fail(e); } }
