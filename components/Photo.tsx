import type { Photo } from '@/config/photos';

interface PhotoProps {
  photo: Photo;
  alt: string;
  /** Matches the CSS width of the rendered image at each breakpoint. */
  sizes: string;
  priority?: boolean;
  /**
   * Source order. AVIF is the smallest but the slowest to decode, which shows
   * up as render delay on the largest contentful paint — so the hero asks for
   * WebP first and leaves AVIF to the images below the fold.
   */
  formats?: ('avif' | 'webp')[];
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
  formats = ['avif', 'webp'],
  className,
}: PhotoProps) {
  const srcSet = (ext: string) =>
    photo.widths.map((w) => `/photos/${photo.name}-${w}.${ext} ${w}w`).join(', ');

  const fallbackWidth = photo.widths[photo.widths.length - 1];

  return (
    <picture>
      {formats.map((format) => (
        <source
          key={format}
          type={`image/${format}`}
          srcSet={srcSet(format)}
          sizes={sizes}
        />
      ))}
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
