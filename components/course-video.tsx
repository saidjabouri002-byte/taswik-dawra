import Image from 'next/image';
import { Play, Film } from 'lucide-react';
import { courseVideo } from '@/lib/course-video';

export function CourseVideo() {
  return (
    <figure className="vsl" aria-label="الفيديو التعريفي بدورة التسويق ببساطة">
      <div className="vsl-frame">
        {courseVideo.src ? (
          courseVideo.kind === 'embed' ? (
            <iframe
              src={courseVideo.src}
              title="الفيديو التعريفي بدورة التسويق ببساطة"
              allow="encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video controls playsInline preload="metadata" poster={courseVideo.poster} aria-label="الفيديو التعريفي بدورة التسويق ببساطة">
              <source src={courseVideo.src} />
              {courseVideo.captions && <track kind="captions" src={courseVideo.captions} srcLang="ar" label="العربية" default />}
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          )
        ) : (
          <div className="vsl-placeholder">
            <div className="vsl-topline"><span><Film size={14} />التسويق ببساطة</span><span className="vsl-coming">قريباً</span></div>
            <div className="vsl-orbit" aria-hidden="true" />
            <div className="vsl-portrait" aria-hidden="true"><Image src="/omar-cutout.png" alt="" fill sizes="(max-width: 600px) 45vw, 340px" priority /></div>
            <span className="vsl-play" aria-hidden="true"><Play size={30} fill="currentColor" strokeWidth={1} /></span>
            <div className="vsl-cover-copy">
              <h2>قرارات أوضح.<br />تسويق أبسط.</h2>
              <p>مع عمر العسبلي</p>
            </div>
            <div className="vsl-bottomline"><span>الفيديو التعريفي قريباً</span><span className="vsl-line" aria-hidden="true" /></div>
          </div>
        )}
      </div>
    </figure>
  );
}
