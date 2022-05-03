import { useEffect, useState } from 'react';
import { View } from 'react-native';
import config from "../config/config.json";
import { DataTable } from 'react-native-paper';
import stockModel from "../models/stock";

export default function StockList({products, setProducts}) {

    useEffect(async () => {
            setProducts(await stockModel.getStock());
    }, []);


  
    

    // fetch(`${config.base_url}/products?api_key=${config.api_key}`)
    //   .then(response => response.json())
    //   .then(result => setProducts(result.data));

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