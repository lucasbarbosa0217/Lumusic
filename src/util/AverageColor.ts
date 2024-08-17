import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();




export default async function corMedia(url : string){

    console.log(url)
    try{


        let cor = await fac.getColorAsync(url)
        return cor.hex
    }catch(e){
        console.log(e)
            return "#fcafab"
    }
      

}
