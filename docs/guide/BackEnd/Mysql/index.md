---
title: MySQL
date: 2021-11-09
sidebar: 'auto'
categories:
 - 后端
tags:
 - MySQL
---

# MySQL 数据库基础入门
MySQL是一种流行的关系型数据库管理系统，广泛应用于Web应用程序和其他数据驱动的应用程序中。本文将介绍MySQL数据库的基础知识，并提供一些SQL代码示例来演示常见的操作。

## 什么是MySQL
MySQL是一个开源的关系型数据库管理系统，以其高性能、可靠性和灵活性而闻名。它使用SQL（Structured Query Language）作为与数据库交互的语言。

## 安装和设置MySQL
要在Linux上使用dnf（适用于基于Fedora的发行版，如Fedora、CentOS、RHEL）安装MySQL，并配置root用户账号密码登录，可以按照以下步骤进行操作：

打开终端，并以具有管理员权限的用户身份登录系统。

运行以下命令更新软件包列表：

```bash
sudo dnf update
```
安装MySQL服务器包：

```bash
sudo dnf install mysql-server
```
这将安装MySQL服务器以及相关的依赖项。

安装完成后，启动MySQL服务：

```bash
sudo systemctl start mysqld
```
这将启动MySQL服务器。

运行以下命令来保证MySQL服务在系统启动时自动启动：

```bash
sudo systemctl enable mysqld
```
使用以下命令获取初始的临时root用户密码：

``` bash
sudo grep 'temporary password' /var/log/mysqld.log
```
命令的输出将包含一个临时密码，类似于：A temporary password is generated for root@localhost: AbCdEfGhIjKl.

运行以下命令以提供初始设置：


```bash
sudo mysql_secure_installation
```
然后按照提示进行配置。你将被要求输入初始临时密码，然后设置新的root用户密码，并选择其他安全选项。

配置完毕后，使用以下命令重新加载MySQL服务：

```bash
sudo systemctl restart mysqld
```
最后，你可以使用以下命令登录MySQL：

```bash
mysql -u root -p
```
系统将提示你输入先前设置的root用户密码。成功登录后，你就可以在MySQL中执行各种操作了。

这样，你就在Linux上使用dnf安装了MySQL，并配置了root用户账号密码登录。请确保在实际操作中根据自己的需要进行相应的修改。

## 创建数据库
在MySQL中，你可以使用以下SQL语句创建数据库：

```sql
CREATE DATABASE mydatabase;
```
以上命令将创建一个名为mydatabase的数据库。你可以将其替换为你想要的数据库名称。

## 创建表
在数据库中，数据存储在表中。下面是一个创建表的示例：

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);
```
以上示例创建了一个名为users的表，包含id、name和email三个列。id列是主键，name和email列是VARCHAR类型的。

## 插入数据
一旦表创建完成，你可以使用INSERT INTO语句向表中插入数据。例如：

```sql
INSERT INTO users (id, name, email)
VALUES (1, 'John Doe', 'john@example.com');

INSERT INTO users (id, name, email)
VALUES (2, 'Jane Smith', 'jane@example.com');
```
以上示例将向users表中插入两行数据。

## 查询数据
要从表中检索数据，你可以使用SELECT语句。以下是一个简单的查询示例：

```sql
SELECT * FROM users;
```
以上示例将返回users表中的所有行和列。你可以使用更复杂的查询条件和操作符来过滤和排序结果。

## 更新数据
要更新表中的数据，使用UPDATE语句。以下示例将更新名为John Doe的用户的电子邮件地址：

```sql
UPDATE users
SET email = 'newemail@example.com'
WHERE name = 'John Doe';
```
## 删除数据
要删除表中的数据，使用DELETE FROM语句。以下示例将删除名为Jane Smith的用户：

```sql
DELETE FROM users
WHERE name = 'Jane Smith';
```