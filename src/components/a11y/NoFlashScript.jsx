/**
 * Applies saved accessibility preferences before first paint.
 *
 * Without this, a visitor who chose dark mode or larger text would see a flash
 * of the default theme on every page load. The script is tiny, synchronous and
 * runs in <head>, so it is the one place an inline script is justified.
 */
export default function NoFlashScript() {
  const code = `(function(){try{
    var d=document.documentElement;
    d.classList.remove('no-js');
    var s=JSON.parse(localStorage.getItem('gj_a11y')||'null');
    var prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    var t=(s&&s.theme)||(prefersDark?'dark':'light');
    d.dataset.theme=t;
    if(s){
      d.style.setProperty('--font-scale',String(s.fontScale||1));
      d.dataset.contrast=s.contrast||'normal';
      d.dataset.reduceMotion=String(!!s.reduceMotion);
      d.dataset.underlineLinks=String(!!s.underline);
      d.dataset.dyslexic=String(!!s.dyslexic);
      d.dataset.spacing=s.spacing||'normal';
    }
  }catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
