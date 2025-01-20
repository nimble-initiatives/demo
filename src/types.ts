declare module "@strifeapp/strife" {
  export function subscribe(callback: (data: any) => void): () => void;
}