import { prisma } from '@/infrastructure/prisma';
import { ContactRepository, DealRepository, FunnelRepository, NoteRepository } from '@/ports/repositories';

export const contactRepository: ContactRepository = {
  list: () => prisma.contact.findMany({ orderBy: { createdAt: 'desc' } }),
  getById: (id) => prisma.contact.findUnique({ where: { id } }),
  create: (input) => prisma.contact.create({ data: input }),
  update: (id, input) => prisma.contact.update({ where: { id }, data: input }),
  delete: async (id) => { await prisma.contact.delete({ where: { id } }); },
};

export const dealRepository: DealRepository = {
  list: () => prisma.deal.findMany({ orderBy: { createdAt: 'desc' } }),
  getById: (id) => prisma.deal.findUnique({ where: { id } }),
  create: (input) => prisma.deal.create({ data: input }),
  update: (id, input) => prisma.deal.update({ where: { id }, data: input }),
  delete: async (id) => { await prisma.deal.delete({ where: { id } }); },
};

export const funnelRepository: FunnelRepository = {
  listColumns: () => prisma.funnelColumn.findMany({ orderBy: { order: 'asc' } }),
  createColumn: async (name) => {
    const max = await prisma.funnelColumn.aggregate({ _max: { order: true } });
    return prisma.funnelColumn.create({ data: { name, order: (max._max.order ?? -1) + 1 } });
  },
  updateColumn: (id, name) => prisma.funnelColumn.update({ where: { id }, data: { name } }),
  deleteColumn: async (id) => { await prisma.funnelColumn.delete({ where: { id } }); },
  reorderColumns: async (ids) => {
    await Promise.all(ids.map((id, order) => prisma.funnelColumn.update({ where: { id }, data: { order } })));
  },
};

export const noteRepository: NoteRepository = {
  list: (entityType, entityId) => prisma.note.findMany({ where: { entityType, entityId }, orderBy: { createdAt: 'desc' } }),
  create: (entityType, entityId, content) => prisma.note.create({ data: { entityType, entityId, content } }),
};
