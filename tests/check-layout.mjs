import { chromium } from '@playwright/test';
const browser = await chromium.launch({channel:'chrome',headless:true});
const page = await browser.newPage();
const failures=[];
page.on('pageerror',e=>failures.push(e.message));
for(const width of [320,375,390,414,768,1024,1440]){
 await page.setViewportSize({width,height:1000});
 await page.goto('http://localhost:3100',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 if(overflow)failures.push(`Overflow ${width}`);
 console.log(JSON.stringify({width,overflow,h1:await page.locator('h1').count(),sections:await page.locator('main>section').count()}));
 if([390,1440].includes(width)){await page.screenshot({path:`research/site-${width}.png`,fullPage:true});await page.screenshot({path:`research/hero-${width}.png`});}
}
await page.setViewportSize({width:390,height:844});
await page.getByRole('button',{name:'فتح القائمة'}).click();
await page.locator('#mobile-menu').getByRole('link',{name:'ماذا ستتعلم؟'}).click();
if(await page.locator('#mobile-menu').count())failures.push('Mobile menu did not close');
await page.locator('#question-3').click();
if(await page.locator('#question-3').getAttribute('aria-expanded')!=='true')failures.push('FAQ did not open');
await page.locator('#register').scrollIntoViewIfNeeded();
await page.getByRole('button',{name:'سجّل اهتمامك مجاناً'}).click();
if(!await page.locator('#name-error').isVisible())failures.push('Name validation missing');
if(!await page.locator('#email-error').isVisible())failures.push('Email validation missing');
await page.locator('#name').fill('اختبار التسجيل');await page.locator('#email').fill('test@example.com');
await page.getByRole('button',{name:'سجّل اهتمامك مجاناً'}).click();
await page.getByRole('alert').waitFor();
if(await page.getByText('تم تسجيل اهتمامك بنجاح!').count())failures.push('False registration success');
const api=await page.evaluate(async()=>{const call=async(body,headers={})=>{const r=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});return r.status};return {invalid:await call({name:'a',email:'bad'}),unconfigured:await call({name:'اختبار',email:'test@example.com',phone:'',website:''}),honeypot:await call({name:'اختبار',email:'test@example.com',phone:'',website:'spam'})}});
if(api.invalid!==400||api.unconfigured!==503||api.honeypot!==400)failures.push('API validation: '+JSON.stringify(api));
await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://localhost:3100');if(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)!=='auto')failures.push('Reduced motion');
console.log(JSON.stringify({api,failures}));await browser.close();if(failures.length)process.exit(1);
