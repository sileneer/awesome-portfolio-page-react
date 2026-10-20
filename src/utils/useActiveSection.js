import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the upper-middle of the viewport so an
 * in-page navigation can highlight it (scrollspy).
 *
 * No-ops gracefully without an IntersectionObserver (e.g. jsdom) — the first
 * section stays active.
 *
 * @param {string[]} ids Section element ids, in document order.
 * @returns {string} The id of the active section.
 */
export const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
};

export default useActiveSection;
