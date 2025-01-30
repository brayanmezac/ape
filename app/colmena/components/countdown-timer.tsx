'use client'
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const isValidDate = targetDate && targetDate > new Date();

    if (!isValidDate) {
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return; // Salimos de useEffect si la fecha no es válida
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTime({ days, hours, minutes, seconds });
      } else {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isValidDate = targetDate && targetDate > new Date();

  if (!isValidDate) {
    return <div>Fecha no válida</div>;
  }

  return (
    <div className="bg-[#ff9797] text-white rounded-xl p-6 text-center">
      <div className="grid grid-cols-4 gap-4 text-4xl font-bold mb-2">
        <div>{String(time.days).padStart(3, "0")}</div>
        <div>{String(time.hours).padStart(2, "0")}</div>
        <div>{String(time.minutes).padStart(2, "0")}</div>
        <div>{String(time.seconds).padStart(2, "0")}</div>
      </div>
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>Día/s</div>
        <div>Hora/s</div>
        <div>Minuto/s</div>
        <div>Segundo/s</div>
      </div>
    </div>
  );
}