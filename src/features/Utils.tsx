
export default class Utils {

    static shuffleArray(array:any[]) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    static cutString(str:string, len:number) {
        if(str != null && str.length > len){
            return str.substring(0, len) + ' ...';
        }
        return str;
    }

}