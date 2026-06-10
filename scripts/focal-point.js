/**
 * Applies the asset focal point to images so that `object-fit: cover`
 * crops around the focal point instead of the center.
 *
 * AEM/DA delivers the focal point in the image's `data-title` attribute as
 * "data-focal:<x>,<y>" (percentages), e.g. "data-focal:91.26,20.56".
 * Only blocks that call this helper are "focal point aware".
 * @param {Element} element Element (e.g. a block) containing the images
 */
export default function applyFocalPoint(element) {
  element.querySelectorAll('img[data-title]').forEach((img) => {
    const match = img.getAttribute('data-title').match(/data-focal:\s*([\d.]+)\s*,\s*([\d.]+)/);
    if (match) {
      const [, x, y] = match;
      img.style.objectPosition = `${x}% ${y}%`;
    }
  });
}
