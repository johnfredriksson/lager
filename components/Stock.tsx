import { useState } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';

function StockList() {
    const [products, setProducts] = useState([]);
  

    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));

    const list = products.map((product, index) => <Text key={index} style={Base.stockItem}>{ product.name } - { product.stock }st</Text>);
  
    return (
      <View>
        {list}
      </View>
    );
  }

export default function Stock() {
  return (
    <View>
      <StockList/>
    </View>
  );
}