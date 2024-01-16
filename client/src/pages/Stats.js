import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import DefaultLayout from '../components/DefaultLayout';
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { BarController, BarElement } from 'chart.js';
Chart.register(LinearScale, BarController, BarElement, CategoryScale);

function Stats() {
  const [roomData, setRoomData] = useState([]);
  const [mostBookedMonth, setMostBookedMonth] = useState('');
  const [mostBookedHours, setMostBookedHours] = useState('');

  const calculateStats = () => {
    // Calcular el mes del año con más alquileres de vehículos
    const bookingsByMonth = Array(12).fill(0); // Inicializar un array de 12 elementos con valor 0

    roomData.forEach((room) => {
      room.bookedTimeSlots.forEach((booking) => {
        const month = moment(booking.from).month();
        bookingsByMonth[month]++;
      });
    });

    const maxBookingsMonthIndex = bookingsByMonth.indexOf(Math.max(...bookingsByMonth));
    const mostBookedMonthName = moment().month(maxBookingsMonthIndex).format('MMM');
    setMostBookedMonth(mostBookedMonthName);

    // Calcular las horas más ocupadas
    const bookingsByHour = Array(24).fill(0); // Inicializar un array de 24 elementos con valor 0

    roomData.forEach((room) => {
      room.bookedTimeSlots.forEach((booking) => {
        const startHour = moment(booking.from).hour();
        const endHour = moment(booking.to).hour();

        for (let hour = startHour; hour <= endHour; hour++) {
          bookingsByHour[hour]++;
        }
      });
    });

    const maxBookingsHourIndex = bookingsByHour.indexOf(Math.max(...bookingsByHour));
    setMostBookedHours(`${maxBookingsHourIndex}:00 - ${maxBookingsHourIndex + 1}:00`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('/api/rooms/getallrooms');
        const rooms = response.data;
        setRoomData(rooms);
      } catch (error) {
        console.error('Error al obtener las habitaciones', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [roomData]);

  useEffect(() => {
    // Configuración y renderizado de la gráfica de barras
    const barChartCanvas = document.getElementById('barChart');
    const barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: roomData.map((room) => room.name),
        datasets: [
          {
            label: 'Número de solicitudes',
            data: roomData.map((room) => room.bookedTimeSlots.length),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [roomData]);

  return (
    <DefaultLayout>
      <div>
        <h1>Estadisticas</h1>
        <canvas id='barChart' width='400' height='200'></canvas>
        <p>Mes con más alquileres: {mostBookedMonth}</p>
        <p>Horas más ocupados: {mostBookedHours}</p>
      </div>
    </DefaultLayout>
  );
}

export default Stats;
