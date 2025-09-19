---
title: Mac Tweaks
tags: ['Computing']
---

# Remove Pesky Login Items

```
Remove relevant files from:
/Library/Application Support/Microsoft/
/Library/LaunchAgents/
/Library/LaunchDaemons/
/Library/PrivilegedHelperTools/
```

# Mac Automator
Add books to Calibre
```
for f in "$@"
do
  open -a Calibre "$f"
done

# Optional notification
osascript -e "display notification \"Added $# files to Calibre\" with title \"Calibre\""
```