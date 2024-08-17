import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();

import chroma from 'chroma-js';

function toPastel(color) {
    return chroma(color).set('hsl.s', 0.3).set('hsl.l', 0.6).hex();
}





export default async function corMedia(url: string) {

    console.log(url)
    try {


        let cor = await fac.getColorAsync(url)
        return toPastel(cor.hex)
    } catch (e) {
        console.log(e)
        return "#fcafab"
    }


}