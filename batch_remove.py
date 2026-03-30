#!/usr/bin/env python3
"""Batch process multiple images."""

import sys
import os
from pathlib import Path

sys.path.insert(0, os.path.dirname(__file__))

from background_remover import remove_background


def batch_remove(input_dir: str, output_dir: str):
    """Process all images in a directory.

    Args:
        input_dir: Folder containing input images
        output_dir: Folder to save output images
    """
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    extensions = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
    files = [f for f in input_path.iterdir() if f.suffix.lower() in extensions]

    if not files:
        print(f"No images found in {input_dir}")
        return

    print(f"Found {len(files)} images to process")
    for i, file in enumerate(files, 1):
        print(f"[{i}/{len(files)}] Processing {file.name}...")
        out_file = output_path / f"{file.stem}.png"
        try:
            remove_background(str(file), str(out_file))
        except Exception as e:
            print(f"  Error: {e}")

    print(f"\nDone! Processed {len(files)} images to {output_dir}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python batch_remove.py <input_folder> <output_folder>")
        sys.exit(1)

    batch_remove(sys.argv[1], sys.argv[2])