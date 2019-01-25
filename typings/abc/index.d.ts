declare global {
  namespace NodeJS {
    interface Global {
      abc: number;
    }
  }
}

declare global {
  const abc: number;
}

export {}
