import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB'
    }}>
      <span style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151'
      }}>
        {t('language')}:
      </span>
      <div style={{
        display: 'flex',
        gap: '4px'
      }}>
        <button 
          onClick={() => i18n.changeLanguage('en')}
          style={{
            padding: '6px 12px',
            border: i18n.language === 'en' ? '2px solid #EF4444' : '2px solid #D1D5DB',
            borderRadius: '6px',
            backgroundColor: i18n.language === 'en' ? '#FEF2F2' : 'white',
            color: i18n.language === 'en' ? '#EF4444' : '#6B7280',
            fontWeight: i18n.language === 'en' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            if (i18n.language !== 'en') {
              e.target.style.backgroundColor = '#FEF2F2';
              e.target.style.color = '#EF4444';
            }
          }}
          onMouseLeave={(e) => {
            if (i18n.language !== 'en') {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#6B7280';
            }
          }}
        >
          EN
        </button>
        <button 
          onClick={() => i18n.changeLanguage('fr')}
          style={{
            padding: '6px 12px',
            border: i18n.language === 'fr' ? '2px solid #EF4444' : '2px solid #D1D5DB',
            borderRadius: '6px',
            backgroundColor: i18n.language === 'fr' ? '#FEF2F2' : 'white',
            color: i18n.language === 'fr' ? '#EF4444' : '#6B7280',
            fontWeight: i18n.language === 'fr' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            if (i18n.language !== 'fr') {
              e.target.style.backgroundColor = '#FEF2F2';
              e.target.style.color = '#EF4444';
            }
          }}
          onMouseLeave={(e) => {
            if (i18n.language !== 'fr') {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#6B7280';
            }
          }}
        >
          FR
        </button>
      </div>
    </div>
  );
}
