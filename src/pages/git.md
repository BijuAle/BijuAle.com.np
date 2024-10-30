---
title: Git
tags: ['Computing']
---

# Basics

```git
Add user for all repositories
	git config --global user.name "Mona Lisa"
	git config --global user.name

Add email for all repositories
	git config --global user.email "email@example.com"
	git config --global user.email

Add email for single repository
	Change directory
	git config user.email "email@example.com"
	git config user.email

Skipping files:
	1. touch .gitignore
	2. Add filename per line

Adding a file to staging area
	git add <filename>

Adding all files to staging area
	git add -A

Resetting staging area
	git reset

Remove specific additions
	git reset <filename>

Commit changes
	git commit -m "Msg"

View commit log
	git log
```

# Quick Push

```git
git init
git add .
git commit -m "First commit"
git remote add origin <URL>
git remote -v
git push -u origin master
```

# Workflow

```git
Cloning a remote repo
 git clone <url> <destination>
		or
 git clone <url> . (where . is the current directory)

View remote repo information
	git remote -v
	git branch -a

Pushing changes made in local machine to remote repo
	git diff
	git status
	git add -A
	git commit -m "Some msg on changes made"
	git pull origin master (Pull changes made by others)
	git push origin master (Commit our changes)

Workflow
	git branch <branch name> (Create a branch. Usually named after a feature)
	git branch -a (view all branches)
	git checkout <branch name> (change working branch)
	make changes
	git add -A
	git commit -m "Some msg"
	git push -u origin <branch name>
	git branch -a
	git checkout master
	git pull origin master
	git branch --merged (view merged branches)
	git merge <branch name>
	git push origin master
	git branch --merged (verify by viewing merged branches)
	git branch -d <branch name> (delete branch from local repo after merging)
	git push origin --delete <branch name> (delete branch from remote repo after merging)
```

# Cloning Repos

Method 1:

```python
import requests
import os
from git import Repo

def download_all_repos(github_username, token=None):
    """Downloads all public repositories of a GitHub user.

    Args:
        github_username (str): The username of the GitHub user.
        token (str, optional): A GitHub personal access token for private repos. Defaults to None.
    """

    base_url = f"https://api.github.com/users/{github_username}/repos"
    headers = {"Authorization": f"token {token}" if token else None}

    while True:
        response = requests.get(base_url, headers=headers)
        response.raise_for_status()  # Raise an exception for non-200 status codes

        repos = response.json()
        for repo in repos:
            repo_name = repo["name"]
            clone_url = repo["clone_url"]

            try:
                Repo.clone_from(clone_url, repo_name)
                print(f"Downloaded {repo_name} successfully.")
            except Exception as e:
                print(f"Error downloading {repo_name}: {e}")

        # Check for pagination
        next_page_url = response.links.get("next", {}).get("url")
        if not next_page_url:
            break
        base_url = next_page_url

if __name__ == "__main__":
    github_username = input("Enter the GitHub username: ")
    access_token = input("Enter your personal access token (for private repos): ")
    download_all_repos(github_username, token=access_token)
```

Method 2:

```sh
curl -s https://api.github.com/users/BijuAle/repos | grep \"clone_url\"
| awk '{print $2}' | sed -e 's/"//g' -e 's/,//g' | xargs -n1 git clone
```

Method 3:

```
minhaskamal.github.io/DownGit
```

# Fix Commit Flaw

```git
Clear changes made before adding to staging area
	git checkout <filename>

Fix wrong commit msg
	git commend --ammend -m "New msg"

Use last commit for new change
	git commit --ammend
	:wq
	git log --stat (View changes made per commit)

Move commit from one branch to other
	git log (Copy commit hash from the wrong branch)
	git checkout <branch name> (Switch to the correct branch)
	git log
	git cherry-pic <commit hash>
	git log (Commit copied to the correct branch)
	git checkout <branch name> (Switch to the wrong branch)
	git log (Grab the latest good commit)
	git reset --hard <commit hash>
	git clean -df (if there are untracked files)

Types of reset
	git reset --soft <commit hash>	(Remove other commits & bring changes back to staging directory)
	git reset <commit hash> (Default/Mixed reset. Remove other commits & bring changes to working directory )
	git reset --hard <commit hash>	(Remove all changes)

Remove untracked files (Example usecase: accidentaly extracting a zip file on a git repo)
	 git clean -df

View action log
	git reflog

Recover accidentaly removed changes
	git reflog (Get the safe action hash preceding accidental action hash)
	git checkout <action hash>
	git log (View to-recover commits in headless mode)
	git branch backup (Recover all commits and move to a branch)

Rever repo back to previous commit
	git reset --hard <old-commit-id>
\tgit push -f <remote-name> <branch-name>
```

# Remove GitIgnore old files

```git
git rm -r --cached node_modules
git commit -m 'Remove the now ignored directory node_modules'
git push origin master
```

# Reset commit history

```git
1. Checkout:
git checkout --orphan latest_branch

2. Add all the files:
git add -A

3. Commit the changes:
git commit -am "commit message"

4. Delete the branch:
git branch -D master

5. Rename the current branch to master:
git branch -m master

6. Finally, force update your repository:
git push -f origin master
```
