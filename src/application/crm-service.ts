import { z } from 'zod';
import { canAccess } from '@/domain/rules';
import { AppError } from './errors';
import { ContactRepository, DealRepository, FunnelRepository, NoteRepository } from '@/ports/repositories';

const contactSchema = z.object({ name: z.string().min(1), email: z.string().email(), phone: z.string().optional(), company: z.string().optional() });
const dealSchema = z.object({ title: z.string().min(1), valueEur: z.number().int().nonnegative(), contactId: z.string().optional(), columnId: z.string().min(1) });

export class CrmService {
  constructor(
    private contacts: ContactRepository,
    private deals: DealRepository,
    private funnel: FunnelRepository,
    private notes: NoteRepository,
  ) {}

  enforceAccess(email?: string | null) {
    if (!canAccess(email)) throw new AppError('FORBIDDEN', 'Acceso denegado', 403);
  }

  listContacts() { return this.contacts.list(); }
  getContact(id: string) { return this.contacts.getById(id); }
  createContact(input: unknown) { return this.contacts.create(contactSchema.parse(input)); }
  updateContact(id: string, input: unknown) { return this.contacts.update(id, contactSchema.partial().parse(input)); }
  deleteContact(id: string) { return this.contacts.delete(id); }

  listDeals() { return this.deals.list(); }
  getDeal(id: string) { return this.deals.getById(id); }
  createDeal(input: unknown) { return this.deals.create(dealSchema.parse(input)); }
  updateDeal(id: string, input: unknown) { return this.deals.update(id, dealSchema.partial().parse(input)); }
  deleteDeal(id: string) { return this.deals.delete(id); }
  moveDeal(id: string, columnId: string) { return this.deals.update(id, { columnId }); }

  listColumns() { return this.funnel.listColumns(); }
  createColumn(name: string) { if (!name) throw new AppError('VALIDATION', 'Nombre requerido'); return this.funnel.createColumn(name); }
  updateColumn(id: string, name: string) { return this.funnel.updateColumn(id, name); }
  deleteColumn(id: string) { return this.funnel.deleteColumn(id); }
  reorderColumns(ids: string[]) { return this.funnel.reorderColumns(ids); }

  listNotes(entityType: 'contact' | 'deal', entityId: string) { return this.notes.list(entityType, entityId); }
  createNote(entityType: 'contact' | 'deal', entityId: string, content: string) {
    if (!content) throw new AppError('VALIDATION', 'Contenido requerido');
    return this.notes.create(entityType, entityId, content);
  }
}
