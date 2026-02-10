import { CrmService } from './crm-service';
import { contactRepository, dealRepository, funnelRepository, noteRepository } from '@/adapters/outbound/prisma-repositories';

export const crmService = new CrmService(contactRepository, dealRepository, funnelRepository, noteRepository);
