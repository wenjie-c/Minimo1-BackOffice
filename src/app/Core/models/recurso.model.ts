//Copia y pega del Backend


export default interface IRecurso {
    _id?: string;
    name: string;
    url: string; // ejemplo, url de la imagen de la portada del libro
    type: 'Manual' | 'Video' | 'Image' | 'Others';
    libro: string;
}