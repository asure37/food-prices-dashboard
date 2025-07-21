import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data, date, province, foodTypes, currency = 'CAD' }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';

  // Filter data for the specific date and province
  const dateData = data.filter(item => item.date === date);
  const hasDataForDate = dateData.length > 0;

  // Prepare chart data for bar chart
  const chartData = hasDataForDate ? [{
    date: date,
    ...foodTypes.reduce((acc, foodType) => {
      const item = dateData.find(d => d.type === foodType);
      acc[foodType] = item ? item[province] : 0;
      return acc;
    }, {})
  }] : [];

  const foodTypeColors = {
    'Bread': '#EF4444', // Red
    'Milk': '#10B981',  // Green
    'Eggs': '#F59E0B'   // Amber
  };

  // Title logic
  const formatMonth = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return `${month}/${year}`;
  };
  let title = t('bar_chart_title', { date: formatMonth(date), province });

  if (!hasDataForDate) {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 0, 0, 0.07)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)',
        border: '2px solid #EF4444',
        textAlign: 'center',
        margin: '24px 0'
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{fontSize: '28px'}}>⚠️</span> {title}
        </h2>
        <p style={{ 
          color: '#B91C1C', 
          fontSize: '18px',
          margin: '40px 0',
          fontWeight: 600
        }}>
          {t('no_data_message', { date, province })}
        </p>
      </div>
    );
  }

  // Custom tooltip for better context
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontSize: '14px'
        }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontWeight: '600', 
            color: '#374151',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '4px'
          }}>
            {title}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '4px 0', 
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                borderRadius: '2px'
              }}></span>
              <span style={{ fontWeight: '500' }}>{entry.name}:</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>
                {currency === 'CAD' ? 'C$' : currency === 'USD' ? '$' : '€'}{Number(entry.value).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(45deg, rgba(239, 68, 68, 0.02) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(239, 68, 68, 0.02) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(239, 68, 68, 0.02) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(239, 68, 68, 0.02) 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        pointerEvents: 'none'
      }} />
      
      <h2 style={{
        margin: '0 0 24px 0',
        fontSize: '24px',
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {title}
      </h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {/* Subtle grid for context without clutter */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#F3F4F6" 
            vertical={false}
          />
          
          <XAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tick={false} // Hide X-axis labels since we have legend
            interval="preserveStartEnd"
          />
          
          <YAxis 
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            tickFormatter={(value) => {
              const symbol = currency === 'CAD' ? 'C$' : currency === 'USD' ? '$' : '€';
              return `${symbol}${Number(value).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
            }}
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{
              paddingBottom: '16px'
            }}
          />
          
          {foodTypes.map(foodType => {
            const dataPoint = chartData.find(item => item[foodType] !== undefined);
            return (
              <Bar 
                key={foodType}
                dataKey={foodType}
                fill={foodTypeColors[foodType]}
                name={t(`food_types.${foodType}`)}
                radius={[4, 4, 0, 0]} // Rounded top corners
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
