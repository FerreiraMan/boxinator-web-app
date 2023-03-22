export class StorageUtil {

    public static sessionStorageSave<T>(key: string, value: any): void {
        // console.log(key, value)
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static sessionStorageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
          if (storedValue) {
            return JSON.parse(storedValue) as T;
          }
          return undefined;
        } catch (e) {
          sessionStorage.removeItem(key);
          return undefined;
        }
    
    }

    public static sessionStorageRemove<T>(key: string): T | undefined {
      try {
        sessionStorage.removeItem(key);
        return undefined;
      } catch (e) {
        console.log(`${key} does not exist`)
        return undefined;
      }
  
  }
}