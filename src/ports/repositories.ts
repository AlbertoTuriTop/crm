import { Contact, Deal, EntityType, FunnelColumn, Note } from '@/domain/entities';

export interface ContactRepository {
  list(): Promise<Contact[]>;
  getById(id: string): Promise<Contact | null>;
  create(input: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact>;
  update(id: string, input: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Contact>;
  delete(id: string): Promise<void>;
}

export interface DealRepository {
  list(): Promise<Deal[]>;
  getById(id: string): Promise<Deal | null>;
  create(input: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal>;
  update(id: string, input: Partial<Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Deal>;
  delete(id: string): Promise<void>;
}

export interface FunnelRepository {
  listColumns(): Promise<FunnelColumn[]>;
  createColumn(name: string): Promise<FunnelColumn>;
  updateColumn(id: string, name: string): Promise<FunnelColumn>;
  deleteColumn(id: string): Promise<void>;
  reorderColumns(ids: string[]): Promise<void>;
}

export interface NoteRepository {
  list(entityType: EntityType, entityId: string): Promise<Note[]>;
  create(entityType: EntityType, entityId: string, content: string): Promise<Note>;
}
