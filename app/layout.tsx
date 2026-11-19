import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400','500','600','700'], variable: '--font-arabic', display: 'swap' });
export const metadata: Metadata = { title: 'التسويق ببساطة | عمر العسبلي', description: 'تعلّم كيف تفهم سوقك وتحدد عملاءك وتبني خطة تسويقية واضحة لمشروعك. دورة التسويق ببساطة مع عمر العسبلي.', openGraph: {title:'التسويق ببساطة', description:'من التخمين إلى خطة تسويقية واضحة.',locale:'ar_SA',type:'website'}, robots: {index:true,follow:true} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ar" dir="rtl"><body className={arabic.variable}><a className="skip-link" href="#main">انتقل إلى المحتوى</a>{children}</body></html>}
