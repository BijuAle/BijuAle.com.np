---
title: yt-dlp Commands
tags: ['Computing']
---

# Download YT Playlist
```
yt-dlp \
  --yes-playlist \
  --concurrent-fragments 10 \
  --download-archive archive.txt \
  --embed-metadata \
  --embed-chapters \
  --embed-thumbnail \
  --embed-subs\
  --parse-metadata "%(title)s:%(meta_title)s" \
  --output "%(title)s.%(ext)s" \
  --format "bestvideo+bestaudio/best" \
  --merge-output-format mkv \
  --no-mtime \
  --xattrs \
  --limit-rate 50M \
  --no-overwrites \
  --continue \
  "https://www.youtube.com/playlist?list=PL9GwT4_YRZdBf9nIUHs0zjrnUVl-KBNSM"
  ```