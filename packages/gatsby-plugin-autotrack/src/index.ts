export interface HashChangeListener { (hash: string): void; }
export function onhashchange(listener: HashChangeListener): () => void {
  let lastHash = location.hash || '';
  const call = () => {
    const { hash } = location;
    if (lastHash === hash) return;
    lastHash = hash;
    listener(hash);
  };
  const intervalId = window.setInterval(call, 30);
  window.addEventListener('hashchange', call);
  return () => {
    window.clearInterval(intervalId);
    window.removeEventListener('hashchange', call);
  };
}
