---
title: Git
date: 2022-05-18
sidebar: 'auto'
categories:
 - Git
tags:
 - Git
---
# git的使用

## 配置用户信息

```
git config --global user.name xxx
git config --global user.email xxx@xxx.xxx
```

## 初始化项目

- 使用命令行进入到项目目录中，执行`git init`对项目进行初始化操作

![img](https://s2.loli.net/2022/06/13/GczR7qmtIe4fvDZ.png)

- 初始化后，在项目目录中会增加一个`.git`文件夹（隐藏目录）。项目的所有修改信息都会存储在该目录中

![img](https://s2.loli.net/2022/06/13/jNFfvTJYpA8hX2V.png)

## 监视、存储文件

- 刚刚初始化的项目是一个空的项目，在git中并没有对任何文件进行管理。可以通过`git status`来查看当前项目的状态。

![img](https://s2.loli.net/2022/06/13/x8QsRgMC2brwULV.png)

- `Untracked files:`表示的没有被追踪的文件列表。在它的下边有一个红色的`index.html`，这表示项目虽然被git所管理，但是在项目中有一个文件叫做`index.html`并没有被git管理。
- 如何使文件被git追踪管理呢？()中的内容已经告诉你答案了：`(use "git add <file>..." to include in what will be committed)`我们需要通过`git add`指令来控制git来将文件添加到git中，使git对改文件进行追踪管理。

```
git add 文件名
```

- 如果希望index.html可以被git所管理，可以使用命令git add index.html来进行操作。

![img](https://s2.loli.net/2022/06/13/3LmoPD8VwvOjheN.png)

- 由于项目中只存在一个index.html文件，所以当调用add后，通过git status查看状态时，不会在有Untracked files的列表显示。同时，出现了一个新的内容`No commits yet`，该内容表示项目中存在有尚未提交的内容，也就是index.html虽然被git所追踪，但是文件中的内容并没有提交到git中存储。所以一定要知道add的作用只是将文件交给git追踪，要存储文件还需要做其他操作。

```
git commit 文件名 -m "信息"
```

- commit用于提交文件，就相当于将文件存储到git中。参数-m后边需要跟着一个描述信息，来说明此次操作的目的。

![img](https://s2.loli.net/2022/06/13/hSVw8sLX7F4kcfN.png)



## 修改、添加文件



- 继续对index.html进行修改，添加一些内容，然后再运行git status来查看状态。

![img](https://s2.loli.net/2022/06/13/BtpnKHwkW8fQdyh.png)

- Changes not staged for commit表示修改后还未提交的内容，由于index.html已经被git所追踪，所以这里可以直接通过git commit来存储文件。

![img](https://s2.loli.net/2022/06/13/7DqcoeV21LQEyGB.png)

- git log用来查看git的修改日志

![img](https://s2.loli.net/2022/06/13/MgOzHmNxAaQvXw8.png)

- 每一个commit xxxx就表示一次提交记录。commit后边的的一长串的内容是记录的id，可以通过id来将代码恢复到指定的位置。commit后边会有一个HEAD，HEAD表示当前所处的状态。目前HEAD在第一条记录上，表示代码现在和第一条记录是同步的。Author表示提交记录的用户的信息，这个信息就是设置的用户名和电子邮件。Date表示的是提交时间。Date下边的显示的就是提交时输入的信息。通过输入git log可以查询到所有的提交记录。

- 项目中添加一个新的文件about.html。然后运行git status。

![img](https://s2.loli.net/2022/06/13/R8A5kyJUGgIVldQ.png)

- 每次添加新的文件后，都需要运行`git add xxx`来使git追踪文件。如果追踪文件后，你改变了主意不打算再追踪该文件了，可以在删除文件后使用`git rm xxx`来撤销追踪。如果你仅仅想撤销追踪，而不真正的删除文件可以使用`git rm xxx --cached`也就是只从git缓存中删除，而不真正删除文件。

![img](https://s2.loli.net/2022/06/13/UIFN3faGo5AibZY.png)



## 忽略文件



- git可以监控到项目目录下的文件（夹）的变化，然而并非项目中的所有文件都需要被git所管理。比如，我们使用vscode去编辑项目时，它会自动在项目目录下创建.vscode目录用来存储编辑器的配置信息，很显然编辑器的配置信息不需要被git所管理，那么如何是git忽略这个文件夹呢？

![img](https://s2.loli.net/2022/06/13/zBv9c1qCwGAphP5.png)

- 可以在项目目录下创建一个名为.gitignore的文本文件，并在文件中添加.vscode/，添加完成后你会发现.idea目录不再在未追踪文件的列表中显示。

![img](https://s2.loli.net/2022/06/13/TW13Pejgo9ChEVs.png)

- .gitignore用来设置不需要被git所管理的文件，在.gitignore中可以设置一系列的规则，符合这些规则的文件将会被git所忽略，不会纳入版本控制。

> github的.gitignore的下载地址 https://github.com/github/gitignore



- 关于.gitignore需要补充的是该文件也需要提交给git去管理，也需要对其执行add、commit等操作来将其提交。

![img](https://s2.loli.net/2022/06/13/rieyWjqlxgYEPUv.png)

- 每一次的存储就是树上的一个节点，每次存储都会又一个id以便我们可以快速定位，像我们之前通过git log查看时那一长串的字符就是节点的id。

![image-20211214150703200](https://s2.loli.net/2022/06/13/2oebIDJliS8gdc6.png)



- git中存在一个指针被称为HEAD，HEAD表示当前所在的节点。
- 如何移动HEAD的位置呢？使用`git checkout`命令

![img](https://s2.loli.net/2022/06/13/xkXtpWZVQMnAHR6.png)



- git中文件的结构就像是一棵大树，每一次我们对文件的操作就会在树上添加一个节点。默认情况下这棵文件树只有一个主干，这个主干我们称之为master，也就是git中的主分支。当我们checkout 分支名时，会自动回到当前分支的最新节点。所以如果使用`git checkout master`就可以回到主分支的最新节点。

![img](https://s2.loli.net/2022/06/13/7j9IJp5TLwNXBhE.png)

- 使用`git status`可以查看当前所在的分支。

![img](https://s2.loli.net/2022/06/13/qT1BlNAmjfpDgb8.png)



##  创建分支

> 创建一个新的分支，所有新的功能都在新分支上进行，好处就是主干于分支是相互独立的，对分支的修改不会影响到主干的内容。



- 创建新分支

```
git branch 分支名
```



- 使用git branch new_site 创建一个新的分支，然后调用`git checkout new_site`切换到新的分支上。

![img](https://s2.loli.net/2022/06/13/YNWaHRorltjIBPd.png)

- 如此一来，所有的修改都是在新的分支上进行，不会影响到主分支master上的内容，接下来创建一个新的about.html并提交到新分支上。

![img](https://s2.loli.net/2022/06/13/8SCmY15XhAL6r2u.png)



- new_site分支上添加了about.html，在master分支上并没有添加，项目在git仓库中发生了分叉，又之前的一个主分支分为了两个分支。可以通过checkout在两个分支间进行切换，直接使用`git checkout 分支名`即可。

![img](https://s2.loli.net/2022/06/13/LlxpKN1ti7SqWTJ.png)





##  合并分支



- 我需要将新添加的内容合并到master（主分支）中，由于项目本身结构简单所以合并起来也是非常容易。首先需要先使用checkou切换回主分支。然后调用`git merge 分支名`来将其合并到主分支中。

![img](https://s2.loli.net/2022/06/13/zgvkGEmTStRua4r.png)



![img](https://s2.loli.net/2022/06/13/wO2ME7IFoJhx5G4.png)



- 合并后new_site分支已经没有存在的意义，可以使用`git branch -d 分支名`将其删除。

![img](https://s2.loli.net/2022/06/13/fNGLuBbHWtgcTde.png)



## 解决分支冲突



- 通过`git checkout -b 分支名`创建一个新分支，该指令用户创建并切换到一个新的分支，相当于branch+checkout。

![img](https://s2.loli.net/2022/06/13/2boXYkeLwIM3aS6.png)

- 然后在test分支中对index.html进行修改并提交。

![img](https://s2.loli.net/2022/06/13/PVgeOMIw7ldr4ZS.png)

- 然后切换回master分支，同样对index.html进行修改并提交。

![img](https://s2.loli.net/2022/06/13/4DjGoRScBNq8WFd.png)

- 现在在两个分支中，都对index.html进行了修改， 先切换到master分支，然后调用merge进行合并

![img](https://s2.loli.net/2022/06/13/XfbexOCFZD65nI4.png)

- 合并时提示错误，CONFLICT (content): Merge conflict in index.html，conflict表示冲突，git尝试合并文件时发现冲突（因为两个分支都对该文件进行了修改）。首先git回尝试自动合并。Automatic merge failed; fix conflicts and then commit the result.表示自动合并失败，git无法处理这个问题，我们需要手动处理。
- 手动处理以后，需要调用`git add `文件名来标识冲突已解决。然后调用`git commit -m`提交一次即可完成合并。

![img](https://s2.loli.net/2022/06/13/ZkArStvJ4WfV2ba.png)

![img](https://s2.loli.net/2022/06/13/Bj7eXOvY6TH8tuJ.png)





## 远程仓库



- 克隆远程仓库

```
git clone 远程仓库地址
```

![img](https://s2.loli.net/2022/06/13/pK5tjMVgv1dFhnX.png)

- 推送代码

  - 推送代码是需要验证权限的，公开仓库虽然可以任意访问但并不是所有的用户都可以推送代码（推送权限可以在仓库中设置）。所以推送时需要你输入有权限用户的用户名和密码

  ![img](https://s2.loli.net/2022/06/13/fGbmlnYAxaIjTzF.png)