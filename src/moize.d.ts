declare module 'moize' {
  export function react<P>(component: (props: P, context?: any) => React.ReactNode): (props: P, context?: any) => React.ReactNode;
}
