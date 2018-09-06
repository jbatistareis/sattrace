export class MapData {
    constructor(
        public id: number,
        public name: string,
        public color: string,
        public orbitData: any,
        public marker: any,
        public path: any,
        public height?: number
    ) { }
}