---
layout: "layouts/base.njk"
title: Various Automations
---

# Copyright Images

```
for img in *; do
	jhead -autorot $img
done

for img in *; do
 convert ${img} -gravity SouthWest -font TrajanPro-Regular  -pointsize 50 \
          -stroke '#000C' -strokewidth 2 -annotate 0 '© Biju Ale' \
          -stroke  none  -undercolor '#00000080' -fill white  -annotate 0 '© Biju Ale' \
          'f_'${img}
done

```

# Folder Binning

```
import os, shutil, sys

def organize(searchString):

    #searchPath='/home/biju/Study/Books/Mathematics/Math Library/Miscellany/'
    searchPath = os.getcwd()
    destPath = os.getcwd()
    #destPath='/home/biju/Study/Books/Mathematics/Math Library/'

    for folderName,subfolders, filenames in os.walk(searchPath):
        for filename in filenames:
            if filename.__contains__(searchString):
                print ('Moving: ' + filename)
                if not (os.path.exists(destPath + '/' + searchString)):
                    os.makedirs(destPath + '/' + searchString)
                shutil.move(searchPath + '/' + filename, destPath + '/' + searchString)

if __name__ == '__main__':
    organize(sys.argv[1])
```

# Libgen scraper

```
from docx import Document
from docx.opc.constants import RELATIONSHIP_TYPE as RT

docx_file=input("Input docx filename (without .docx): ")
document = Document(docx_file + ".docx")
rels = document.part.rels
links=[]
f = open("links.txt", "w")

for rel in rels:
   if rels[rel].reltype == RT.HYPERLINK:
      links.append(rels[rel]._target)
      f.write(rels[rel]._target+"\n")
      print(rels[rel]._target)
f.close()
print("\n Links saved.")
```

# Clean bookos filename

```
import re
import os
import sys

arg_list = sys.argv
path = arg_list[1]
re_author_name = r'\[(.*)\]'
re_book_title = r'\]_(.*)\(z'

with os.scandir(path) as list_file:
    for file in list_file:
        if not file.name.startswith('.') and file.is_file() and 'lib.org' in file.name:

            file_name = file.name

            author_name = re.search(re_author_name, file_name)
            author_name = author_name.group(1)
            author_last_name = author_name.split('_')
            author_last_name = author_last_name[-1]

            book_title = re.search(re_book_title, file_name)
            book_title = book_title.group(1)
            book_title = book_title.replace('_', ' ')

            clean_file_name = book_title + ' - ' + author_last_name
            extension = os.path.splitext(file_name)[1]

            print(file, clean_file_name + extension)
            os.rename(path + '/' + file.name, path + '/' + clean_file_name + extension)

```

# mkv to mp3

```
find . -type f -name "*.mkv" -exec bash -c 'FILE="$1"; ffmpeg -i "${FILE}" -vn -b:a 320000 -y "${FILE%.mkv}.mp3";' _ '{}' \;

```

# Recursive find-copy

```
find ./ -name '*.xsl' -exec cp -prv '{}' '/path/to/targetDir/' ';'
```

# Recursive copy mult dir

```
find "/source-path" -name '*.JPG' -exec cp -t "/destination-path" {} +
```

# rsync commands

```
rsync -r <source>/ <destination>/

rsync -a <source>/ <destination>/
(-a Recurse and preserve symlinks, permission, mod time, groups, owners etc.)

rsync -av --dry-run <source>/ <destination>/
(Check changes to be made based on source)

rsync -av --delete --dry-run <source>/ <destination>/
(Mirror source to destination, and remove exclusive changes in destination)

rsybc -zaP <Source> user_name@ip_address:<destination>
(Backup to remote machine, z - compress)
```

# Selenium starter

```
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import ui

cap = DesiredCapabilities().FIREFOX
cap["marionette"] = True
driver = webdriver.Firefox(capabilities=cap)
driver.get("https://www.google.com")
```

# Wget commands

Recursive

```
wget --header="Accept: text/html" --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0" -r -nd -nH -np -A "*.pdf" "https://abc.com/files/"

Name-fix
wget -c -i a.txt --restrict-file-names=windows --content-disposition
```
