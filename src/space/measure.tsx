class SurfaceMeasure {
    public constructor(
        public readonly width: number,
        public readonly height: number,
    ) { }

    public update(width: number, height: number) {
        if (width !== this.width || height !== this.height) {
            return new SurfaceMeasure(width, height);
        }
        return this;
    }
}
export default SurfaceMeasure;
