import { crmService } from '@/application/container';
import { fail, ok } from './http';

export async function getColumns() { try { return ok(await crmService.listColumns()); } catch (e) { return fail(e); } }
export async function postColumn(request: Request) { try { const { name } = await request.json(); return ok(await crmService.createColumn(name), 201); } catch (e) { return fail(e); } }
export async function putColumn(id: string, request: Request) { try { const { name } = await request.json(); return ok(await crmService.updateColumn(id, name)); } catch (e) { return fail(e); } }
export async function deleteColumn(id: string) { try { await crmService.deleteColumn(id); return ok({ deleted: true }); } catch (e) { return fail(e); } }
export async function reorderColumns(request: Request) { try { const { ids } = await request.json(); await crmService.reorderColumns(ids); return ok({ reordered: true }); } catch (e) { return fail(e); } }
