#!/usr/bin/env python3
"""Core background removal module."""

from PIL import Image
from rembg import remove


def remove_background(
    input_path: str,
    output_path: str,
    alpha_matting: bool = False,
    alpha_matting_foreground_threshold: int = 240,
    alpha_matting_background_threshold: int = 10,
    alpha_matting_erode_size: int = 10,
):
    """Remove background from an image file.

    Args:
        input_path: Path to input image (jpg, png, webp, etc.)
        output_path: Path to save output image (should be PNG for transparency)
        alpha_matting: Use alpha matting for sharper edges
        alpha_matting_foreground_threshold: Foreground threshold for alpha matting
        alpha_matting_background_threshold: Background threshold for alpha matting
        alpha_matting_erode_size: Erosion size for alpha matting
    """
    with Image.open(input_path) as img:
        output = remove(
            img,
            alpha_matting=alpha_matting,
            alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
            alpha_matting_background_threshold=alpha_matting_background_threshold,
            alpha_matting_erode_size=alpha_matting_erode_size,
        )
        output.save(output_path)


def remove_background_from_image(img: Image.Image, **kwargs) -> Image.Image:
    """Remove background from a PIL Image object.

    Args:
        img: PIL Image object
        **kwargs: Additional arguments passed to rembg remove()

    Returns:
        PIL Image with transparent background
    """
    return remove(img, **kwargs)