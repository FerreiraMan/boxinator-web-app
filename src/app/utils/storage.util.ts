export class StorageUtil {
    // Function that saves the current session storage
    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    // Function that reads from the session storage
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
            if (storedValue) {
                return JSON.parse(storedValue) as T;
            }
            return undefined;
        }
        catch(e) { // Removes item from session storage
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}