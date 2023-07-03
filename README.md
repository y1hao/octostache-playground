# Octostache Playground

This repository demos how to build the dotnet app Octostache into webassembly and run it from browser.

See it in action: https://y1hao.github.io/octostache-playground/

Building this repo requires nodejs, npm and .Net 7.

You also need to install the webassembly workload for dotnet:

```sh
$ dotnet workload install wasm-tools
```


## Develop Locally

Install Node packages:

```sh
$ cd app && npm install
```

Build the dotnet project and start dev server for React.

```sh
# from the ./app directory
$ npm run dev
```

## Build

```sh
# from the ./app directory
$ npm run build
```