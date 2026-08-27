import React, { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { STUDIO_INFO } from '../constants';

const CalBooking: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'light',
          styles: {
            branding: {
              brandColor: '#b76e79', // Color Rose Gold de la marca
            }
          },
          hideEventTypeDetails: false,
          layout: 'month_view'
        });
      } catch (err) {
        console.error('Error al inicializar Cal.com:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full relative min-h-[550px] bg-white rounded-2xl border border-stone-150 overflow-hidden shadow-sm">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-50/50 backdrop-blur-xs z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-rose-gold/20 border-t-rose-gold rounded-full animate-spin"></div>
            <p className="text-stone-500 text-sm font-medium">Cargando agenda de citas...</p>
          </div>
        </div>
      )}
      <Cal
        calLink={STUDIO_INFO.calLink}
        style={{ width: '100%', height: '550px', overflow: 'auto' }}
        config={{ 
          layout: 'month_view',
          theme: 'light'
        }}
      />
    </div>
  );
};

export default CalBooking;
