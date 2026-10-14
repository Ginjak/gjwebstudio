import NextImage from 'next/image';
import { imageAlt } from '@/lib/content/images';
import { cn } from '@/lib/utils';
import styles from './Media.module.scss';

/**
 * next/image wrapper bound to the image registry.
 *
 *   import { heroWorkspace } from '@/lib/content/images';
 *   <Media image={heroWorkspace} priority sizes="100vw" ratio="16/9" />
 *
 * Always supplies width/height (no layout shift) and a real blurDataURL
 * (blur-up placeholder). The alt falls back to the generation prompt while
 * the image is still a placeholder — see docs/IMAGES.md.
 */
export default function Media({
  image,
  alt,
  ratio,
  fill = false,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  rounded = true,
  className,
  imgClassName,
  ...rest
}) {
  if (!image) return null;

  const resolvedAlt = alt ?? imageAlt(image);

  return (
    <div
      className={cn(styles.wrap, rounded && styles.rounded, fill && styles.fillWrap, className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <NextImage
        src={image.src}
        alt={resolvedAlt}
        {...(fill || ratio
          ? { fill: true }
          : { width: image.width, height: image.height })}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className={cn(styles.img, imgClassName)}
        {...rest}
      />
    </div>
  );
}
