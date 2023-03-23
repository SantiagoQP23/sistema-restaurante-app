

export enum ValidHolidays {
  AÑO_NUEVO = 'Año Nuevo',
  CARNAVAL = 'Carnaval',
  VIERNES_SANTO = 'Viernes Santo',
  DIA_DEL_TRABAJO = 'Dia del Trabajo',
  BATALLA_DE_PICHINCHA = 'Batalla de Pichincha',
  PRIMER_GRITO_DE_INDEPENDENCIA = 'Primer Grito de Independencia',
  INDEPENDENCIA_DE_GUAYAQUIL = 'Independencia de Guayaquil',
  DIA_DE_DIFUNTOS = 'Día de Difuntos',
  INDEPENDENCIA_DE_CUENCA = 'Independencia de Cuenca',
  NAVIDAD = 'Navidad',
}

export enum ValidHolidaysNames {
  "Año Nuevo" = "AÑO_NUEVO",
  "Carnaval" = "CARNAVAL",
  "Viernes Santo" = "VIERNES_SANTO",
  "Dia del Trabajo" = "DIA_DEL_TRABAJO",
  "Batalla de Pichincha" = "BATALLA_DE_PICHINCHA",
  "Primer Grito de Independencia" = "PRIMER_GRITO_DE_INDEPENDENCIA",
  "Independencia de Guayaquil" = "INDEPENDENCIA_DE_GUAYAQUIL",
  "Día de Difuntos" = "DIA_DE_DIFUNTOS",
  "Independencia de Cuenca" = "INDEPENDENCIA_DE_CUENCA",
  "Navidad" = "NAVIDAD",
}

export interface Holiday {

  id: string;
  name: ValidHolidays;
  date: string;
  value: number;
  isActive: boolean


}