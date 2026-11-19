import { z } from 'zod';
export const registrationSchema = z.object({name:z.string().trim().min(2,'يرجى إدخال اسمك الكامل.').max(100,'الاسم طويل جداً.'),email:z.email('يرجى إدخال بريد إلكتروني صحيح.').max(254),phone:z.string().trim().refine(v=>v===''||/^(?:\+966|00966|0)?5\d{8}$/.test(v.replace(/[\s-]/g,'')),'يرجى إدخال رقم جوال سعودي صحيح.').transform(v=>v?'+966'+v.replace(/[\s-]/g,'').replace(/^(?:\+966|00966|0)/,''):''),website:z.string().max(0).optional()});
export type Registration = z.infer<typeof registrationSchema>;
