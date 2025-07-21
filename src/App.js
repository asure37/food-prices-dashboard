// src/App.js

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Controls from './components/Controls';
import LineChartComponent from './components/LineChartComponent';
import BarChartComponent from './components/BarChartComponent';
import LanguageSelector from './components/LanguageSelector';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [rawData, setRawData] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState(['Ontario']);
  const [selectedFoodType, setSelectedFoodType] = useState('Bread');
  const [dateRange, setDateRange] = useState({
    start: '2020-01',
    end: '2024-12'
  });
  const [selectedCurrency, setSelectedCurrency] = useState('CAD');
  const [viewMode, setViewMode] = useState('trends'); // 'trends' or 'comparison'
  const [barChartDate, setBarChartDate] = useState('');
  const [barChartProvince, setBarChartProvince] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample data with more comprehensive information
  const sampleData = [
    // 2020 data - Monthly intervals
    { date: '2020-01', type: 'Bread', Ontario: 2.85, Quebec: 2.78, 'British Columbia': 3.12, currency: 'CAD' },
    { date: '2020-02', type: 'Bread', Ontario: 2.87, Quebec: 2.80, 'British Columbia': 3.15, currency: 'CAD' },
    { date: '2020-03', type: 'Bread', Ontario: 2.90, Quebec: 2.82, 'British Columbia': 3.18, currency: 'CAD' },
    { date: '2020-04', type: 'Bread', Ontario: 2.95, Quebec: 2.85, 'British Columbia': 3.22, currency: 'CAD' },
    { date: '2020-05', type: 'Bread', Ontario: 2.98, Quebec: 2.88, 'British Columbia': 3.25, currency: 'CAD' },
    { date: '2020-06', type: 'Bread', Ontario: 3.02, Quebec: 2.90, 'British Columbia': 3.28, currency: 'CAD' },
    { date: '2020-07', type: 'Bread', Ontario: 3.05, Quebec: 2.92, 'British Columbia': 3.30, currency: 'CAD' },
    { date: '2020-08', type: 'Bread', Ontario: 3.08, Quebec: 2.95, 'British Columbia': 3.32, currency: 'CAD' },
    { date: '2020-09', type: 'Bread', Ontario: 3.12, Quebec: 2.98, 'British Columbia': 3.35, currency: 'CAD' },
    { date: '2020-10', type: 'Bread', Ontario: 3.15, Quebec: 3.00, 'British Columbia': 3.38, currency: 'CAD' },
    { date: '2020-11', type: 'Bread', Ontario: 3.18, Quebec: 3.02, 'British Columbia': 3.40, currency: 'CAD' },
    { date: '2020-12', type: 'Bread', Ontario: 3.20, Quebec: 3.05, 'British Columbia': 3.42, currency: 'CAD' },
    
    // 2021 data - Monthly intervals
    { date: '2021-01', type: 'Bread', Ontario: 3.25, Quebec: 3.15, 'British Columbia': 3.52, currency: 'CAD' },
    { date: '2021-02', type: 'Bread', Ontario: 3.28, Quebec: 3.18, 'British Columbia': 3.55, currency: 'CAD' },
    { date: '2021-03', type: 'Bread', Ontario: 3.32, Quebec: 3.22, 'British Columbia': 3.58, currency: 'CAD' },
    { date: '2021-04', type: 'Bread', Ontario: 3.35, Quebec: 3.25, 'British Columbia': 3.62, currency: 'CAD' },
    { date: '2021-05', type: 'Bread', Ontario: 3.38, Quebec: 3.28, 'British Columbia': 3.65, currency: 'CAD' },
    { date: '2021-06', type: 'Bread', Ontario: 3.42, Quebec: 3.32, 'British Columbia': 3.68, currency: 'CAD' },
    { date: '2021-07', type: 'Bread', Ontario: 3.45, Quebec: 3.35, 'British Columbia': 3.70, currency: 'CAD' },
    { date: '2021-08', type: 'Bread', Ontario: 3.48, Quebec: 3.38, 'British Columbia': 3.72, currency: 'CAD' },
    { date: '2021-09', type: 'Bread', Ontario: 3.52, Quebec: 3.42, 'British Columbia': 3.75, currency: 'CAD' },
    { date: '2021-10', type: 'Bread', Ontario: 3.55, Quebec: 3.45, 'British Columbia': 3.78, currency: 'CAD' },
    { date: '2021-11', type: 'Bread', Ontario: 3.58, Quebec: 3.48, 'British Columbia': 3.80, currency: 'CAD' },
    { date: '2021-12', type: 'Bread', Ontario: 3.60, Quebec: 3.50, 'British Columbia': 3.82, currency: 'CAD' },
    
    // 2022 data - Monthly intervals
    { date: '2022-01', type: 'Bread', Ontario: 3.65, Quebec: 3.55, 'British Columbia': 3.92, currency: 'CAD' },
    { date: '2022-02', type: 'Bread', Ontario: 3.68, Quebec: 3.58, 'British Columbia': 3.95, currency: 'CAD' },
    { date: '2022-03', type: 'Bread', Ontario: 3.72, Quebec: 3.62, 'British Columbia': 3.98, currency: 'CAD' },
    { date: '2022-04', type: 'Bread', Ontario: 3.75, Quebec: 3.65, 'British Columbia': 4.02, currency: 'CAD' },
    { date: '2022-05', type: 'Bread', Ontario: 3.78, Quebec: 3.68, 'British Columbia': 4.05, currency: 'CAD' },
    { date: '2022-06', type: 'Bread', Ontario: 3.82, Quebec: 3.72, 'British Columbia': 4.08, currency: 'CAD' },
    { date: '2022-07', type: 'Bread', Ontario: 3.85, Quebec: 3.75, 'British Columbia': 4.10, currency: 'CAD' },
    { date: '2022-08', type: 'Bread', Ontario: 3.88, Quebec: 3.78, 'British Columbia': 4.12, currency: 'CAD' },
    { date: '2022-09', type: 'Bread', Ontario: 3.92, Quebec: 3.82, 'British Columbia': 4.15, currency: 'CAD' },
    { date: '2022-10', type: 'Bread', Ontario: 3.95, Quebec: 3.85, 'British Columbia': 4.18, currency: 'CAD' },
    { date: '2022-11', type: 'Bread', Ontario: 3.98, Quebec: 3.88, 'British Columbia': 4.20, currency: 'CAD' },
    { date: '2022-12', type: 'Bread', Ontario: 4.00, Quebec: 3.90, 'British Columbia': 4.22, currency: 'CAD' },
    
    // 2023 data - Monthly intervals
    { date: '2023-01', type: 'Bread', Ontario: 4.05, Quebec: 3.95, 'British Columbia': 4.32, currency: 'CAD' },
    { date: '2023-02', type: 'Bread', Ontario: 4.08, Quebec: 3.98, 'British Columbia': 4.35, currency: 'CAD' },
    { date: '2023-03', type: 'Bread', Ontario: 4.12, Quebec: 4.02, 'British Columbia': 4.38, currency: 'CAD' },
    { date: '2023-04', type: 'Bread', Ontario: 4.15, Quebec: 4.05, 'British Columbia': 4.42, currency: 'CAD' },
    { date: '2023-05', type: 'Bread', Ontario: 4.18, Quebec: 4.08, 'British Columbia': 4.45, currency: 'CAD' },
    { date: '2023-06', type: 'Bread', Ontario: 4.22, Quebec: 4.12, 'British Columbia': 4.48, currency: 'CAD' },
    { date: '2023-07', type: 'Bread', Ontario: 4.25, Quebec: 4.15, 'British Columbia': 4.50, currency: 'CAD' },
    { date: '2023-08', type: 'Bread', Ontario: 4.28, Quebec: 4.18, 'British Columbia': 4.52, currency: 'CAD' },
    { date: '2023-09', type: 'Bread', Ontario: 4.32, Quebec: 4.22, 'British Columbia': 4.55, currency: 'CAD' },
    { date: '2023-10', type: 'Bread', Ontario: 4.35, Quebec: 4.25, 'British Columbia': 4.58, currency: 'CAD' },
    { date: '2023-11', type: 'Bread', Ontario: 4.38, Quebec: 4.28, 'British Columbia': 4.60, currency: 'CAD' },
    { date: '2023-12', type: 'Bread', Ontario: 4.40, Quebec: 4.30, 'British Columbia': 4.62, currency: 'CAD' },
    
    // 2024 data - Monthly intervals
    { date: '2024-01', type: 'Bread', Ontario: 4.45, Quebec: 4.35, 'British Columbia': 4.72, currency: 'CAD' },
    { date: '2024-02', type: 'Bread', Ontario: 4.48, Quebec: 4.38, 'British Columbia': 4.75, currency: 'CAD' },
    { date: '2024-03', type: 'Bread', Ontario: 4.52, Quebec: 4.42, 'British Columbia': 4.78, currency: 'CAD' },
    { date: '2024-04', type: 'Bread', Ontario: 4.55, Quebec: 4.45, 'British Columbia': 4.82, currency: 'CAD' },
    { date: '2024-05', type: 'Bread', Ontario: 4.58, Quebec: 4.48, 'British Columbia': 4.85, currency: 'CAD' },
    { date: '2024-06', type: 'Bread', Ontario: 4.62, Quebec: 4.52, 'British Columbia': 4.88, currency: 'CAD' },
    { date: '2024-07', type: 'Bread', Ontario: 4.65, Quebec: 4.55, 'British Columbia': 4.90, currency: 'CAD' },
    { date: '2024-08', type: 'Bread', Ontario: 4.68, Quebec: 4.58, 'British Columbia': 4.92, currency: 'CAD' },
    { date: '2024-09', type: 'Bread', Ontario: 4.72, Quebec: 4.62, 'British Columbia': 4.95, currency: 'CAD' },
    { date: '2024-10', type: 'Bread', Ontario: 4.75, Quebec: 4.65, 'British Columbia': 4.98, currency: 'CAD' },
    { date: '2024-11', type: 'Bread', Ontario: 4.78, Quebec: 4.68, 'British Columbia': 5.00, currency: 'CAD' },
    { date: '2024-12', type: 'Bread', Ontario: 4.80, Quebec: 4.70, 'British Columbia': 5.02, currency: 'CAD' },
    
    // Milk data - 2020-2024 with monthly intervals
    { date: '2020-01', type: 'Milk', Ontario: 4.25, Quebec: 4.15, 'British Columbia': 4.45, currency: 'CAD' },
    { date: '2020-02', type: 'Milk', Ontario: 4.28, Quebec: 4.18, 'British Columbia': 4.48, currency: 'CAD' },
    { date: '2020-03', type: 'Milk', Ontario: 4.30, Quebec: 4.20, 'British Columbia': 4.50, currency: 'CAD' },
    { date: '2020-04', type: 'Milk', Ontario: 4.35, Quebec: 4.25, 'British Columbia': 4.55, currency: 'CAD' },
    { date: '2020-05', type: 'Milk', Ontario: 4.38, Quebec: 4.28, 'British Columbia': 4.58, currency: 'CAD' },
    { date: '2020-06', type: 'Milk', Ontario: 4.40, Quebec: 4.30, 'British Columbia': 4.60, currency: 'CAD' },
    { date: '2020-07', type: 'Milk', Ontario: 4.42, Quebec: 4.32, 'British Columbia': 4.62, currency: 'CAD' },
    { date: '2020-08', type: 'Milk', Ontario: 4.45, Quebec: 4.35, 'British Columbia': 4.65, currency: 'CAD' },
    { date: '2020-09', type: 'Milk', Ontario: 4.48, Quebec: 4.38, 'British Columbia': 4.68, currency: 'CAD' },
    { date: '2020-10', type: 'Milk', Ontario: 4.50, Quebec: 4.40, 'British Columbia': 4.70, currency: 'CAD' },
    { date: '2020-11', type: 'Milk', Ontario: 4.52, Quebec: 4.42, 'British Columbia': 4.72, currency: 'CAD' },
    { date: '2020-12', type: 'Milk', Ontario: 4.55, Quebec: 4.45, 'British Columbia': 4.75, currency: 'CAD' },
    
    // 2021 Milk data - Monthly intervals
    { date: '2021-01', type: 'Milk', Ontario: 4.65, Quebec: 4.55, 'British Columbia': 4.85, currency: 'CAD' },
    { date: '2021-02', type: 'Milk', Ontario: 4.68, Quebec: 4.58, 'British Columbia': 4.88, currency: 'CAD' },
    { date: '2021-03', type: 'Milk', Ontario: 4.70, Quebec: 4.60, 'British Columbia': 4.90, currency: 'CAD' },
    { date: '2021-04', type: 'Milk', Ontario: 4.75, Quebec: 4.65, 'British Columbia': 4.95, currency: 'CAD' },
    { date: '2021-05', type: 'Milk', Ontario: 4.78, Quebec: 4.68, 'British Columbia': 4.98, currency: 'CAD' },
    { date: '2021-06', type: 'Milk', Ontario: 4.80, Quebec: 4.70, 'British Columbia': 5.00, currency: 'CAD' },
    { date: '2021-07', type: 'Milk', Ontario: 4.82, Quebec: 4.72, 'British Columbia': 5.02, currency: 'CAD' },
    { date: '2021-08', type: 'Milk', Ontario: 4.85, Quebec: 4.75, 'British Columbia': 5.05, currency: 'CAD' },
    { date: '2021-09', type: 'Milk', Ontario: 4.88, Quebec: 4.78, 'British Columbia': 5.08, currency: 'CAD' },
    { date: '2021-10', type: 'Milk', Ontario: 4.90, Quebec: 4.80, 'British Columbia': 5.10, currency: 'CAD' },
    { date: '2021-11', type: 'Milk', Ontario: 4.92, Quebec: 4.82, 'British Columbia': 5.12, currency: 'CAD' },
    { date: '2021-12', type: 'Milk', Ontario: 4.95, Quebec: 4.85, 'British Columbia': 5.15, currency: 'CAD' },
    
    // 2022 Milk data - Monthly intervals
    { date: '2022-01', type: 'Milk', Ontario: 5.05, Quebec: 4.95, 'British Columbia': 5.25, currency: 'CAD' },
    { date: '2022-02', type: 'Milk', Ontario: 5.08, Quebec: 4.98, 'British Columbia': 5.28, currency: 'CAD' },
    { date: '2022-03', type: 'Milk', Ontario: 5.10, Quebec: 5.00, 'British Columbia': 5.30, currency: 'CAD' },
    { date: '2022-04', type: 'Milk', Ontario: 5.15, Quebec: 5.05, 'British Columbia': 5.35, currency: 'CAD' },
    { date: '2022-05', type: 'Milk', Ontario: 5.18, Quebec: 5.08, 'British Columbia': 5.38, currency: 'CAD' },
    { date: '2022-06', type: 'Milk', Ontario: 5.20, Quebec: 5.10, 'British Columbia': 5.40, currency: 'CAD' },
    { date: '2022-07', type: 'Milk', Ontario: 5.22, Quebec: 5.12, 'British Columbia': 5.42, currency: 'CAD' },
    { date: '2022-08', type: 'Milk', Ontario: 5.25, Quebec: 5.15, 'British Columbia': 5.45, currency: 'CAD' },
    { date: '2022-09', type: 'Milk', Ontario: 5.28, Quebec: 5.18, 'British Columbia': 5.48, currency: 'CAD' },
    { date: '2022-10', type: 'Milk', Ontario: 5.30, Quebec: 5.20, 'British Columbia': 5.50, currency: 'CAD' },
    { date: '2022-11', type: 'Milk', Ontario: 5.32, Quebec: 5.22, 'British Columbia': 5.52, currency: 'CAD' },
    { date: '2022-12', type: 'Milk', Ontario: 5.35, Quebec: 5.25, 'British Columbia': 5.55, currency: 'CAD' },
    
    // 2023 Milk data - Monthly intervals
    { date: '2023-01', type: 'Milk', Ontario: 5.45, Quebec: 5.35, 'British Columbia': 5.65, currency: 'CAD' },
    { date: '2023-02', type: 'Milk', Ontario: 5.48, Quebec: 5.38, 'British Columbia': 5.68, currency: 'CAD' },
    { date: '2023-03', type: 'Milk', Ontario: 5.50, Quebec: 5.40, 'British Columbia': 5.70, currency: 'CAD' },
    { date: '2023-04', type: 'Milk', Ontario: 5.55, Quebec: 5.45, 'British Columbia': 5.75, currency: 'CAD' },
    { date: '2023-05', type: 'Milk', Ontario: 5.58, Quebec: 5.48, 'British Columbia': 5.78, currency: 'CAD' },
    { date: '2023-06', type: 'Milk', Ontario: 5.60, Quebec: 5.50, 'British Columbia': 5.80, currency: 'CAD' },
    { date: '2023-07', type: 'Milk', Ontario: 5.62, Quebec: 5.52, 'British Columbia': 5.82, currency: 'CAD' },
    { date: '2023-08', type: 'Milk', Ontario: 5.65, Quebec: 5.55, 'British Columbia': 5.85, currency: 'CAD' },
    { date: '2023-09', type: 'Milk', Ontario: 5.68, Quebec: 5.58, 'British Columbia': 5.88, currency: 'CAD' },
    { date: '2023-10', type: 'Milk', Ontario: 5.70, Quebec: 5.60, 'British Columbia': 5.90, currency: 'CAD' },
    { date: '2023-11', type: 'Milk', Ontario: 5.72, Quebec: 5.62, 'British Columbia': 5.92, currency: 'CAD' },
    { date: '2023-12', type: 'Milk', Ontario: 5.75, Quebec: 5.65, 'British Columbia': 5.95, currency: 'CAD' },
    
    // 2024 Milk data - Monthly intervals
    { date: '2024-01', type: 'Milk', Ontario: 5.85, Quebec: 5.75, 'British Columbia': 6.05, currency: 'CAD' },
    { date: '2024-02', type: 'Milk', Ontario: 5.88, Quebec: 5.78, 'British Columbia': 6.08, currency: 'CAD' },
    { date: '2024-03', type: 'Milk', Ontario: 5.90, Quebec: 5.80, 'British Columbia': 6.10, currency: 'CAD' },
    { date: '2024-04', type: 'Milk', Ontario: 5.95, Quebec: 5.85, 'British Columbia': 6.15, currency: 'CAD' },
    { date: '2024-05', type: 'Milk', Ontario: 5.98, Quebec: 5.88, 'British Columbia': 6.18, currency: 'CAD' },
    { date: '2024-06', type: 'Milk', Ontario: 6.00, Quebec: 5.90, 'British Columbia': 6.20, currency: 'CAD' },
    { date: '2024-07', type: 'Milk', Ontario: 6.02, Quebec: 5.92, 'British Columbia': 6.22, currency: 'CAD' },
    { date: '2024-08', type: 'Milk', Ontario: 6.05, Quebec: 5.95, 'British Columbia': 6.25, currency: 'CAD' },
    { date: '2024-09', type: 'Milk', Ontario: 6.08, Quebec: 5.98, 'British Columbia': 6.28, currency: 'CAD' },
    { date: '2024-10', type: 'Milk', Ontario: 6.10, Quebec: 6.00, 'British Columbia': 6.30, currency: 'CAD' },
    { date: '2024-11', type: 'Milk', Ontario: 6.12, Quebec: 6.02, 'British Columbia': 6.32, currency: 'CAD' },
    { date: '2024-12', type: 'Milk', Ontario: 6.15, Quebec: 6.05, 'British Columbia': 6.35, currency: 'CAD' },
    
    // Eggs data - 2020-2024 with monthly intervals
    { date: '2020-01', type: 'Eggs', Ontario: 3.85, Quebec: 3.75, 'British Columbia': 4.05, currency: 'CAD' },
    { date: '2020-02', type: 'Eggs', Ontario: 3.88, Quebec: 3.78, 'British Columbia': 4.08, currency: 'CAD' },
    { date: '2020-03', type: 'Eggs', Ontario: 3.90, Quebec: 3.80, 'British Columbia': 4.10, currency: 'CAD' },
    { date: '2020-04', type: 'Eggs', Ontario: 3.95, Quebec: 3.85, 'British Columbia': 4.15, currency: 'CAD' },
    { date: '2020-05', type: 'Eggs', Ontario: 3.98, Quebec: 3.88, 'British Columbia': 4.18, currency: 'CAD' },
    { date: '2020-06', type: 'Eggs', Ontario: 4.00, Quebec: 3.90, 'British Columbia': 4.20, currency: 'CAD' },
    { date: '2020-07', type: 'Eggs', Ontario: 4.02, Quebec: 3.92, 'British Columbia': 4.22, currency: 'CAD' },
    { date: '2020-08', type: 'Eggs', Ontario: 4.05, Quebec: 3.95, 'British Columbia': 4.25, currency: 'CAD' },
    { date: '2020-09', type: 'Eggs', Ontario: 4.08, Quebec: 3.98, 'British Columbia': 4.28, currency: 'CAD' },
    { date: '2020-10', type: 'Eggs', Ontario: 4.10, Quebec: 4.00, 'British Columbia': 4.30, currency: 'CAD' },
    { date: '2020-11', type: 'Eggs', Ontario: 4.12, Quebec: 4.02, 'British Columbia': 4.32, currency: 'CAD' },
    { date: '2020-12', type: 'Eggs', Ontario: 4.15, Quebec: 4.05, 'British Columbia': 4.35, currency: 'CAD' },
    
    // 2021 Eggs data - Monthly intervals
    { date: '2021-01', type: 'Eggs', Ontario: 4.25, Quebec: 4.15, 'British Columbia': 4.45, currency: 'CAD' },
    { date: '2021-02', type: 'Eggs', Ontario: 4.28, Quebec: 4.18, 'British Columbia': 4.48, currency: 'CAD' },
    { date: '2021-03', type: 'Eggs', Ontario: 4.30, Quebec: 4.20, 'British Columbia': 4.50, currency: 'CAD' },
    { date: '2021-04', type: 'Eggs', Ontario: 4.35, Quebec: 4.25, 'British Columbia': 4.55, currency: 'CAD' },
    { date: '2021-05', type: 'Eggs', Ontario: 4.38, Quebec: 4.28, 'British Columbia': 4.58, currency: 'CAD' },
    { date: '2021-06', type: 'Eggs', Ontario: 4.40, Quebec: 4.30, 'British Columbia': 4.60, currency: 'CAD' },
    { date: '2021-07', type: 'Eggs', Ontario: 4.42, Quebec: 4.32, 'British Columbia': 4.62, currency: 'CAD' },
    { date: '2021-08', type: 'Eggs', Ontario: 4.45, Quebec: 4.35, 'British Columbia': 4.65, currency: 'CAD' },
    { date: '2021-09', type: 'Eggs', Ontario: 4.48, Quebec: 4.38, 'British Columbia': 4.68, currency: 'CAD' },
    { date: '2021-10', type: 'Eggs', Ontario: 4.50, Quebec: 4.40, 'British Columbia': 4.70, currency: 'CAD' },
    { date: '2021-11', type: 'Eggs', Ontario: 4.52, Quebec: 4.42, 'British Columbia': 4.72, currency: 'CAD' },
    { date: '2021-12', type: 'Eggs', Ontario: 4.55, Quebec: 4.45, 'British Columbia': 4.75, currency: 'CAD' },
    
    // 2022 Eggs data - Monthly intervals
    { date: '2022-01', type: 'Eggs', Ontario: 4.65, Quebec: 4.55, 'British Columbia': 4.85, currency: 'CAD' },
    { date: '2022-02', type: 'Eggs', Ontario: 4.68, Quebec: 4.58, 'British Columbia': 4.88, currency: 'CAD' },
    { date: '2022-03', type: 'Eggs', Ontario: 4.70, Quebec: 4.60, 'British Columbia': 4.90, currency: 'CAD' },
    { date: '2022-04', type: 'Eggs', Ontario: 4.75, Quebec: 4.65, 'British Columbia': 4.95, currency: 'CAD' },
    { date: '2022-05', type: 'Eggs', Ontario: 4.78, Quebec: 4.68, 'British Columbia': 4.98, currency: 'CAD' },
    { date: '2022-06', type: 'Eggs', Ontario: 4.80, Quebec: 4.70, 'British Columbia': 5.00, currency: 'CAD' },
    { date: '2022-07', type: 'Eggs', Ontario: 4.82, Quebec: 4.72, 'British Columbia': 5.02, currency: 'CAD' },
    { date: '2022-08', type: 'Eggs', Ontario: 4.85, Quebec: 4.75, 'British Columbia': 5.05, currency: 'CAD' },
    { date: '2022-09', type: 'Eggs', Ontario: 4.88, Quebec: 4.78, 'British Columbia': 5.08, currency: 'CAD' },
    { date: '2022-10', type: 'Eggs', Ontario: 4.90, Quebec: 4.80, 'British Columbia': 5.10, currency: 'CAD' },
    { date: '2022-11', type: 'Eggs', Ontario: 4.92, Quebec: 4.82, 'British Columbia': 5.12, currency: 'CAD' },
    { date: '2022-12', type: 'Eggs', Ontario: 4.95, Quebec: 4.85, 'British Columbia': 5.15, currency: 'CAD' },
    
    // 2023 Eggs data - Monthly intervals
    { date: '2023-01', type: 'Eggs', Ontario: 5.05, Quebec: 4.95, 'British Columbia': 5.25, currency: 'CAD' },
    { date: '2023-02', type: 'Eggs', Ontario: 5.08, Quebec: 4.98, 'British Columbia': 5.28, currency: 'CAD' },
    { date: '2023-03', type: 'Eggs', Ontario: 5.10, Quebec: 5.00, 'British Columbia': 5.30, currency: 'CAD' },
    { date: '2023-04', type: 'Eggs', Ontario: 5.15, Quebec: 5.05, 'British Columbia': 5.35, currency: 'CAD' },
    { date: '2023-05', type: 'Eggs', Ontario: 5.18, Quebec: 5.08, 'British Columbia': 5.38, currency: 'CAD' },
    { date: '2023-06', type: 'Eggs', Ontario: 5.20, Quebec: 5.10, 'British Columbia': 5.40, currency: 'CAD' },
    { date: '2023-07', type: 'Eggs', Ontario: 5.22, Quebec: 5.12, 'British Columbia': 5.42, currency: 'CAD' },
    { date: '2023-08', type: 'Eggs', Ontario: 5.25, Quebec: 5.15, 'British Columbia': 5.45, currency: 'CAD' },
    { date: '2023-09', type: 'Eggs', Ontario: 5.28, Quebec: 5.18, 'British Columbia': 5.48, currency: 'CAD' },
    { date: '2023-10', type: 'Eggs', Ontario: 5.30, Quebec: 5.20, 'British Columbia': 5.50, currency: 'CAD' },
    { date: '2023-11', type: 'Eggs', Ontario: 5.32, Quebec: 5.22, 'British Columbia': 5.52, currency: 'CAD' },
    { date: '2023-12', type: 'Eggs', Ontario: 5.35, Quebec: 5.25, 'British Columbia': 5.55, currency: 'CAD' },
    
    // 2024 Eggs data - Monthly intervals
    { date: '2024-01', type: 'Eggs', Ontario: 5.45, Quebec: 5.35, 'British Columbia': 5.65, currency: 'CAD' },
    { date: '2024-02', type: 'Eggs', Ontario: 5.48, Quebec: 5.38, 'British Columbia': 5.68, currency: 'CAD' },
    { date: '2024-03', type: 'Eggs', Ontario: 5.50, Quebec: 5.40, 'British Columbia': 5.70, currency: 'CAD' },
    { date: '2024-04', type: 'Eggs', Ontario: 5.55, Quebec: 5.45, 'British Columbia': 5.75, currency: 'CAD' },
    { date: '2024-05', type: 'Eggs', Ontario: 5.58, Quebec: 5.48, 'British Columbia': 5.78, currency: 'CAD' },
    { date: '2024-06', type: 'Eggs', Ontario: 5.60, Quebec: 5.50, 'British Columbia': 5.80, currency: 'CAD' },
    { date: '2024-07', type: 'Eggs', Ontario: 5.62, Quebec: 5.52, 'British Columbia': 5.82, currency: 'CAD' },
    { date: '2024-08', type: 'Eggs', Ontario: 5.65, Quebec: 5.55, 'British Columbia': 5.85, currency: 'CAD' },
    { date: '2024-09', type: 'Eggs', Ontario: 5.68, Quebec: 5.58, 'British Columbia': 5.88, currency: 'CAD' },
    { date: '2024-10', type: 'Eggs', Ontario: 5.70, Quebec: 5.60, 'British Columbia': 5.90, currency: 'CAD' },
    { date: '2024-11', type: 'Eggs', Ontario: 5.72, Quebec: 5.62, 'British Columbia': 5.92, currency: 'CAD' },
    { date: '2024-12', type: 'Eggs', Ontario: 5.75, Quebec: 5.65, 'British Columbia': 5.95, currency: 'CAD' }
  ];

  const provinces = ['Ontario', 'Quebec', 'British Columbia'];
  const foodTypes = ['Bread', 'Milk', 'Eggs'];
  const currencies = ['CAD', 'USD', 'EUR'];

  // Currency conversion rates (simplified)
  const currencyRates = {
    CAD: 1,
    USD: 0.74,
    EUR: 0.68
  };

  useEffect(() => {
    setRawData(sampleData);
  }, []);

  // Simulate loading on filter changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [selectedProvinces, selectedFoodType, dateRange, selectedCurrency, barChartDate, barChartProvince]);

  // Filter data based on selections
  const filteredData = rawData.filter(item => 
    item.type === selectedFoodType &&
    item.date >= dateRange.start &&
    item.date <= dateRange.end
  );

  // Convert data based on selected currency and unit
  const convertData = (data) => {
    return data.map(item => {
      const converted = { ...item };
      provinces.forEach(province => {
        if (item[province]) {
          // Convert currency
          const cadValue = item[province] / currencyRates[item.currency];
          converted[province] = cadValue * currencyRates[selectedCurrency];
        }
      });
      converted.currency = selectedCurrency;
      return converted;
    });
  };

  const convertedData = convertData(filteredData);

  // Determine the default bar chart date (latest in range) if not set
  const getDefaultBarChartDate = () => {
    // Find all dates in the filtered data
    const dates = rawData
      .map(item => item.date)
      .filter(date => date >= dateRange.start && date <= dateRange.end);
    if (dates.length === 0) return dateRange.end;
    return dates.sort().reverse()[0];
  };
  const effectiveBarChartDate = barChartDate || getDefaultBarChartDate();

  // Determine the default bar chart province (first selected) if not set
  const getDefaultBarChartProvince = () => {
    return selectedProvinces.length > 0 ? selectedProvinces[0] : provinces[0];
  };
  const effectiveBarChartProvince = barChartProvince || getDefaultBarChartProvince();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      {/* Background Pattern Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 8px 0',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            {t('title')}
          </h1>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
          }}>
            <LanguageSelector />
          </div>
        </div>

        {/* Control Panel */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.15), 0 10px 10px -5px rgba(185, 28, 28, 0.08)',
          marginBottom: '32px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 68, 68, 0.18)'
        }}>
          <Controls
            provinces={provinces}
            selectedProvinces={selectedProvinces}
            onChangeProvinces={setSelectedProvinces}
            foodTypes={foodTypes}
            selectedFoodType={selectedFoodType}
            onChangeFoodType={setSelectedFoodType}
            dateRange={dateRange}
            onChangeDateRange={setDateRange}
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            onChangeCurrency={setSelectedCurrency}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            barChartDate={barChartDate}
            onChangeBarChartDate={setBarChartDate}
            barChartProvince={barChartProvince}
            onChangeBarChartProvince={setBarChartProvince}
          />
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gap: '40px',
          gridTemplateColumns: '1fr',
          position: 'relative'
        }}>
          {loading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.7)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px'
            }}>
              <div className="spinner" aria-label="Loading charts" style={{
                width: '48px',
                height: '48px',
                border: '6px solid #EF4444',
                borderTop: '6px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          )}
          {(viewMode === 'trends' || viewMode === 'both') && (
            <LineChartComponent 
              data={convertedData} 
              provinces={selectedProvinces}
              currency={selectedCurrency}
            />
          )}
          {(viewMode === 'comparison' || viewMode === 'both') && (
            <BarChartComponent
              data={rawData}
              date={effectiveBarChartDate}
              province={effectiveBarChartProvince}
              foodTypes={foodTypes}
              currency={selectedCurrency}
            />
          )}
        </div>

        {/* Footer Information */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '40px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            margin: '0',
            lineHeight: '1.5'
          }}>
            {t('footer_info')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
