//Si uso esta interface como DTO los nombres deben ser IGUALES  los que están en el backend, cuando busque la info la va a buscar acá, si un nombre no coincide, esa info no existe.
export default interface IEducation {
  dataType: string;
  id_ed: number;
  titulo: string;
  institucion: string;
  img_inst: string;
  fechas: string;
  descripcion: string;
}
