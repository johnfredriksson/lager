import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);
  
    const list = products.map((product, index) => <Text style={{padding: 6, margin: 4, backgroundColor: "lightgray", height: 50, fontSize: 20}} key={index}>{ product.name } - { product.stock }st</Text>);
  
    return (
      <ScrollView>
        {list}
      </ScrollView>
    );
  }

export default function Stock() {
  return (
    <View>
      <Text style={{color: '#333', fontSize: 24, marginTop: 30, marginBottom: 30, textAlign: "center"}}>Lagerförteckning</Text>
      <StockList/>
    </View>
  );
}