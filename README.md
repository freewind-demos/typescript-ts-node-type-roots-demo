TypeScript "ts-node" Use *.d.ts Files Demo
==========================================

当我们需要自己定义一些全局的类型，比如`declare global`，然后想在各个文件中
直接使用，而不需要再次import，则需要把这些类型放在一个`*.d.ts`文件中（而不是`*.ts`）中。
然后想办法让编译器能找到它们。

但这里有很多坑，需要特别注意。主要是因为`ts-node`跟typescript自带的`tsc`在一些
参数的处理上是不一样的，`ts-node`有自己的实现方式。

比如`ts-node`默认不会读取`tsconfig.json`中的`files/include`等参数，所以
在tsc中可行的办法（比如在`files`或`include`中包含`*.d.ts`文件），在ts-node
中就不可行。

在ts-node中，它推荐使用typeRoots的方式，有两个地方需要注意：

1. local typing files structure: `<typingDir>/<module>/index.d.ts`
2. in tsconfig.json, `typeRoots` config

同时需要注意，这种方式：

1. 对于webstorm有效，它可以正确的找到类型定义
2. 对于tsc反而无效，还是得`files/include`中包含。
（还要注意，必须在`files`包含全部需要的文件，在`tsc`命令行中不应该再单独指定部分文件，
否则会忽略`files`中的内容）。

所以这个demo中的tsconfig.json文件中，`typeRoots`是为`ts-node`准备的，
而`files`是为`tsc`准备的。

另外，除了这种方式，ts-node也可以使用`--files`参数，将在另一个demo中演示
（不过某些情况似乎有些问题）

最后有两个链接，内容非常重要。

```
npm install
npm run ts-node
npm run tsc
```

Reference
---------

- https://github.com/TypeStrong/ts-node#help-my-types-are-missing
- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types
