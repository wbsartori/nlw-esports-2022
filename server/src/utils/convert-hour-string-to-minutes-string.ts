/**
 * Converte horas em minutos
 * @param hourString
 */
export function convertHourStringToMinutesString(hourString:string){
    const [hours, minutes] = hourString.split(':').map(Number);
    return (hours * 60) + minutes;
}