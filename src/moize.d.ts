declare module 'moize' {
  class Moize {
    public static react<P>(component: (props: P, context?: any) => React.ReactElement<P>): (props: P, context?: any) => React.ReactElement<P>;
  }
  export default Moize;
}
