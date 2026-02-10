import Papa from 'papaparse';
import { crmService } from '@/application/container';
import { fail, ok } from './http';

export async function getContacts() { try { return ok(await crmService.listContacts()); } catch (e) { return fail(e); } }
export async function postContact(request: Request) { try { return ok(await crmService.createContact(await request.json()), 201); } catch (e) { return fail(e); } }
export async function getContact(id: string) { try { return ok(await crmService.getContact(id)); } catch (e) { return fail(e); } }
export async function putContact(id: string, request: Request) { try { return ok(await crmService.updateContact(id, await request.json())); } catch (e) { return fail(e); } }
export async function deleteContact(id: string) { try { await crmService.deleteContact(id); return ok({ deleted: true }); } catch (e) { return fail(e); } }

export async function importContactsCsv(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return fail(new Error('CSV requerido'));
    const parsed = Papa.parse<Record<string, string>>(await file.text(), { header: true, skipEmptyLines: true });
    if (parsed.errors.length) return fail(new Error('CSV inválido'));
    const created = [];
    for (const row of parsed.data) {
      if (!row.name || !row.email) return fail(new Error('CSV inválido'));
      created.push(await crmService.createContact({ name: row.name, email: row.email, phone: row.phone, company: row.company }));
    }
    return ok({ created: created.length }, 201);
  } catch (e) { return fail(e); }
}
