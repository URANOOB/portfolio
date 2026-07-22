from pathlib import Path

from PIL import Image, ImageDraw


root = Path(__file__).resolve().parents[1]
public = root / "public"
source = Image.open(public / "og.png").convert("RGB")

# Use the warm planet from the social card as a consistent raster favicon.
width, height = source.size
crop_size = int(min(width, height) * 0.72)
left = min(width - crop_size, int(width * 0.57))
top = 0
planet = source.crop((left, top, left + crop_size, top + crop_size)).resize((128, 128), Image.Resampling.LANCZOS)

mask = Image.new("L", (128, 128), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, 127, 127), radius=28, fill=255)
favicon = Image.new("RGBA", (128, 128), (7, 10, 18, 255))
favicon.paste(planet.convert("RGBA"), (0, 0), mask)
favicon.save(public / "favicon.png", optimize=True)
