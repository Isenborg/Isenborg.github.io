import subprocess
from pathlib import Path

# Folder containing images
folder = Path("generated")

# Extensions to process
image_exts = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}

for img_path in folder.iterdir():
    if img_path.suffix.lower() in image_exts:
        webp_path = img_path.with_suffix(".webp")

        # FFmpeg command
        cmd = [
            "ffmpeg",
            "-y",  # overwrite if exists
            "-i", str(img_path),
            "-vf", "scale=1080:-1",  # resize width to 1920px, keep aspect
            "-q:v", "80",            # quality for WebP (0-100)
            str(webp_path)
        ]

        print(f"Converting: {img_path.name} -> {webp_path.name}")
        subprocess.run(cmd, check=True)

        # Remove the old file
        img_path.unlink()
        print(f"Removed original: {img_path.name}")

print("✅ All images converted to WebP and originals removed.")