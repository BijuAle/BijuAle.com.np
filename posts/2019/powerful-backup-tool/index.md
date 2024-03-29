---
title: Powerful Backup Utility - rsync usecases
date: 2020-02-24
tags: ["Nifty Computing"]
author: Biju Ale
---

# Steps

- Choose and/or combine the given usecase(s).
- Run the respective script in bash.  
  (replacing `<source>` & `<destination>` with actual directory paths.)

# Script

```bash
# usecase 1: simple recursive file-only backup
rsync -r <source>/ <destination>/

# usecase 2: -a to recurse and preserve file metadata including symlinks, permissions, mod time, groups, owners etc.
rsync -a <source>/ <destination>/

# usecase 3: dry-run/check changes to be made based on source
rsync -av --dry-run <source>/ <destination>/

# usecase 4:  Mirror source to destination, and remove exclusive changes in destination
rsync -av --delete --dry-run <source>/ <destination>/

# usecase 5: Backup to remote machine, -z to compress
rsybc -zaP <Source> user_name@ip_address:<destination>
```

# Required Tools

- rsync
- cwRsync (For Windows Only)

# OS

- Unix-like
- MS Windows
