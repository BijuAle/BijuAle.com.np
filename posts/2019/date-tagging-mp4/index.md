---
title: Tagging date metadata on a MP4 video
date: 2020-05-26
tags: ["Nifty Computing"]
author: Biju Ale
---

# Steps

- Run the bash scripts given below.
- The time format is in ISO8601.

# Link

```
ffmpeg -i <original.mp4> -c copy -map 0 -metadata creation_time="2015-12-25T12:34:56" <output.mp4>

# To check the tag
ffprobe -show_streams -show_format output.mp4
```

# OS

- Unix-like

# Required Tools

- ffmpeg
