export interface IDefaultDataLoader {
  load(): Promise<void>;
}

export const loadDefaultData = (loaders: IDefaultDataLoader[]) => {
  loaders.forEach(async loader => {
    await loader.load();
  });
};
