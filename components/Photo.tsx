import type { Photo } from '@/config/photos';

interface PhotoProps {
  photo: Photo;
  alt: string;
  /** Matches the CSS width of the rendered image at each breakpoint. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * A plain <picture> over the files produced at build time: AVIF first, WebP
 * next, JPEG last. No runtime image service is involved, so the markup works
 * unchanged on Vercel, Netlify and Cloudflare Pages.
 */
export function ResponsivePhoto({
  photo,
  alt,
  sizes,
  priority = false,
  className,
}: PhotoProps) {
  const srcSet = (ext: string) =>
    photo.widths.map((w) => `/photos/${photo.name}-${w}.${ext} ${w}w`).join(', ');

  const fallbackWidth = photo.widths[photo.widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/photos/${photo.name}-${fallbackWidth}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={alt}
        width={photo.width}
        height={photo.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}
