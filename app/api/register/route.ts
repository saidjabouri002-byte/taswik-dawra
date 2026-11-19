import { registrationSchema } from '@/lib/registration';
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(!origin || origin!==new URL(request.url).origin) return Response.json({message:'طلب غير مسموح.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json')) return Response.json({message:'صيغة غير مدعومة.'},{status:415});
 try {
  const text=await request.text();
  if(new TextEncoder().encode(text).length>4096) return Response.json({message:'الطلب أكبر من المسموح.'},{status:413});
  let payload:unknown;
  try { payload=JSON.parse(text); } catch {return Response.json({message:'يرجى مراجعة بيانات التسجيل.'},{status:400});}
  const parsed=registrationSchema.safeParse(payload);
  if(!parsed.success)return Response.json({message:'يرجى مراجعة بيانات التسجيل.'},{status:400});
  const endpoint=process.env.REGISTRATION_WEBHOOK_URL;
  const token=process.env.REGISTRATION_WEBHOOK_TOKEN;
  if(!endpoint || !token)return Response.json({message:'التسجيل غير متاح حالياً. يرجى المحاولة لاحقاً.'},{status:503});
  if(new URL(endpoint).protocol!=='https:')throw new Error('HTTPS required');
  const data={name:parsed.data.name,email:parsed.data.email,phone:parsed.data.phone};
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({...data,course:'التسويق ببساطة'}),signal:AbortSignal.timeout(10000),redirect:'error'});
  if(!response.ok)throw new Error('Registration provider rejected');
  return Response.json({message:'تم تسجيلك بنجاح. شكراً لانضمامك!'});
 } catch {return Response.json({message:'تعذر إرسال التسجيل. يرجى المحاولة مجدداً.'},{status:502});}
}
