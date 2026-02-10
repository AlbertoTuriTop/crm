import { CrmService } from '@/application/crm-service';

test('crm service validates contact', async () => {
  const s = new CrmService({ list: async()=>[], getById: async()=>null, create: async(i:any)=>({ id:'1', createdAt:new Date(), updatedAt:new Date(), ...i}), update: async()=>{throw 0;}, delete: async()=>{} }, {list:async()=>[],getById:async()=>null,create:async(i:any)=>({id:'1',createdAt:new Date(),updatedAt:new Date(),...i}),update:async(i:any,j:any)=>({id:i,createdAt:new Date(),updatedAt:new Date(),...j}),delete:async()=>{}},{listColumns:async()=>[],createColumn:async(name)=>({id:'1',name,order:0}),updateColumn:async(id,name)=>({id,name,order:0}),deleteColumn:async()=>{},reorderColumns:async()=>{}},{list:async()=>[],create:async(entityType,entityId,content)=>({id:'1',entityType,entityId,content,createdAt:new Date()})});
  await expect(s.createContact({ name:'A', email:'a@a.com'})).resolves.toBeDefined();
});
