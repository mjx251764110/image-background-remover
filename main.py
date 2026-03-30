#!/usr/bin/env python3
"""Main CLI entry point for image background remover."""

import sys
import click
from PIL import Image
from background_remover import remove_background


@click.command()
@click.argument("input_path", type=click.Path(exists=True))
@click.option("-o", "--output", "output_path", required=True, help="Output file path")
@click.option("--alpha-matting", is_flag=True, default=False, help="Use alpha matting for better edges")
def main(input_path: str, output_path: str, alpha_matting: bool):
    """Remove background from an image."""
    click.echo(f"Processing {input_path}...")
    remove_background(input_path, output_path, alpha_matting=alpha_matting)
    click.echo(f"Saved to {output_path}")


if __name__ == "__main__":
    main()