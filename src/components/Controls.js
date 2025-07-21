// src/components/Controls.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Controls.css';

const Controls = ({
  provinces,
  selectedProvinces,
  onChangeProvinces,
  foodTypes,
  selectedFoodType,
  onChangeFoodType,
  dateRange,
  onChangeDateRange,
  currencies,
  selectedCurrency,
  onChangeCurrency,
  viewMode,
  onChangeViewMode,
  barChartDate,
  onChangeBarChartDate,
  barChartProvince,
  onChangeBarChartProvince
}) => {
  const { t } = useTranslation();

  const handleProvinceChange = (province) => {
    if (selectedProvinces.includes(province)) {
      onChangeProvinces(selectedProvinces.filter(p => p !== province));
    } else {
      onChangeProvinces([...selectedProvinces, province]);
    }
  };

  return (
    <div>
      {/* Section Title */}
      <h2 style={{
        fontSize: '32px',
        fontWeight: '900',
        color: '#111827',
        margin: '0 0 32px 0',
        textAlign: 'center',
        borderBottom: '3px solid #EF4444',
        paddingBottom: '16px',
        letterSpacing: '-0.01em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <span style={{fontSize: '32px', color: '#EF4444'}}>📊</span>
        {t('controls_title')}
      </h2>

      {/* Controls Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        alignItems: 'start',
        background: 'rgba(239,68,68,0.04)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '8px'
      }}>
        
        {/* Province Selection */}
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.10)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(239, 68, 68, 0.18)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#b91c1c',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#ef4444' }}>📍</span>
            {t('line_chart_province_selector')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#b91c1c',
            margin: '0 0 16px 0',
            lineHeight: '1.5',
            fontWeight: 400
          }}>
            {t('provinces_description')}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {provinces.map(province => (
              <label key={province} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                backgroundColor: selectedProvinces.includes(province) 
                  ? 'rgba(239, 68, 68, 0.18)' 
                  : 'transparent',
                border: selectedProvinces.includes(province) 
                  ? '2px solid #ef4444' 
                  : '2px solid transparent',
                outline: 'none'
              }}
              tabIndex={0}
              aria-checked={selectedProvinces.includes(province)}
              aria-label={province}
              onFocus={e => e.target.style.boxShadow = '0 0 0 3px #ef4444'}
              onBlur={e => e.target.style.boxShadow = 'none'}
              >
                <input
                  type="checkbox"
                  checked={selectedProvinces.includes(province)}
                  onChange={() => handleProvinceChange(province)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#ef4444',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                  aria-label={province}
                />
                <span style={{
                  fontWeight: selectedProvinces.includes(province) ? '700' : '400',
                  color: selectedProvinces.includes(province) ? '#ef4444' : '#b91c1c'
                }}>
                  {province}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Food Type Selection */}
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(16, 185, 129, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#10B981' }}>🥖</span>
            {t('food_type')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 16px 0',
            lineHeight: '1.5'
          }}>
            {t('food_type_description')}
          </p>
          <select
            value={selectedFoodType}
            onChange={(e) => onChangeFoodType(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              fontSize: '16px',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#10B981';
              e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.boxShadow = 'none';
            }}
          >
            {foodTypes.map(type => (
              <option key={type} value={type}>
                {t(`food_types.${type}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Selection */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(245, 158, 11, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#F59E0B' }}>📅</span>
            {t('date_range')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 16px 0',
            lineHeight: '1.5'
          }}>
            {t('date_range_description')}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                {t('start_date')}
              </label>
              <input
                type="month"
                value={dateRange.start}
                onChange={(e) => onChangeDateRange({...dateRange, start: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '2px solid #E5E7EB',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#374151',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F59E0B';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                {t('end_date')}
              </label>
              <input
                type="month"
                value={dateRange.end}
                onChange={(e) => onChangeDateRange({...dateRange, end: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '2px solid #E5E7EB',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#374151',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F59E0B';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Bar Chart Date Selection */}
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(239, 68, 68, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#EF4444' }}>📊</span>
            {t('bar_chart_date')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 16px 0',
            lineHeight: '1.5'
          }}>
            {t('bar_chart_date_description')}
          </p>
          <input
            type="month"
            value={barChartDate}
            onChange={e => onChangeBarChartDate(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#374151',
              outline: 'none',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            min={dateRange.start}
            max={dateRange.end}
          />
        </div>

        {/* Bar Chart Province Selection */}
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(16, 185, 129, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#10B981' }}>🏷️</span>
            {t('bar_chart_province')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 16px 0',
            lineHeight: '1.5'
          }}>
            {t('bar_chart_province_description')}
          </p>
          <select
            value={barChartProvince}
            onChange={e => onChangeBarChartProvince(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              fontSize: '16px',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s'
            }}
          >
            {provinces.map(province => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Selection */}
        <div style={{
          backgroundColor: 'rgba(99, 102, 241, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(99, 102, 241, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#6366F1' }}>💱</span>
            {t('currency')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 16px 0',
            lineHeight: '1.5'
          }}>
            {t('currency_description')}
          </p>
          <select
            value={selectedCurrency}
            onChange={(e) => onChangeCurrency(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              fontSize: '16px',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6366F1';
              e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.boxShadow = 'none';
            }}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency} - {t(`currencies.${currency}`)}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Selection */}
        <div style={{
          backgroundColor: 'rgba(168, 85, 247, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid rgba(168, 85, 247, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#A855F7' }}>📊</span>
            {t('view_mode')}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 16px 0',
            lineHeight: '1.5'
          }}>
            {t('view_mode_description')}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '12px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s',
              backgroundColor: viewMode === 'trends' 
                ? 'rgba(168, 85, 247, 0.1)' 
                : 'transparent',
              border: viewMode === 'trends' 
                ? '2px solid #A855F7' 
                : '2px solid transparent'
            }}>
              <input
                type="radio"
                name="viewMode"
                value="trends"
                checked={viewMode === 'trends'}
                onChange={(e) => onChangeViewMode(e.target.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#A855F7'
                }}
              />
              <div>
                <div style={{
                  fontWeight: viewMode === 'trends' ? '600' : '400',
                  color: viewMode === 'trends' ? '#A855F7' : '#374151',
                  fontSize: '16px'
                }}>
                  {t('trends_view')}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginTop: '4px'
                }}>
                  {t('trends_description')}
                </div>
              </div>
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '12px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s',
              backgroundColor: viewMode === 'comparison' 
                ? 'rgba(168, 85, 247, 0.1)' 
                : 'transparent',
              border: viewMode === 'comparison' 
                ? '2px solid #A855F7' 
                : '2px solid transparent'
            }}>
              <input
                type="radio"
                name="viewMode"
                value="comparison"
                checked={viewMode === 'comparison'}
                onChange={(e) => onChangeViewMode(e.target.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#A855F7'
                }}
              />
              <div>
                <div style={{
                  fontWeight: viewMode === 'comparison' ? '600' : '400',
                  color: viewMode === 'comparison' ? '#A855F7' : '#374151',
                  fontSize: '16px'
                }}>
                  {t('comparison_view')}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginTop: '4px'
                }}>
                  {t('comparison_description')}
                </div>
              </div>
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '12px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s',
              backgroundColor: viewMode === 'both' 
                ? 'rgba(168, 85, 247, 0.1)' 
                : 'transparent',
              border: viewMode === 'both' 
                ? '2px solid #A855F7' 
                : '2px solid transparent'
            }}>
              <input
                type="radio"
                name="viewMode"
                value="both"
                checked={viewMode === 'both'}
                onChange={(e) => onChangeViewMode(e.target.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#A855F7'
                }}
              />
              <div>
                <div style={{
                  fontWeight: viewMode === 'both' ? '600' : '400',
                  color: viewMode === 'both' ? '#A855F7' : '#374151',
                  fontSize: '16px'
                }}>
                  {t('both_view')}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginTop: '4px'
                }}>
                  {t('both_description')}
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
