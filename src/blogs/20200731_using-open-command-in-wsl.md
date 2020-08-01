---
title: 'Using "open" command in WSL'
tags: ['WSL', 'trick']
---

[I switched jobs](../my-first-month-as-a-developer-by-title) a couple of months ago, and earlier this month, I got issued a MacBook for a work computer. I have long been a Windows user who never really used a Mac before--either for personal use or for work. So it has been a few interesting weeks since then, adjusting for the new operating system and everything it entails.

I remember hearing and reading about how macOS offers a great developer experience. Well, I have to admit that it's been a pleasure to use the new MacBook although mostly thanks to this MacBook being a simply superior machine that costs many times more than my old HP. In terms of the development workflow and environment, WSL 2 already offers everything I can ask for including full Docker Docker support. In fact, my productivity on MacBook still suffers from switching between different keyboard shortcuts. 😭

One small thing I find quite useful in macOS, apart from its rich set of trackpad gestures, is the `open` command. It's a simple built-in terminal command whose primary job is to open a file or a folder at a given path.[^1] Although using terminal is mostly sufficient for navigating directories and manipulating files, sometimes it is helpful--even necessary--to leverage the convenience of GUI.[^2] And running `open .` provides a great way to quickly switch from command line to GUI without having to clicking through folders in Finder to get to where I am in terminal.

[^1]: See [this SS64.com page](https://ss64.com/osx/open.html) for more details on `open`.
[^2]: For example, drag-and-drop to upload files to web apps.

Since I still need my good old Windows laptop for hobby projects and other personal stuff, I wondered: Can I have `open` in WSL?

After some research, I found that while there is no built-in `open` in Linux, Windows makes `Explorer.exe` available in command line. It does what is expected: Open Windows File Explorer at a given path. Although `Explorer.exe` comes with a different set of options,[^3] it is adequate for my intended use case. Even better, WSL has access to Windows `PATH` variable out of the box, thus making `Explorer.exe` available on its terminal.

[^3]: See [this SS64.com page](https://ss64.com/nt/explorer.html) for more details on `Explorer.exe`.

So now I have `Explorer.exe .` to get mostly the same thing in WSL. But can I do better? Can I use it by typing `open` as in macOS?

My first naive approach to achieve this was to aliasing `Explorer.exe` to `open`, i.e. `alias open="Explorer.exe"`. At first, it seemed to work just as intended: `open .` would open a File Explorer GUI window at the current location. Unfortunately, this quickly broke down when I tried to use it with slightly more complicated paths. For instance, `open ./foo/bar` would open File Explorer at Documents (i.e. the default path) instead of the path I provided. After a bit of experimentation, I learned that this was because Windows uses backslashes(`\`) for paths instead of forward slashes(`/`) like everybody else. And using `Explorer.exe` in WSL doesn't change that, meaning I should type `open .\\foo\\bar` to get what I want. Not cool.

After some more experimentation, however, I learned that a simple shell script could solve this. The following is a couple of lines I added to `~/.bashrc`:

```bash
function open() {
  Explorer.exe ${1//\//\\}
}
export -f open
```

This version of `open` takes an argument, applies a simple regex to it to replace forward slashes to backslashes, and uses the result as the argument for `Explorer.exe`. Then the line 4 exports the function `open` using the `-f` option. Since this code is part of `.bashrc`, `open` is made available as soon as I launch bash terminal. And this `open` can open any file or folder at any existing path on File Explorer--or even a URL on the default browser!

Of course, under the hood, it's still good old `Explorer.exe`, so I cannot replicate the full functionality of the macOS `open` with all its options--at least not with a few lines of shell script. Nonetheless, for basic use cases, it is just as good as the original `open`. For that, I'm satisfied. 😎
