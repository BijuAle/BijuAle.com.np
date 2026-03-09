---
layout: base.njk
templateEngineOverride: njk,md
title: Computing Tools
---
{% from "macros.njk" import cmd, script %}

Personal reference of scripts, commands, and automation tools.

---

# LaTeX

## Letter template

{% call script("LaTeX", "letter.tex") %}
\documentclass{letter}
\signature{ALE, Biju}
\address{Kathmandu}

\begin{document}
\begin{letter}{To the HR \\ Some Institution \\ Some Address}

\opening{Dear ...,}

Body text goes here.

\closing{Yours Faithfully,}
\end{letter}
\end{document}
{% endcall %}

## Wrap text around a figure

{% call script("LaTeX", "wrapfigure.tex") %}
\begin{wrapfigure}{r}{0.4\linewidth}
  \centering
  \includegraphics[width=\linewidth, keepaspectratio]{images/filename}
  \caption{Caption text}
  \vspace{-30pt}
\end{wrapfigure}
{% endcall %}

## Word count with texcount

1. Generate: `texcount.pl -1 -sum document.tex -out=document.sum`
2. In preamble: `\newcommand\wordcount{\input{\jobname.sum}}` then call `\wordcount` where needed
3. Detailed summary: `\usepackage{verbatim}` then `\newcommand\wordcount{\verbatiminput{\jobname.sum}}`
4. Multi-file: add `-inc` flag to `texcount.pl`

---

# PDF

## Scanned PDF → B&W (Otsu threshold)

{% call script("Python", "pdf_bw_otsu.py") %}
import os
from pdf2image import convert_from_path
from PIL import Image, ImageEnhance
import numpy as np
import cv2

pdf_filename = "a.pdf"

if not os.path.isfile(pdf_filename):
    print(f"{pdf_filename} not found in the current directory.")
else:
    try:
        output_dir = "output_images"
        os.makedirs(output_dir, exist_ok=True)

        print("Converting PDF pages to images...")
        images = convert_from_path(pdf_filename, dpi=300, thread_count=4)

        bw_images = []
        for i, image in enumerate(images):
            print(f"Processing page {i + 1}...")
            gray_image = image.convert("L")

            enhancer = ImageEnhance.Contrast(gray_image)
            enhanced_image = enhancer.enhance(2)
            enhanced_np = np.array(enhanced_image)

            _, otsu = cv2.threshold(
                enhanced_np, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
            )
            otsu_image = Image.fromarray(otsu)

            path = os.path.join(output_dir, f"bw_page_{i + 1}.png")
            otsu_image.save(path, "PNG")
            bw_images.append(otsu_image)

        out_pdf = os.path.join(output_dir, "bw_output.pdf")
        print(f"Saving to {out_pdf}...")
        bw_images[0].save(out_pdf, save_all=True, append_images=bw_images[1:])
        print("Done!")
    except Exception as e:
        print(f"Error: {e}")
{% endcall %}

## Scanned PDF → B&W (simple threshold)

Run `ocrmypdf` on the output afterwards to restore the text layer.

{% call script("Python", "pdf_bw_simple.py") %}
import os
from pdf2image import convert_from_path
from PIL import Image

pdf_filename = "a.pdf"

if not os.path.isfile(pdf_filename):
    print(f"{pdf_filename} not found.")
else:
    try:
        output_dir = "output_images"
        os.makedirs(output_dir, exist_ok=True)

        print("Converting PDF pages to images...")
        images = convert_from_path(pdf_filename, dpi=300, thread_count=4)

        bw_images = []
        for i, image in enumerate(images):
            print(f"Processing page {i + 1}...")
            gray = image.convert("L")
            bw = gray.point(lambda p: 255 if p > 128 else 0, mode='1')

            path = os.path.join(output_dir, f"bw_page_{i + 1}.png")
            bw.save(path, "PNG")
            bw_images.append(bw)

        out_pdf = os.path.join(output_dir, "bw_output.pdf")
        bw_images[0].save(out_pdf, save_all=True, append_images=bw_images[1:])
        print("Done!")
    except Exception as e:
        print(f"Error: {e}")
{% endcall %}

## Resize all PDFs to A4

{% call script("Bash", "pdf_resize_a4.sh") %}
for pdf in *.pdf; do
    pdfjam --outfile "$pdf" --paper a4paper "$pdf"
done
{% endcall %}

## Trim first page from all PDFs

{% call script("Bash", "pdf_trim_first.sh") %}
mkdir -p trimmed
for i in *.pdf; do
    pdftk "$i" cat 2-end output "trimmed/$i"
done
{% endcall %}

## Batch DjVu → PDF

{% call script("Bash", "djvu_to_pdf.sh") %}
for i in *.djvu; do
    djvu2pdf "$i" "${i/%.djvu/}.pdf"
done
{% endcall %}

## Convert JPGs to PDF (per file)

{{ cmd('for i in *.jpeg; do convert "$i" -auto-orient "${i%.jpeg}.pdf"; done') }}

## Combine all images into one PDF

{{ cmd("convert *.jpg -auto-orient pictures.pdf") }}

## Search text inside PDFs

{{ cmd('pdfgrep -C 3 -HiR -e "search term" *.pdf') }}

## Extract images from a PDF

{{ cmd("mkdir extracted-images && pdfimages -all <path-to-pdf> extracted-images/image") }}

## llpp clipboard config (Linux)

{% call script("Config", "~/.config/llpp.conf") %}
selection-command='LC_CTYPE=UTF-8 xclip -i -selection clipboard'
paste-command='LC_CTYPE=UTF-8 xclip -o -selection clipboard'
{% endcall %}

---

# Image

## Copyright watermark

Auto-rotate EXIF orientation, then stamp a copyright notice on every image. Output files are prefixed `f_`.

{% call script("Bash", "copyright_watermark.sh") %}
# Step 1 – fix EXIF rotation in-place
for img in *; do
    jhead -autorot "$img"
done

# Step 2 – stamp copyright; outputs prefixed with f_
for img in *; do
    convert "${img}" \
        -gravity SouthWest \
        -font TrajanPro-Regular \
        -pointsize 50 \
        -stroke '#000C' -strokewidth 2 -annotate 0 '© Biju Ale' \
        -stroke  none  -undercolor '#00000080' \
        -fill white    -annotate 0 '© Biju Ale' \
        "f_${img}"
done
{% endcall %}

## Remove white background (trim)

{{ cmd("magick img1.jpeg -trim +repage img1_trim.jpeg") }}

## Vertical stitch (top → bottom)

{{ cmd("magick img1.jpeg img2.jpeg -append final.jpeg") }}

## Horizontal stitch (side by side)

{{ cmd("magick img1.jpeg img2.jpeg +append final.jpeg") }}

---

# Audio

## MKV → MP3 (recursive)

{{ cmd("find . -name '*.mkv' -exec bash -c 'ffmpeg -i \"$1\" -vn -b:a 320000 -y \"${1%.mkv}.mp3\"' _ {} \\;") }}

## FLAC → M4A (Apple Lossless)

Usage: `./flac_to_m4a.sh flac m4a ./src ./dest`

{% call script("Bash", "flac_to_m4a.sh") %}
#!/usr/bin/env bash
srcExt=$1
destExt=$2
srcDir=$3
destDir=$4

for filename in "$srcDir"/*."$srcExt"; do
    baseName=$(basename "${filename%.*}")
    ffmpeg -i "$filename" -acodec alac -c:v copy \
           "$destDir/$baseName.$destExt"
done
echo "Conversion from ${srcExt} to ${destExt} complete!"
{% endcall %}

## FLAC → Video (static cover art)

Muxes audio with a still image into MP4. Usage: `./flac_to_vid.sh flac mp4 ./src ./dest`

{% call script("Bash", "flac_to_vid.sh") %}
#!/usr/bin/env bash
srcExt=$1
destExt=$2
srcDir=$3
destDir=$4
cover="cover.jpg"   # place cover art in working directory

for filename in "$srcDir"/*."$srcExt"; do
    baseName=$(basename "${filename%.*}")
    ffmpeg -loop 1 -framerate 2 -i "$cover" \
           -i "$filename" \
           -c:v libx264 -preset medium -tune stillimage -crf 18 \
           -c:a copy -shortest -pix_fmt yuv420p \
           "$destDir/$baseName.$destExt"
done
echo "Conversion from ${srcExt} to ${destExt} complete!"
{% endcall %}

## Split single FLAC with cue sheet

1. Install tools: `sudo pacman -Syu cuetools shntool`
2. Navigate to the directory with the `.flac` and `.cue` files
3. Split: `shntool split -f *.cue -o flac *.flac`
4. Tag: `cuetag.sh *.cue split-track*.flac`

---

# Files

## Folder binning by keyword

Moves all files whose name contains a given string into a subfolder of that name.

{% call script("Python", "folder_bin.py") %}
import os, shutil, sys

def organize(search_string):
    base = os.getcwd()
    for _, _, filenames in os.walk(base):
        for filename in filenames:
            if search_string in filename:
                dest = os.path.join(base, search_string)
                os.makedirs(dest, exist_ok=True)
                print(f"Moving: {filename}")
                shutil.move(
                    os.path.join(base, filename),
                    os.path.join(dest, filename)
                )

if __name__ == '__main__':
    organize(sys.argv[1])
{% endcall %}

## rsync — basic recursive

{{ cmd("rsync -r <source>/ <destination>/") }}

## rsync — archive (preserves symlinks, permissions, timestamps, ownership)

{{ cmd("rsync -a <source>/ <destination>/") }}

## rsync — verbose dry-run (preview changes)

{{ cmd("rsync -av --dry-run <source>/ <destination>/") }}

## rsync — mirror (deletes destination-only files)

{{ cmd("rsync -av --delete --dry-run <source>/ <destination>/") }}

## rsync — backup to remote (compressed)

{{ cmd("rsync -zaP <source> user@ip_address:<destination>/") }}

## Recursive find and copy by extension

{{ cmd("find ./ -name '*.xsl' -exec cp -prv '{}' '/path/to/targetDir/' ';'") }}

## Recursive copy matching files (multiple dirs)

{{ cmd("find '/source-path' -name '*.JPG' -exec cp -t '/destination-path' {} +") }}

## Delete all files of an extension (Windows)

{{ cmd("for /R %f in (*.flac) do echo del \"%f\" | cmd") }}

---

# Web

## Internet Archive — get collection item list

{{ cmd("ia search 'collection:mir_titles' --itemlist > items.txt") }}

## Internet Archive — download all PDFs (10 parallel)

{% call script("Bash", "ia_download.sh") %}
cat items.txt | xargs -n 1 -P 10 -I {} bash -c 'ia download --no-directories --glob "*.pdf" --destdir=. "{}"'
{% endcall %}

## Selenium starter

{% call script("Python", "selenium_starter.py") %}
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import ui

cap = DesiredCapabilities().FIREFOX
cap["marionette"] = True
driver = webdriver.Firefox(capabilities=cap)
driver.get("https://www.google.com")
{% endcall %}

## wget — recursive PDF download

{% call script("Bash", "wget_recursive.sh") %}
wget --header="Accept: text/html" \
     --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0" \
     -r -nd -nH -np -A "*.pdf" \
     "https://example.com/files/"
{% endcall %}

## wget — fix filenames from Content-Disposition

{{ cmd("wget -c -i urls.txt --restrict-file-names=windows --content-disposition") }}

## wget — download archived MIT courseware

{% call script("Bash", "wget_mit_ocw.sh") %}
wget -c -r -np -k -E -p \
     -A pdf,html,htm \
     --wait=2 --random-wait --limit-rate=100k \
     --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
     "https://dspace.mit.edu/bitstream/handle/1721.1/98368/24-221-fall-2005/contents/index.htm"
{% endcall %}

---

# Mac

## Remove stubborn login items

Delete the relevant entries for the offending app from these directories:

{% call script("Paths", "login-item-dirs") %}
/Library/Application Support/Microsoft/
/Library/LaunchAgents/
/Library/LaunchDaemons/
/Library/PrivilegedHelperTools/
{% endcall %}

## Automator — add files to Calibre

Create a Quick Action in Automator (accepts files in Finder), add a Run Shell Script step:

{% call script("Bash", "add_to_calibre.sh") %}
for f in "$@"; do
    open -a Calibre "$f"
done
osascript -e "display notification \"Added $# file(s) to Calibre\" with title \"Calibre\""
{% endcall %}

---

<style>
  .cmd-block {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(50, 38, 18, 0.07);
    border: 1px solid rgba(88, 72, 34, 0.18);
    border-radius: 5px;
    padding: 0.45rem 0.7rem;
    margin: 0.5rem 0 1.1rem;
  }
  .cmd-code {
    flex: 1;
    font-family: "Courier New", monospace;
    font-size: 0.85rem;
    color: rgb(20, 30, 30);
    word-break: break-all;
    background: none;
    padding: 0;
  }
  .cmd-copy {
    flex-shrink: 0;
    font-family: "Linux Biolinium O", sans-serif;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(88, 72, 34, 0.7);
    background: transparent;
    border: 1px solid rgba(88, 72, 34, 0.28);
    border-radius: 3px;
    padding: 0.18rem 0.55rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .cmd-copy:hover  { background: rgba(88,72,34,0.1); color: rgb(88,72,34); }
  .cmd-copy.copied { color: #2e7d32; border-color: #2e7d32; }

  .script-block {
    border: 1px solid rgba(88, 72, 34, 0.2);
    border-radius: 5px;
    overflow: hidden;
    margin: 0.5rem 0 1.4rem;
  }
  .script-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 0.7rem;
    background: rgba(50, 38, 18, 0.06);
    border-bottom: 1px solid rgba(88, 72, 34, 0.12);
    flex-wrap: wrap;
  }
  .script-lang {
    font-family: "Linux Biolinium O", sans-serif;
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: rgba(88, 72, 34, 0.6);
    border: 1px solid rgba(88, 72, 34, 0.25);
    border-radius: 3px;
    padding: 0.08rem 0.38rem;
    white-space: nowrap;
  }
  .script-name {
    font-family: "Courier New", monospace;
    font-size: 0.82rem;
    color: rgb(20, 30, 30);
    flex: 1;
  }
  .script-actions {
    display: flex;
    gap: 0.3rem;
    margin-left: auto;
  }
  .script-actions button {
    font-family: "Linux Biolinium O", sans-serif;
    font-size: 0.67rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: rgba(88, 72, 34, 0.7);
    background: transparent;
    border: 1px solid rgba(88, 72, 34, 0.25);
    border-radius: 3px;
    padding: 0.15rem 0.45rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .script-actions button:hover  { background: rgba(88,72,34,0.1); color: rgb(88,72,34); }
  .script-actions button.copied { color: #2e7d32; border-color: #2e7d32; }

  .script-content {
    margin: 0;
    padding: 0.8rem 1rem;
    background: rgba(50, 38, 18, 0.04);
    font-size: 0.81rem;
    overflow-x: auto;
  }
  .script-content code { background: none; padding: 0; font-size: inherit; }
</style>

<script>
function copyCmd(btn) {
  var tmp = document.createElement('textarea');
  tmp.innerHTML = btn.previousElementSibling.innerHTML;
  navigator.clipboard.writeText(tmp.value).then(function() {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
  });
}

function toggleScript(btn) {
  var pre = btn.closest('.script-block').querySelector('.script-content');
  var wasHidden = pre.hasAttribute('hidden');
  pre.toggleAttribute('hidden');
  btn.textContent = wasHidden ? 'Hide' : 'View';
}

function copyScript(btn) {
  var code = btn.closest('.script-block').querySelector('.script-content code');
  var tmp  = document.createElement('textarea');
  tmp.innerHTML = code.innerHTML;
  navigator.clipboard.writeText(tmp.value).then(function() {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
  });
}

function downloadScript(btn) {
  var block    = btn.closest('.script-block');
  var filename = block.querySelector('.script-name').textContent.trim();
  var code     = block.querySelector('.script-content code');
  var tmp      = document.createElement('textarea');
  tmp.innerHTML = code.innerHTML;
  var blob = new Blob([tmp.value], { type: 'text/plain' });
  var a    = document.createElement('a');
  a.href   = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
</script>
