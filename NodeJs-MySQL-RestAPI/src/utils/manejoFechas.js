export class manejoFechas {
    constructor(date) {
      this.fechaActual = new Date(date);
    }
  
    formatearFecha(fecha) {
      const año = fecha.getFullYear();
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const dia = fecha.getDate().toString().padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    }
  
    agregarDias(dias) {
      const nuevaFecha = new Date(this.fechaActual);
      nuevaFecha.setDate(nuevaFecha.getDate() + dias);
      return nuevaFecha;
    }
  }