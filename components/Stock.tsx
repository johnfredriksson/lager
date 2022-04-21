import { useState } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';
import { DataTable } from 'react-native-paper';

function StockList() {
    const [products, setProducts] = useState([]);
  

    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));

    // const list = products.map((product, index) => <Text key={index} style={Base.stockItem}>{ product.name } - { product.stock }st</Text>);
    const list = products.map((product, index) => {
      return (
      <DataTable.Row key={index}>
              <DataTable.Cell>{product.id}</DataTable.Cell>
              <DataTable.Cell>{product.name}</DataTable.Cell>
              <DataTable.Cell numeric>{product.stock}</DataTable.Cell>
      </DataTable.Row>
      );
    });

  
    return (
      <View>
        {list}
      </View>
    );
  }

export default function Stock() {
  return (
    <View>
      <DataTable>
            <DataTable.Header>
                <DataTable.Title>Artnr</DataTable.Title>
                <DataTable.Title >Namn</DataTable.Title>
                <DataTable.Title>Antal</DataTable.Title>
            </DataTable.Header>
        </DataTable>
      <StockList/>
    </View>
  );
}