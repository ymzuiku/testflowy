# Why use Testflow?

[Web Site](https://testflowy.com/)

[Document](https://testflowy.com/#/welcome/doc)

## What is Testflow?

Testflow aspires to become the simplest Web automated testing platform. It can help front-end engineers and test engineers record behavior operations, and share test behavior through team accounts, facilitating any member of the team to quickly and conveniently return to automated testing

## Testflow compared with traditional manual writing (integration) test

For manually writing integration test code, there are always the following difficulties
How to quickly train engineers to learn how to write automated test code?
How to reduce the cost of writing integration test code?
How to make automated testing work better in the whole team?
In order to better cooperate in the whole team, you need to build a set of automated test platform, which requires 1-2 senior test engineers to spend tens of days
Using Testflow, you can easily solve the above problems
Engineers do not need to write test code
Easier aggregation, replication, mocking your test tasks
Through the Testflow team account system, automated testing can be coordinated across the entire team

## Advantages of Testflow

With Testflow, you only need to register to get a set of automated test platform. Engineers and testers do not need to write any code. Testflow will help you record your behavior and share it with the whole team to reuse your tests. All this is done in a real Web environment, without any additional virtual environment

## Disadvantages of Testflow

Testflow is based on a real browser environment. Its feature is that it has no construction cost and is more suitable for real business scenarios The disadvantage is that it only supports the browser platform, and the simulation of complex behavior is poor, and the ability of behavior involving external site authorization is poor (such as payment, cross-platform authorization, etc.) You need to use manual testing when it involves behavior across external sites

## Prerequisites

Install pnpm:

```sh
npm i -g pnpm
```

Use pnpm to install dependencies and link them:

```
pnpm i
```

## Development

```sh
pnpm dev
```

## Build

```sh
pnpm build
```

## Check

The project has commit interception, but please avoid maliciously bypassing the pnpm check before committing.

## Important

The package.json of the business code must have "private": true set to prevent accidental publishing of business code to npm.

To publish a package, all non-private packages in the packages directory will be published to npm, and the workspace:\* dependencies will be automatically modified. Make sure the pnpm version is greater than 7.4:

```sh
pnpm publish --no-git-checks -r
```

## Separating Business Code and Non-business Code

Keep the business code in several projects under the apps directory; abstract the non-business code into the packages directory.

## Project Constraints

The config directory contains unified eslint, ts-config, and test configurations for all projects and libraries. Reuse these configurations for all packages.

## Naming Conventions

1. APIs use account_read_one.
2. Constants use ACCOUNT_READ_ONE.
3. JavaScript functions and objects use accountReadOne.
4. Interfaces/Types use AccountReadOne.

## .env

Each .env file should be configured in both the apps/xxx and packages directories because their pg_url differs.

```sh
# translate
translate_appid="xxxxxxxxxx"
translate_password="xxxxxxxxxx"

# server-env
is_dev=1
slat="pkg_slat_v1"

# dbs
redis_url="redis://:xxxxxxxx@127.0.0.1:9379?db=1"
pg_url="postgres://postgres:xxxxxxxxxxxx@127.0.0.1:9432/db?sslmode=disable"

email_user="code@mail.tesitify.com"
email_pass="xxxxxxx"
email_host="smtp.qcloudmail.com"
email_port="465"

VITE_paypal_client_id="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
paypal_client_id="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
paypal_client_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
paypal_webhook_id="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

If using baidu i18n translation, please configure the env file:

```sh
# translate
translate_appid="xxxxxx"
translate_password="xxxxxxxxxxxx"
```

## .vscode Settings (Optional)

`.vscode/settings.json` :

```json
{
  "makefile.extensionOutputFolder": "./.vscode",
  "files.exclude": {
    "**/node_modules": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true
  }
}
```

## +serve Restful Semantics

```sh
Create - POST
Read - GET
Update - PATCH
Delete - DELETE
Create or update - PUT
```

Where PUT updates if historical data is found; otherwise, it creates a new entry.
