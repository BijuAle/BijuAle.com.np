---
title: youtube-dl Commands
tags: ['Computing']
---

# With author subs

```
youtube-dl --write-srt --sub-lang en '<uri>'
```

# With auto subs

```
youtube-dl --write-auto-sub '<uri>'
```

# With best AV

```
youtube-dl -f bestvideo+bestaudio '<uri>'
```

# Select AV quality

```
youtube-dl -F '<uri>'
youtube-dl -F<quality index> '<uri>'
```

# Helpful cmd

```
youtube-dl -o '%(title)s.%(ext)s' --write-srt --sub-lang en --write-auto-sub -f bestvideo+bestaudio '<uri>'
```

# Download audio from playlist

```
youtube-dl -cit --extract-audio --audio-format mp3 '<playlist_url>'
```

# Download playlist

```
youtube-dl -cit -o '%(title)s.%(ext)s' '<playlist_url>'
```

# Faster downloads

```
$ youtube-dl --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -o '%(title)s.%(ext)s' URL
```

# LLD

```
youtube-dl --username [email] --password [pwd] -f bestvideo+bestaudio --retries 10 --verbose --sleep-interval 2 --output "~/Downloads/%(playlist)s/%(chapter_number)s - %(chapter)s/%(playlist_index)s - %(title)s.%(ext)s" https://www.linkedin.com/learning/efficient-time-management
```
