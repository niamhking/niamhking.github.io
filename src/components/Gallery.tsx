import { useCallback, useEffect, useRef, useState } from 'react';

export type GalleryImage = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

type Props = {
  images: GalleryImage[];
  /** `phone` renders each shot inside a device bezel. */
  device?: 'phone' | 'flat';
  label: string;
};

/**
 * Thumbnail strip plus a lightbox.
 *
 * The overlay is a native <dialog> opened with showModal(), which gives focus
 * trapping, inertness of the page behind it, and Escape-to-close from the
 * platform rather than from hand-written key handling. Only the arrow-key
 * navigation and the close-on-backdrop behaviour are ours.
 */
export default function Gallery({ images, device = 'flat', label }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const current = index === null ? undefined : images[index];

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((prev) => {
        if (prev === null) return prev;
        return (prev + delta + images.length) % images.length;
      });
    },
    [images.length]
  );

  // Open/close the real dialog in step with React state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIndex(null);
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, step]);

  const isPhone = device === 'phone';

  return (
    <>
      <ul
        aria-label={label}
        className={
          isPhone
            ? // Horizontal scroll-snap on phones, wrapping grid from `sm` up.
              '-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3'
            : '-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0'
        }
      >
        {images.map((image, i) => (
          <li
            key={image.src}
            className={
              isPhone
                ? 'w-[min(62vw,13rem)] shrink-0 snap-center sm:w-auto'
                : 'w-[min(82vw,26rem)] shrink-0 snap-center sm:w-auto'
            }
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full cursor-zoom-in text-left"
              aria-label={`Open larger view: ${image.alt}`}
            >
              <span
                className={
                  isPhone
                    ? 'block overflow-hidden rounded-[1.6rem] border-[6px] border-ink/85 bg-ink/85 shadow-card transition-transform duration-200 group-hover:-translate-y-1'
                    : // The source images have very different shapes — a wide screen strip, a
                      // tall prototype sheet. Each sits in a fixed 4:3 box and is contained
                      // rather than cropped, so nothing is cut off and the grid lines up.
                      'flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-line bg-sunken p-3 shadow-card transition-transform duration-200 group-hover:-translate-y-1'
                }
              >
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={isPhone ? '(min-width: 640px) 20rem, 62vw' : '(min-width: 640px) 26rem, 82vw'}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className={
                    isPhone
                      ? 'block w-full rounded-[1.1rem]'
                      : 'max-h-full w-auto max-w-full rounded-md object-contain'
                  }
                />
              </span>
              {image.caption && (
                <span className="mt-2.5 block text-[0.82rem] leading-snug text-faint">
                  {image.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        // Clicking the backdrop (the dialog element itself, outside the figure) closes.
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        // `m-auto` restores the centring that Tailwind's preflight margin reset
        // removes from the native dialog.
        className="m-auto max-h-[92dvh] w-[min(94vw,56rem)] rounded-2xl bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        aria-label={current?.alt ?? label}
      >
        {current && (
          <figure className="card m-0 overflow-hidden">
            <img
              src={current.src}
              srcSet={current.srcSet}
              sizes="(min-width: 640px) 52rem, 94vw"
              width={current.width}
              height={current.height}
              alt={current.alt}
              className="block max-h-[72dvh] w-full bg-sunken object-contain"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
              <span className="text-sm text-muted">{current.caption ?? current.alt}</span>

              <span className="flex items-center gap-1">
                <span className="mr-2 font-mono text-xs text-faint">
                  {(index ?? 0) + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-sunken"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-sunken"
                  aria-label="Next image"
                >
                  ›
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="ml-1 flex h-9 items-center justify-center rounded-lg border border-line px-3 text-sm font-medium text-ink transition-colors hover:bg-sunken"
                >
                  Close
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
