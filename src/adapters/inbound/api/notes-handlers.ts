import { crmService } from '@/application/container';
import { fail, ok } from './http';

export async function getNotes(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType') as 'contact' | 'deal';
    const entityId = searchParams.get('entityId') ?? '';
    return ok(await crmService.listNotes(entityType, entityId));
  } catch (e) { return fail(e); }
}

export async function postNote(request: Request) {
  try {
    const { entityType, entityId, content } = await request.json();
    return ok(await crmService.createNote(entityType, entityId, content), 201);
  } catch (e) { return fail(e); }
}
