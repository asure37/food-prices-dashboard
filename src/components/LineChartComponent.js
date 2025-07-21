import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data, provinces, currency = 'CAD' }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';

  if (!data || data.length === 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#111827'
        }}>
          {t('line_chart_title', { type: '' })}
        </h2>
        <p style={{ 
          color: '#6B7280', 
          fontSize: '16px',
          margin: '40px 0'
        }}>
          No data available for the selected criteria
        </p>
      </div>
    );
  }

  // Prepare chart data
  const chartData = data.map(item => {
    const chartItem = { date: item.date };
    provinces.forEach(province => {
      if (item[province] !== undefined) {
        chartItem[province] = item[province];
      }
    });
    return chartItem;
  });

  // Calculate consistent X-axis intervals
  const calculateInterval = () => {
    if (chartData.length <= 12) return 0; // Show all ticks if 12 or fewer data points
    if (chartData.length <= 24) return 1; // Show every other tick if 13-24 data points
    if (chartData.length <= 36) return 2; // Show every third tick if 25-36 data points
    if (chartData.length <= 48) return 3; // Show every fourth tick if 37-48 data points
    return Math.floor(chartData.length / 12); // Show approximately 12 ticks for larger datasets
  };

  // Custom tick function to ensure consistent intervals
  const getCustomTicks = () => {
    const totalPoints = chartData.length;
    const desiredTicks = 12; // We want approximately 12 ticks
    const interval = Math.max(1, Math.floor(totalPoints / desiredTicks));
    
    const ticks = [];
    for (let i = 0; i < totalPoints; i += interval) {
      if (i < totalPoints) {
        ticks.push(chartData[i].date);
      }
    }
    
    // Always include the last data point
    if (ticks[ticks.length - 1] !== chartData[totalPoints - 1].date) {
      ticks.push(chartData[totalPoints - 1].date);
    }
    
    return ticks;
  };

  const provinceColors = {
    'Ontario': '#EF4444', // Red
    'Quebec': '#10B981',  // Green
    'British Columbia': '#F59E0B' // Amber
  };

  // Custom tooltip with currency and locale formatting
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
            {new Date(label + '-01').toLocaleDateString(locale, { 
              year: 'numeric', 
              month: 'long' 
            })}
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
        {t('line_chart_title', { type: data[0]?.type ? t(`food_types.${data[0].type}`) : '' })}
      </h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {/* Subtle grid for context without clutter */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#F3F4F6" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="date" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tickFormatter={(value) => {
              const [year, month] = value.split('-');
              return `${month}/${year.slice(2)}`;
            }}
            ticks={getCustomTicks()}
            minTickGap={50}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          
          <YAxis 
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
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
          
          {provinces.map(prov => (
            <Line 
              key={prov} 
              type="monotone" 
              dataKey={prov} 
              name={prov}
              stroke={provinceColors[prov]}
              strokeWidth={3}
              dot={{ 
                fill: provinceColors[prov], 
                strokeWidth: 2, 
                r: 4,
                stroke: 'white'
              }}
              activeDot={{ 
                r: 6, 
                strokeWidth: 2,
                stroke: 'white',
                fill: provinceColors[prov]
              }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
