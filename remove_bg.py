#!/usr/bin/env python3
"""Remove background from a single image (simple script)."""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from background_remover import remove_background


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input.jpg> <output.png>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    print(f"Removing background from: {input_path}")
    remove_background(input_path, output_path)
    print(f"Done! Saved to: {output_path}")