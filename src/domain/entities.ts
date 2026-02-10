export type EntityType = 'contact' | 'deal';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  id: string;
  title: string;
  valueEur: number;
  contactId?: string | null;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FunnelColumn {
  id: string;
  name: string;
  order: number;
}

export interface Note {
  id: string;
  entityType: EntityType;
  entityId: string;
  content: string;
  createdAt: Date;
}
