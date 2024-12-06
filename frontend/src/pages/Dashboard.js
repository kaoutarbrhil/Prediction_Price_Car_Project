
import React, { useState, useEffect, useRef } from 'react';
import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMobileAlt, FaLaptop, FaTabletAlt } from 'react-icons/fa';
import 'leaflet.heat';
import { mockProductData, mockRegionData } from '../data/data'; // Importation des données
import '../css/Dashboard.css';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState('Smartphone');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const [priceVolatility, setPriceVolatility] = useState([]);
  
  const mapRef = useRef();
// Définir les icônes des produits ici
const productIcons = {
  Smartphone: <FaMobileAlt size={30} color="#007bff" />,
  Laptop: <FaLaptop size={30} color="#28a745" />,
  Tablet: <FaTabletAlt size={30} color="#ffc107" />,
};
const handleProductClick = (product) => {
  setSelectedProduct(product);
};

  useEffect(() => {
    if (selectedProduct) {
      filterData(selectedProduct); // Charger les données du produit sélectionné
    }
  }, [selectedProduct]);

 
  const filterData = (product) => {
    const filteredData = mockProductData.filter((item) => item.product === product);
    if (filteredData.length) {
      generateCharts(filteredData);
      calculateVolatility(filteredData);
    }
  };

  const generateCharts = (data) => {
    setChartData({
      labels: data.map(item => item.year),
      datasets: [
        {
          label: 'Prix du produit',
          data: data.map(item => item.price),
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
        {
          label: 'Quantité vendue',
          data: data.map(item => item.quantity),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }
      ]
    });
  };

  const calculateVolatility = (data) => {
    const prices = data.map(item => item.price);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length;
    const volatility = Math.sqrt(variance);
    setPriceVolatility(volatility);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  useEffect(() => {
    if (mapRef.current && mockRegionData.length > 0) {
      const heatLayer = L.heatLayer(
        mockRegionData.map(region => [region.lat, region.lng, region.intensity]),
        { radius: 25, blur: 15, maxZoom: 17 }
      );
      heatLayer.addTo(mapRef.current);
    }
  }, []);

  // Graphique des revenus annuels
  const generateRevenueData = (data) => {
    const years = [...new Set(data.map(item => item.year))];
    const revenueData = years.map(year => {
      const yearlyData = data.filter(item => item.year === year);
      const revenue = yearlyData.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return revenue;
    });

    return {
      labels: years,
      datasets: [{
        label: 'Revenu Annuel',
        data: revenueData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }]
    };
  };

  // Graphique de la corrélation entre prix et quantité
  const generateCorrelationData = (data) => {
    return {
      datasets: [{
        label: 'Corrélation entre Quantité et Prix',
        data: data.map(item => ({ x: item.quantity, y: item.price })),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      }]
    };
  };
  useEffect(() => {
    if (mapRef.current && mockRegionData.length > 0) {
      const heatLayer = L.heatLayer(
        mockRegionData.map((region) => [region.lat, region.lng, region.intensity]),
        { radius: 25, blur: 15, maxZoom: 17 }
      );
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.HeatLayer) {
          mapRef.current.removeLayer(layer); // Supprimez l'ancienne couche
        }
      });
      heatLayer.addTo(mapRef.current); // Ajoutez la nouvelle couche
    }
  }, [mockRegionData]);
  useEffect(() => {
    if (mapRef.current && mockRegionData.length > 0) {
      const bounds = mockRegionData.map((region) => [region.lat, region.lng]);
      mapRef.current.fitBounds(bounds);
    }
  }, [mockRegionData]);
  

  return (
    <div className="dashboard">
      <h2>Dashboard </h2>


      <div className="product-cards">
        {Object.keys(productIcons).map((product) => (
          <div
            key={product}
            className={`product-card ${selectedProduct === product ? 'active' : ''}`}
            onClick={() => handleProductClick(product)}
          >
            {productIcons[product]}
            <p>{product}</p>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <div className="chart">
          <h3>Évolution des prix de {selectedProduct} au fil du temps</h3>
          <Line data={chartData} />
        </div>

        <div className="chart">
          <h3>Histogramme des Quantités Commandées</h3>
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [{
                label: 'Quantité Commandée',
                data: chartData.datasets[1]?.data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              }]
            }}
          />
        </div>

        <div className="chart">
          <h3>Graphique de la Distribution des Prix</h3>
          <Pie
            data={{
              labels: chartData.labels,
              datasets: [{
                data: chartData.datasets[0]?.data,
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
              }]
            }}
          />
        </div>

        <div className="chart">
          <h3>Graphique des Revenus Annuels</h3>
          <Bar data={generateRevenueData(mockProductData.filter(item => item.product === selectedProduct))} />
        </div>

        <div className="chart">
          <h3>Graphique de Corrélation entre Quantité et Prix</h3>
          <Scatter data={generateCorrelationData(mockProductData.filter(item => item.product === selectedProduct))} />
        </div>

        <div className="chart">
          <h3>Volatilité des Prix</h3>
          <Line
            data={{
              labels: chartData.labels,
              datasets: [{
                label: 'Volatilité des Prix',
                data: Array(chartData.labels.length).fill(priceVolatility),
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
              }]
            }}
          />
        </div>

        <div className="chart">
          <h3>Analyse des Ventes par Région</h3>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            style={{ height: '400px', width: '100%' }}
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

