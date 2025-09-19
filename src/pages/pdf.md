---
title: PDF Manipulations
tags: ['Computing']
---

# Scanned PDF to B&W (Updated)
```python
import os
from pdf2image import convert_from_path
from PIL import Image, ImageEnhance
import pytesseract
import numpy as np
import cv2

# Specify the PDF file name
pdf_filename = "a.pdf"

# Check if the PDF file exists in the current directory
if not os.path.isfile(pdf_filename):
    print(f"{pdf_filename} not found in the current directory.")
else:
    try:
        # Create output directory
        output_dir = "output_images"
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Convert PDF to images (large-size pages may take a while)
        print("Converting PDF pages to images...")
        images = convert_from_path(pdf_filename, dpi=300, thread_count=4)  # Adjust DPI and use multiple threads

        bw_images = []
        for i, image in enumerate(images):
            print(f"Processing page {i + 1}...")

            # Convert to grayscale
            gray_image = image.convert("L")  # Convert to grayscale
            np_image = np.array(gray_image)

            # Enhance image contrast
            enhancer = ImageEnhance.Contrast(gray_image)
            enhanced_image = enhancer.enhance(2)  # Increase contrast to improve text clarity

            # Convert the enhanced image to a NumPy array for processing
            enhanced_np_image = np.array(enhanced_image)

            # Calculate optimal threshold using Otsu's binarization method
            _, otsu_threshold_image = cv2.threshold(enhanced_np_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

            # Convert back to a PIL Image
            otsu_image = Image.fromarray(otsu_threshold_image)

            # Optionally apply OCR to each page (uncomment the next lines if needed)
            # text = pytesseract.image_to_string(otsu_image)
            # print(f"OCR Text from Page {i + 1}:")
            # print(text)

            # Save processed black-and-white image
            bw_image_path = os.path.join(output_dir, f"bw_page_{i + 1}.png")
            otsu_image.save(bw_image_path, "PNG")
            bw_images.append(otsu_image)

        # Save all black-and-white images as a new PDF
        output_pdf_path = os.path.join(output_dir, "bw_output.pdf")
        print(f"Saving processed PDF to {output_pdf_path}...")
        bw_images[0].save(output_pdf_path, save_all=True, append_images=bw_images[1:])
        print("Conversion to true black-and-white completed successfully!")

    except Exception as e:
        print(f"An error occurred: {e}")
```

# Scanned PDF to B&W

Run ocrmypdf on the file in the end.

```python
import os
from pdf2image import convert_from_path
from PIL import Image
import pytesseract

# Specify the PDF file name
pdf_filename = "a.pdf"

# Check if the PDF file exists in the current directory
if not os.path.isfile(pdf_filename):
    print(f"{pdf_filename} not found in the current directory.")
else:
    try:
        # Create output directory
        output_dir = "output_images"
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Convert PDF to images (large-size pages may take a while)
        print("Converting PDF pages to images...")
        images = convert_from_path(pdf_filename, dpi=300, thread_count=4)  # Adjust DPI and use multiple threads

        bw_images = []
        for i, image in enumerate(images):
            # Convert to grayscale
            print(f"Processing page {i + 1}...")
            gray_image = image.convert("L")  # Convert to grayscale

            # Apply threshold to convert the grayscale image to true black and white
            threshold = 128  # You can adjust this threshold value
            bw_image = gray_image.point(lambda p: 255 if p > threshold else 0, mode='1')  # True B&W

            # Optionally apply OCR to each page
            # Uncomment the next two lines if OCR is desired
            # text = pytesseract.image_to_string(bw_image)
            # print(f"OCR Text from Page {i + 1}:")
            # print(text)

            # Save processed black-and-white image
            bw_image_path = os.path.join(output_dir, f"bw_page_{i + 1}.png")
            bw_image.save(bw_image_path, "PNG")
            bw_images.append(bw_image)

        # Save all black-and-white images as a new PDF
        output_pdf_path = os.path.join(output_dir, "bw_output.pdf")
        print(f"Saving processed PDF to {output_pdf_path}...")
        bw_images[0].save(output_pdf_path, save_all=True, append_images=bw_images[1:])
        print("Conversion to true black-and-white completed successfully!")

    except Exception as e:
        print(f"An error occurred: {e}")
```

# llpp (linux)

```
/home/biju/.config/llpp.conf

selection-command='LC_CTYPE=UTF-8 xclip -i -selection clipboard 'paste-command='LC_CTYPE=UTF-8 xclip -o -selection clipboard'
```

# Convert JPG to PDF

```bash
for i in *jpeg; do
	convert "$i" -auto-orient name>.pdf
done

```

# Combine Images to PDF

```bash
convert *.jpg -auto-orient pictures.pdf
```

# Resize PDF to A4-paper

```bash
for pdf in *; do
	pdfjam --outfile $pdf --paper a4paper $pdf
done
```

# Search text within PDF

```bash
pdfgrep -C 3 -HiR -e Theseaus *.pdf
```

# Trim first page

```bash
mkdir trimmed
for i in *pdf;
	do pdftk "$i" cat 2-end output "trimmed/$i";
done
```

# Extract Images from PDF

```bash
mkdir extracted-images
pdfimages -all <path-to-pdf> <path-to-'extracted-images'>/image
```

# Multiple djvu to pdf

```bash
for i in *.djvu;
	do djvu2pdf "$i" "${i/%.djvu/}.pdf";
done
```
